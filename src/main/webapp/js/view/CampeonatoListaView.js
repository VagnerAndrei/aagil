/**
 * 		Lista de Campeonatos
 */
import { ListaView } from '../components/ListaView.js'
import { Campeonato } from '../model/Campeonato.js'
import { campeonato, campeonatoRegistro } from '../navegacao.js'

export class CampeonatoListaView extends ListaView {

	constructor({ onViewCreatedFn }) {
		super({ idLista: "ul-campeonatos", titulo: "Campeonatos", onViewCreatedFn })
	}

	init() {
		super.init()
		this._buttonCriarCampeonato = document.querySelector("#button-criar-campeonato")

		this._buttonCriarCampeonato.addEventListener('click', () => {
			campeonatoRegistro('clickEvent')
		})
	}

	async update() {
		super.update(await this.template())
	}

	async template() {
		return this.getHTML('pages/public/campeonatos.html')
	}


	liTemplate(model = new Campeonato()) {
		return `
			<a id="a-campeonato-${model.id}">${model.titulo}</a>
		`
	}

	adicionarClickEvent(model) {
		document.querySelector(`#a-campeonato-${model.id}`).addEventListener('click', () => {
			campeonato({ event: 'campeonatoClickEvent', id: model.id})
		})
	}

}