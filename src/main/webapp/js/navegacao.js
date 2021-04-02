import { usuarioLogado, isLogged } from './sessao.js';
import { get } from './fetch.js';
import { Home } from './controller/Home.js';
import { Sobre } from './controller/Sobre.js';
import { Atletas } from './controller/Atletas.js';
import { Atleta } from './controller/Atleta.js';
import { Registro } from './controller/Registro.js'
import { Acesso } from './controller/Acesso.js'
import { Manobras } from './controller/Manobras.js';

const urls = {
	home: {
		path: "pages/public/home.html",
		name: "home",
		title: "Página Inicial"
	},
	manobras: {
		path: "pages/public/manobras.html",
		name: "manobras",
		title: "Manobras"
	},
	atleta: {
		path: "pages/public/atleta.html",
		name: "atleta",
		id: NaN,
		title: "Atleta"
	},
	atletas: {
		path: "pages/public/atletas.html",
		name: "atletas",
		title: "Lista de atletas"
	},

	atleta_form: {
		path: "pages/user/atleta-form.html",
		name: "atleta-form",
		title: "Atualizar atleta"
	},

	atleta_foto_upload: {
		path: "pages/user/atleta-foto-upload.html",
		name: "atleta-foto-upload",
		title: "Atualizar foto"
	},

	sobre: {
		path: "pages/public/sobre.html",
		name: "sobre",
		title: "Sobre"
	},
	registro: {
		path: "pages/public/registro.html",
		name: "registro",
		title: "Registro"
	},
	acesso: {
		path: "pages/public/acesso.html",
		name: "acesso",
		title: "Acesso"
	},

	ja_autenticado: {
		path: "pages/user/ja-autenticado.html",
		name: "ja-autenticado",
		title: "Usuário já autenticado"
	},
	pagina_nao_encontrada: {
		path: "pages/public/nao-encontrada.html",
		name: "nao-encontrada",
		title: "Página não encontrada"
	}
}


function mainNavigate(url, queryFunction) {
	get(url.path).then(response => {
		response.text().then(value => {
			document.getElementsByTagName('main')[0].innerHTML = new DOMParser()
				.parseFromString(value, "text/html")
				.getElementsByTagName('main')[0].innerHTML;
			if (queryFunction) queryFunction();
		})
	})
}

function changeState(url, onLoginEvent) {
	if (url.name == urls.home.name) {
		if (window.location.href != window.location.origin + window.location.pathname)
			if (!onLoginEvent) window.history.pushState(url.name, url.name, `${location.pathname}`)
			else window.history.replaceState(url.name, url.name, `${location.pathname}`)
	}
	else {

		if (url == urls.atleta) {
			if (!onLoginEvent) window.history.pushState(url.name, url.name, "?p=" + url.name + "&id=" + url.id)
			else window.history.replaceState(url.name, url.name, "?p=" + url.name + "&id=" + url.id)
		}
		else
			if (new URLSearchParams(new URL(window.location.href).search).get("p") != url.name)
				window.history.pushState(url.name, url.name, "?p=" + url.name)
	}
}

function verificaURL(event) {
	const param = new URLSearchParams(new URL(window.location.href).search).get("p");
	if (param == null && window.location != window.location.origin + window.location.pathname) {
		pagina_nao_encontrada();
		return;
	}
	if (usuarioLogado)
		if (param == null) {
			home();
			return;
		}
		else if (param == urls.acesso.name || param == urls.registro.name) {
			perfil('onLoggedEvent');
			return;
		}
	redirect(param, event)

}


function redirect(param, event) {
	switch (param) {
		case null:
			home();
			break;
		case urls.atleta.name:
			const id = new URLSearchParams(new URL(window.location.href).search).get("id");
			if (id && !isNaN(id) && id > 0) {
				perfil(id, event);
			}
			else
				pagina_nao_encontrada();
			break;
		case urls.sobre.name:
			sobre();
			break;
		case urls.registro.name:
			registrar()
			break;
		case urls.acesso.name:
			acessar()
			break;
		case urls.manobras.name:
			manobras()
			break;
		case urls.atletas.name:
			atletas()
			break;

		default:
			pagina_nao_encontrada();
			break;
	}
}



function ja_autenticado() {
	current = null
	mainNavigate(urls.ja_autenticado)
}

function pagina_nao_encontrada() {
	current = null
	mainNavigate(urls.pagina_nao_encontrada);
}

function home(e) {
	current_verify()
	current = new Home()
	if (e) changeState(urls.home, e === 'onLoginEvent')
}

function manobras(e) {
	current_verify()
	current = new Manobras()
	if (e) changeState(urls.manobras)
}

let current
function perfil(eventOrIdUsuario, onPopStateEvent) {
	current_verify()
	urls.atleta.id = isNaN(eventOrIdUsuario) ? usuarioLogado.id : eventOrIdUsuario
	current = new Atleta(urls.atleta.id)
	if (eventOrIdUsuario && !onPopStateEvent) changeState(urls.atleta, eventOrIdUsuario === 'onLoggedEvent')
}

let atletasL
function atletas(clickEvent) {
	current_verify()
	if (!atletasL)
		atletasL = new Atletas()
	else
		atletasL.display(true)
	current = atletasL
	if (clickEvent) changeState(urls.atletas)
}
function current_verify() {
	isLogged()
	if (current) {
		switch (current.constructor) {
			case Atletas:
				current.display(false)
				break
			case Acesso:
			case Atleta:
			case Manobras:
			case Registro:
			case Home:
			case Sobre:
				current.remove()
				break
		}
		current = null
	}
}

function sobre(clickEvent) {
	current_verify()
	current = new Sobre()
	if (clickEvent) changeState(urls.sobre)
}

function acessar(clickEvent) {
	current_verify()
	current = new Acesso()
	if (clickEvent) changeState(urls.acesso)
}

function registrar(clickEvent) {
	current_verify()
	current = new Registro()
	if (clickEvent) changeState(urls.registro)

}

export { urls, verificaURL, registrar, acessar, home, manobras, sobre, perfil, atletas, pagina_nao_encontrada }
