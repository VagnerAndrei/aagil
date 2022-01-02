/**
 * 
 */
import { ListaPaginadaController } from './../../../components/custom/ListaPaginadaController.js'
import { PistaListaView } from './../view/PistaListaView.js'

export class PistaListaController extends ListaPaginadaController {

	constructor() {
		super({ url: 'api/pistas' })
		this._view = new PistaListaView({ onViewCreatedFn: this._init() })
	}

	_init() {
		return () => {
			this._view.configureAtualizarLista(this._atualizarLista())
		}
	}

	_atualizarLista() {
		return async (indice, tamanhoDaPagina) => {
			await super._atualizarLista(indice, tamanhoDaPagina)
			this._view.updateListTemplate({ lista: this.lista, totalResults: this.totalResults })
		}
	}


	applyRole() {
		this._view.applyRole()
	}

}