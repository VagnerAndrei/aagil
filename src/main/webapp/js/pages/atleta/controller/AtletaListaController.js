/**
 * 
 */
import { ListaController } from '../../../components/ListaController.js'
import { get } from '../../../fetch.js'
import { AtletaListaView } from '../view/AtletaListaView.js'

export class AtletaListaController extends ListaController {

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
			const responseAtletas = await get(`${this._url}/${indice}/${tamanhoDaPagina}`)
			switch (responseAtletas.status) {
				case 200:
					const json = await responseAtletas.json()
					const lista = json.pagina
					this._lista = lista
					const totalResults = json.total
					this._view.updateListTemplate({ lista, totalResults })
					break
				case 500:
					break
			}
		}
	}
}