import { usuarioLogado } from './sessao.js';
import { get } from './fetch.js';
import { Atletas } from './controller/Atletas.js';
import { Atleta } from './controller/Atleta.js';
import { Registro } from './controller/Registro.js'
import { Acesso } from './controller/Acesso.js'
import { Manobras } from './controller/Manobras.js';

const titulo = 'AAGIL'

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
	document.getElementsByTagName('title')[0].innerHTML = titulo + " " + url.title;
}

function changeState(url) {
	if (url.name == urls.home.name) {
		if (window.location.href != window.location.origin + window.location.pathname)
			window.history.pushState(url.name, url.name, `${location.pathname}`)
	}
	else {

		if (url == urls.atleta) {
			window.history.pushState(url.name, url.name, "?p=" + url.name + "&id=" + url.id);
		}
		else
			if (new URLSearchParams(new URL(window.location.href).search).get("p") != url.name)
				window.history.pushState(url.name, url.name, "?p=" + url.name)
	}
}

function verificaURL() {
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
			ja_autenticado();
			return;
		}

	redirect(param)

}


function redirect(e) {
	switch (e) {
		case null:
			home();
			break;
		case urls.atleta.name:
			const id = new URLSearchParams(new URL(window.location.href).search).get("id");
			if (id && !isNaN(id) && id > 0) {
				perfil(id);
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
	mainNavigate(urls.ja_autenticado)
}

function pagina_nao_encontrada() {
	mainNavigate(urls.pagina_nao_encontrada);
}

function home(e) {
	mainNavigate(urls.home, () => {
		if (e)
			changeState(urls.home)
	});
}

function manobras(e) {
	mainNavigate(urls.manobras, () => {
		if (e)
			changeState(urls.manobras)
		new Manobras()
	});
}

function perfil(e) {
	mainNavigate(urls.atleta, () => {
		if (e) {
			urls.atleta.id = isNaN(e) ? usuarioLogado.id : e
			changeState(urls.atleta)
			new Atleta(urls.atleta.id)
		}
	});

}

function atletas(e) {
	mainNavigate(urls.atletas, () => {
		if (e) {
			changeState(urls.atletas)
		}
		new Atletas()
	});

}


function sobre(e) {
	mainNavigate(urls.sobre, () => {
		if (e)
			changeState(urls.sobre)
	});
}

function acessar(e) {
	mainNavigate(urls.acesso, () => {
		new Acesso()
		if (e)
			changeState(urls.acesso)
	});

}

function registrar(e) {
	mainNavigate(urls.registro, () => {
		new Registro()
		if (e)
			changeState(urls.registro)
	});

}

export { urls, verificaURL, registrar, acessar, home, manobras, sobre, perfil, atletas, pagina_nao_encontrada }
