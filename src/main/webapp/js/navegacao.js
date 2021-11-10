import { atletaLogado, isLogged } from './sessao.js';
import { Home } from './controller/Home.js';
import { Postagem } from './controller/Postagem.js';
import { Sobre } from './controller/Sobre.js';
import { Atletas } from './controller/Atletas.js';
import { Atleta } from './controller/Atleta.js';
import { Registro } from './controller/Registro.js'
import { Acesso } from './controller/Acesso.js'
import { Manobras } from './controller/Manobras.js';
import { Picos } from './controller/Picos.js';
import { PicoRegistro } from './controller/PicoRegistro.js';
import { View } from './components/View.js';
import { CampeonatoListaController } from './controller/CampeonatoListaController.js'
import { CampeonatoFormController } from './controller/CampeonatoFormController.js'
import { CampeonatoController } from './controller/CampeonatoController.js'

const instances = { current: undefined, atletas: undefined, picos: undefined }

const views = {
	home: "home",
	postagem: "postagem",
	manobras: "manobras",
	picos: "picos",
	pico_registro: "pico-registro",
	campeonatos: "campeonatos",
	campeonato: "campeonato",
	campeonato_registro: "campeonato-registro",
	atleta: "atleta",
	atletas: "atletas",
	sobre: "sobre",
	registro: "registro",
	acesso: "acesso",
	ja_autenticado: { path: "pages/user/ja-autenticado.html", name: "ja-autenticado", title: "Usuário já autenticado" },
	pagina_nao_encontrada: { path: "pages/public/nao-encontrada.html", name: "nao-encontrada", title: "Página não encontrada" }
}


function verificaURL(event) {
	const param = new URLSearchParams(new URL(window.location.href).search).get('p');
	const id = new URLSearchParams(new URL(window.location.href).search).get("id")
	switch (param) {
		case null:
			if (window.location != window.location.origin + window.location.pathname) pagina_nao_encontrada()
			//else home();
			break;
		case views.atleta:
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
		case views.postagem: postagem()
			break
		case views.manobras: manobras()
			break;
		case views.atletas: atletas()
			break;
		case views.picos: picos()
			break
		case views.pico_registro: picoRegistro()
			break
		case views.campeonatos: campeonatos()
			break
		case views.campeonato:
			if (id && !isNaN(id) && id > 0) campeonato({ event, id })
			else pagina_nao_encontrada();
			break
		case views.campeonato_registro: campeonatoRegistro()
			break
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
	if (event) changeState({ view: views.home, event })
}

function manobras(e) {
	current_verify()
	instances.current = new Manobras()
	if (e) changeState({ view: views.manobras })
}

function postagem(e) {
	current_verify()
	instances.current = new Postagem()
	if (e) changeState({ view: views.postagem })
}

function picos(e) {
	current_verify()
	if (!instances.picos) instances.picos = new Picos()
	else {
		instances.picos.display(true)
		instances.picos.applyRole()
	}
	instances.current = instances.picos
	if (e) changeState({ view: views.picos })
}

function picoRegistro(e) {
	current_verify()
	instances.current = new PicoRegistro()
	if (e) changeState({ view: views.pico_registro })
}

async function perfil(event, idAtleta) {
	current_verify()
	const idAtual = (idAtleta ? idAtleta : atletaLogado.id)
//	if (!instances.atleta)
//		instances.atleta = new Atleta(idAtual)
//	else {
//		await instances.atleta.consultarAtleta(idAtual)
//		instances.atleta.applyRole(atletaLogado ? 'User' : undefined)
//		instances.atleta.display(true)
//	}
//	instances.current = instances.atleta
	instances.current = new Atleta(idAtual)
	changeState({ view: views.atleta, event: event instanceof Event ? event.type : event, id: idAtleta })
}

function atletas(clickEvent) {
	current_verify()
//	if (!instances.atletas) instances.atletas = new Atletas()
//	else instances.atletas.display(true)
//	instances.current = instances.atletas
	instances.current = new Atletas()
	if (clickEvent) changeState({ view: views.atletas })
}

function campeonatos(clickEvent) {
	current_verify()
//	if (!instances.campeonatos) instances.campeonatos = new CampeonatoListaController()
//	else instances.campeonatos.display(true)
//	instances.current = instances.campeonatos
	instances.current = instances.campeonatos = new CampeonatoListaController()
	if (clickEvent) changeState({ view: views.campeonatos })
}

function campeonato({ event, id }) {
	current_verify()
	instances.current = new CampeonatoController({ idCampeonato: id })
	if (event) changeState({ view: views.campeonato, id })
}

function campeonatoRegistro(clickEvent) {
	current_verify()
	instances.current = new CampeonatoFormController()
	if (clickEvent) changeState({ view: views.campeonato_registro })
}

function sobre(clickEvent) {
	current_verify()
	instances.current = new Sobre()
	if (clickEvent) changeState({ view: views.sobre })
}

async function acessar(clickEvent) {
	current_verify()
	instances.current = new Acesso()
	if (clickEvent) changeState({ view: views.acesso })
}

async function registrar(clickEvent) {
	current_verify()
	instances.current = new Registro()
	if (clickEvent) changeState({ view: views.registro })
}

function current_verify() {
	//isLogged('navigationEvent')
	if (instances.current) {
		switch (instances.current.constructor) {
//			case Atletas:
//			case Picos:
//			case Atleta:
//			case CampeonatoListaController:
//				instances.current.display(false)
//				break
			default:
				instances.current.remove()
				break
		}
		instances.current = undefined
	}
}

function changeState({ view, event, id }) {

	switch (view) {

		case views.home:
			window.history.pushState(view, view, `${location.pathname}`)
			break
		case views.atleta:
			switch (event) {
				case 'authEvent':
					window.history.replaceState(view, view, `?p=${view}&id=${id}`)
					break
				case 'click':
				case 'atletaClickEvent':
					if (new URLSearchParams(new URL(window.location.href).search).get('p') != view)
						window.history.pushState(view, view, `?p=${view}&id=${id}`)
			}
			break
		case views.campeonato:
			if (new URLSearchParams(new URL(window.location.href).search).get('p') != view)
				window.history.pushState(view, view, `?p=${view}&id=${id}`)
			break
		default:
			if (new URLSearchParams(new URL(window.location.href).search).get('p') != view)
				window.history.pushState(view, view, `?p=${view}`)
	}

}

function applyRole(role) {
	if (instances.current?.constructor == Acesso || instances.current?.constructor == Registro)
		perfil('authEvent')
	try {
		Object.keys(instances).map(key => {
			if (key === 'current' || instances[key] && instances[key] !== instances['current']) {
				instances[key]?.applyRole(role)
				console.log('aplicou', key)
			}

		})
	} catch (error) { }
	try {
		instances['current'].applyRole()
	} catch (error) { }
}

// Verifica usuário quando o foco da app retorna, podendo haver caso de window.focus ou apenas tab visibilityChange
document.addEventListener("DOMContentLoaded", () => {
	document.addEventListener("visibilitychange", isLoggedOnFocus)
})

window.addEventListener('focus', isLoggedOnFocus)

function isLoggedOnFocus() {
	if (document.visibilityState === 'visible') debounce(() => isLogged('navigationEvent'))
}

let timer = 0;
function debounce(fn) {
	clearTimeout(timer);
	timer = setTimeout(fn, 1);
}

export { views, verificaURL, registrar, acessar, home, postagem, manobras, picos, picoRegistro, campeonatos, campeonato, campeonatoRegistro, sobre, perfil, atletas, pagina_nao_encontrada, applyRole }
