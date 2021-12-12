/**
 * 
 */
import { Controller } from '../../../components/custom/Controller.js'
import { post } from '../../../fetch.js'
import { loginHandler } from '../../../sessao.js'
import { RegistroView } from '../view/RegistroView.js'

export class RegistroController extends Controller {

	constructor() {
		super()
		this._view = new RegistroView({ onViewCreatedFn: this._init() })
	}

	_init() {
		return () => {
			this._view.configureRegistrar(this._registrar())
		}
	}


	_registrar() {
		return async (json) => {

			const response = await post('api/usuarios', json)

			const responseJSON = await response.json()

			switch (response.status) {
				case 201:
					loginHandler(responseJSON, 'authEvent')
					break
				case 409:
				case 500:
					this._view.setErroRegistro(responseJSON)
					break
			}
		}
	}

}