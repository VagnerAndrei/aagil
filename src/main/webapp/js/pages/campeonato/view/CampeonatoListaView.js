/**
 * 		Lista de Campeonatos
 */
import { ListaView } from '../../../components/ListaView.js'
import { Campeonato } from '../model/Campeonato.js'
import { campeonato, campeonatoRegistro } from '../../../navegacao.js'
import { isAdmin } from '../../../sessao.js'

export class CampeonatoListaView extends ListaView {

	constructor({ onViewCreatedFn }) {
		super({ idLista: "ul-campeonatos", titulo: "Campeonatos", onViewCreatedFn })
	}

	_init() {
		super._init()
		this._buttonCriarCampeonato = document.querySelector("#button-criar-campeonato")

		this._buttonCriarCampeonato.addEventListener('click', () => {
			campeonatoRegistro({ event: 'clickEvent' })
		})

		this._addRoledElement({ id: 'button-criar-campeonato', className: 'botao-inserir' })
		this._applyRole(isAdmin())
	}

	async _update() {
		super._update(await this._template())
	}

	async _template() {
		return this._getHTML('pages/public/campeonatos.html')
	}


	_liTemplateObject(model = new Campeonato()) {
		const li = document.createElement('li')
		li.innerHTML = `
			<a id="a-campeonato-${model.id}">${model.titulo}</a>
			<img id="img-editar-campeonato-${model.id}"
				src="assets/img/icon-editar.png" class="botao-editar ${isAdmin() ? '' : 'display-none'}"
				title="Editar informações">
		`
		return li
	}

	_adicionarClickEvent(model) {
		document.querySelector(`#a-campeonato-${model.id}`).addEventListener('click', () => {
			campeonato({ event: 'campeonatoClickEvent', idCampeonato: model.id })
		})

		if (isAdmin())
			document.querySelector(`#img-editar-campeonato-${model.id}`).addEventListener('click', () => {
				campeonatoRegistro({ event: 'editarCampeonatoClickEvent', idCampeonato: model.id })
			})
	}

	applyRole() {
		this._applyRole(isAdmin())
	}

}