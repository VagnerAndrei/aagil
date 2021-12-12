import { atletaLogado, isLogged } from './sessao.js';
import { Home } from './controller/Home.js';
import { Sobre } from './controller/Sobre.js';
import { Registro } from './controller/Registro.js'
import { Acesso } from './controller/Acesso.js'
import { Manobras } from './controller/Manobras.js';
import { Pistas } from './controller/Pistas.js';
import { PistaRegistro } from './controller/PistaRegistro.js';
import { View } from './components/View.js';
import { CampeonatoListaController } from './pages/campeonato/controller/CampeonatoListaController.js'
import { CampeonatoFormController } from './pages/campeonato/controller/CampeonatoFormController.js'
import { CampeonatoController } from './pages/campeonato/controller/CampeonatoController.js'
import { AtletaController } from './pages/atleta/controller/AtletaController.js'
import { AtletaListaController } from './pages/atleta/controller/AtletaListaController.js';
import { PostagemController } from './pages/postagem/controller/PostagemController.js';

const instances = { current: undefined, atletas: undefined, pistas: undefined }

const views = {
	home: "home",
	postagem: "postagem",
	manobras: "manobras",
	pistas: "pistas",
	pista_registro: "pista-registro",
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
		case views.pistas: pistas()
			break
		case views.pista_registro: pistaRegistro()
			break
		case views.campeonatos: campeonatos()
			break
		case views.campeonato:
			if (id && !isNaN(id) && id > 0) campeonato({ event, idCampeonato: id })
			else pagina_nao_encontrada();
			break
		case views.campeonato_registro: campeonatoRegistro({})
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
	instances.current = new PostagemController()
	if (e) changeState({ view: views.postagem })
}

function pistas(e) {
	current_verify()
	if (!instances.pistas) instances.pistas = new Pistas()
	else {
		instances.pistas.display(true)
		instances.pistas.applyRole()
	}
	instances.current = instances.pistas
	if (e) changeState({ view: views.pistas })
}

function pistaRegistro(e) {
	current_verify()
	instances.current = new PistaRegistro()
	if (e) changeState({ view: views.pista_registro })
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
	instances.current = new AtletaController({ idAtleta: idAtual })
	changeState({ view: views.atleta, event: event instanceof Event ? event.type : event, id: idAtual })
}

function atletas(clickEvent) {
	current_verify()
	//	if (!instances.atletas) instances.atletas = new Atletas()
	//	else instances.atletas.display(true)
	//	instances.current = instances.atletas
	instances.current = new AtletaListaController({})
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

function campeonato({ event, idCampeonato }) {
	current_verify()
	instances.current = new CampeonatoController({ idCampeonato })
	if (event) changeState({ view: views.campeonato, id: idCampeonato })
}

function campeonatoRegistro({ event, idCampeonato }) {
	current_verify()
	instances.current = new CampeonatoFormController({ idCampeonato })
	if (event) changeState({ view: views.campeonato_registro })
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
			//			case Pistas:
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

export { views, verificaURL, registrar, acessar, home, postagem, manobras, pistas, pistaRegistro, campeonatos, campeonato, campeonatoRegistro, sobre, perfil, atletas, pagina_nao_encontrada, applyRole }
