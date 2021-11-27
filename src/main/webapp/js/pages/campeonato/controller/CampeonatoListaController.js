/**
 * 		Lista Campeonato Controller
 */
import { ListaController } from '../../../components/ListaController.js'
import { CampeonatoListaView } from '../view/CampeonatoListaView.js'

export class CampeonatoListaController extends ListaController {

	constructor() {
		super({ url: 'api/campeonatos' })
		this._view = new CampeonatoListaView({ onViewCreatedFn: this._init() });
	}

	_init() {
		return async () => {
			await super._atualizarLista()
			this._view.updateList(this._lista)
		}
	}

	_getView() {
		return this._view
	}

	applyRole() {
		this._view.updateList(this._lista)
		this._view.applyRole()
	}

}