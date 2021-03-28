import { usuarioLogado, acesso, registro } from './conta-controller.js';
import { initAtleta } from './atleta.js';
import { Atletas } from './Atletas.js';
import { initManobras } from './manobras.js';

const titulo = 'AAGIL'

export function get(url) {
	return fetch(url, {
		method: 'GET',
	});
}

export function post(url, json) {
	return fetch(url, {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify(json)
	})
}

export function put(url, json) {
	return fetch(url, {
		method: 'PUT',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify(json)
	})
}


export function deletar(url) {
	return fetch(url, {
		method: 'DELETE'
	})
}

export const urls = {
	home: {
		path: "pages/public/home.html",
		name: "home",
		title: "Página Inicial"
	},
	home_replace: {
		path: "pages/public/home.html",
		name: "home_replace",
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

	atleta_atualizar: {
		path: "pages/user/atleta-atualizar.html",
		name: "atleta-atualizar",
		title: "Atualizar atleta"
	},

	atleta_atualizar_foto: {
		path: "pages/user/atleta-atualizar-foto.html",
		name: "atleta-atualizar-foto",
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


export function mainNavigate(url, queryFunction) {
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

export function changeState(url) {
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

export function verificaURL() {
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
				urls.atleta.id = id;
				perfil();
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

export function pagina_nao_encontrada() {
	mainNavigate(urls.pagina_nao_encontrada);
}

export function home(e) {
	mainNavigate(urls.home, () => {
		if (e)
			changeState(urls.home)
	});
}

export function manobras(e) {
	mainNavigate(urls.manobras, () => {
		if (e)
			changeState(urls.manobras)
		initManobras()
	});
}

export function perfil(e) {
	mainNavigate(urls.atleta, () => {
		if (e) {
			urls.atleta.id = usuarioLogado.id;
			changeState(urls.atleta)
		}
		initAtleta();
	});

}

export function atletas(e) {
	mainNavigate(urls.atletas, () => {
		if (e) {
			changeState(urls.atletas)
		}
		const atletas = new Atletas()
		atletas.atualizarLista()
	});

}


export function sobre(e) {
	mainNavigate(urls.sobre, () => {
		if (e)
			changeState(urls.sobre)
	});
}

export function acessar(e) {
	mainNavigate(urls.acesso, () => {
		acesso();
		if (e)
			changeState(urls.acesso)
	});

}

export function registrar(e) {
	mainNavigate(urls.registro, () => {
		registro();
		if (e)
			changeState(urls.registro)
	});

}