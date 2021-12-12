/**
 * 
 */
import { ListaController } from './../../../components/ListaController.js'

export class PistaListaController extends ListaController {

	constructor() {
		super({ url: 'api/pistas' })
		this._view = new PistaListaView({})
	}

	_init() {
	}


	applyRole() {
	}

}