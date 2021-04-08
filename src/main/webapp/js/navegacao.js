import { atletaLogado, isUser } from './sessao.js';
import { Home } from './controller/Home.js';
import { Sobre } from './controller/Sobre.js';
import { Atletas } from './controller/Atletas.js';
import { Atleta } from './controller/Atleta.js';
import { Registro } from './controller/Registro.js'
import { Acesso } from './controller/Acesso.js'
import { Manobras } from './controller/Manobras.js';
import { View } from './components/View.js';

const instances = { current: undefined, atletas: undefined }

const views = {
	home: "home",
	manobras: "manobras",
	atleta: { nome: "atleta", id: NaN },
	atletas: "atletas",
	sobre: "sobre",
	registro: "registro",
	acesso: "acesso",
	ja_autenticado: { path: "pages/user/ja-autenticado.html", name: "ja-autenticado", title: "Usuário já autenticado" },
	pagina_nao_encontrada: { path: "pages/public/nao-encontrada.html", name: "nao-encontrada", title: "Página não encontrada" }
}


function verificaURL(event) {
	const param = new URLSearchParams(new URL(window.location.href).search).get('p');
	console.log('verificaURL', event, param, atletaLogado?.usuario.email)

	switch (param) {
		case null:
			if (window.location != window.location.origin + window.location.pathname) pagina_nao_encontrada()
			else home();
			break;
		case views.atleta.nome:
			const id = new URLSearchParams(new URL(window.location.href).search).get("id")
			if (id && !isNaN(id) && id > 0) perfil(event, id);
			else pagina_nao_encontrada();
			break;
		case views.sobre: sobre()
			break
		case views.registro:
			if (atletaLogado) perfil('authEvent', atletaLogado.id)
			else registrar()
			break
		case views.acesso:
			if (atletaLogado) perfil('authEvent', atletaLogado.id)
			else acessar()
			break
		case views.manobras: manobras()
			break;
		case views.atletas: atletas()
			break;
		default: pagina_nao_encontrada();
			break;
	}
}

function pagina_nao_encontrada() {
	current_verify()
	instances.current = new View('Página não encontrada')
}

function home(event) {
	current_verify()
	instances.current = new Home()
	if (event) changeState(views.home, event)
}

function manobras(e) {
	current_verify()
	instances.current = new Manobras()
	if (e) changeState(views.manobras)
}

async function perfil(event, idAtleta) {
	current_verify()
	const idAtual = (idAtleta ? idAtleta : atletaLogado.id)
	if (!instances.atleta)
		instances.atleta = new Atleta(idAtual)
	else {
		if (isNaN(views.atleta.id) || views.atleta.id !== idAtual)
			await instances.atleta.consultarAtleta(idAtual)
		instances.atleta.applyRole(atletaLogado ? 'User' : undefined)
		instances.atleta.display(true)
	}
	instances.current = instances.atleta
	views.atleta.id = idAtual
	changeState(views.atleta.nome, event instanceof Event ? event.type : event)
}

function atletas(clickEvent) {
	current_verify()
	if (!instances.atletas)
		instances.atletas = new Atletas()
	else
		instances.atletas.display(true)
	instances.current = instances.atletas
	if (clickEvent) changeState(views.atletas)
}

function sobre(clickEvent) {
	current_verify()
	instances.current = new Sobre()
	if (clickEvent) changeState(views.sobre)
}

async function acessar(clickEvent) {
	current_verify()
	instances.current = new Acesso()
	if (clickEvent) changeState(views.acesso)
}

async function registrar(clickEvent) {
	current_verify()
	instances.current = new Registro()
	if (clickEvent) changeState(views.registro)
}

function current_verify() {
	//isUser('navigationEvent')
	if (instances.current) {
		switch (instances.current.constructor) {
			case Atletas:
			case Atleta:
				instances.current.display(false)
				break
			default:
				instances.current.remove()
				break
		}
		instances.current = undefined
	}
}

function changeState(view, event) {
	console.log('changeState', view, event)

	switch (view) {

		case views.home:
			window.history.pushState(view, view, `${location.pathname}`)
			break
		case views.atleta.nome:
			console.log('viewAtleta', view, views.atleta.nome, views.atleta.id)
			switch (event) {
				case 'authEvent':
					window.history.replaceState(view.nome, view.nome, `?p=${views.atleta.nome}&id=${views.atleta.id}`)
					break
				case 'click':
				case 'atletaClickEvent':
					if (new URLSearchParams(new URL(window.location.href).search).get('p') != view)
						window.history.pushState(view.nome, view.nome, `?p=${views.atleta.nome}&id=${views.atleta.id}`)
			}
			break
		default:
			if (new URLSearchParams(new URL(window.location.href).search).get('p') != view)
				window.history.pushState(view, view, `?p=${view}`)
	}

}

function applyRole(role) {
	if (instances.current?.constructor == Acesso || instances.current?.constructor == Registro)
		perfil('authEvent')
	Object.keys(instances).map(key => {
		if (key === 'current' || instances[key] && instances[key] !== instances['current']) {
			instances[key]?.applyRole(role)
			console.log('aplicou', key)
		}

	})
}

// Verifica usuário quando o foco da app retorna, podendo haver caso de window.focus ou apenas tab visibilityChange
document.addEventListener("DOMContentLoaded", () => {
	document.addEventListener("visibilitychange", isUserOnFocus)
})

window.addEventListener('focus', isUserOnFocus)

function isUserOnFocus() {
	if (document.visibilityState === 'visible') debounce(() => isUser('navigationEvent'))
}

let timer = 0;
function debounce(fn) {
	clearTimeout(timer);
	timer = setTimeout(fn, 1);
}

export { views, verificaURL, registrar, acessar, home, manobras, sobre, perfil, atletas, pagina_nao_encontrada, applyRole }
