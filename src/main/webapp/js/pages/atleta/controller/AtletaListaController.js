/**
 * 
 */
import { ListaPaginadaController } from '../../../components/custom/ListaPaginadaController.js'
import { AtletaListaView } from '../view/AtletaListaView.js'

export class AtletaListaController extends ListaPaginadaController {

	constructor({ selectedIndexPagination = 0 }) {
		super({ url: 'api/atletas' })
		this._view = new AtletaListaView({ onViewCreatedFn: this._init(), selectedIndexPagination })
	}

	_init() {
		return () => {
			this._view.configureAtualizarLista(this._atualizarLista())
		}
	}

	_atualizarLista() {
		return async (indice, tamanhoDaPagina) => {
			await super._atualizarLista(indice, tamanhoDaPagina)
			this._view.updateListTemplate({ lista : this.lista, totalResults : this.totalResults })
		}
	}
}