/**
 * 
 */

import { Controller } from './../components/Controller.js'
import { CampeonatoFormView } from './../view/CampeonatoFormView.js'
import { get } from './../fetch.js'
import { Pista } from './../model/Pista.js'

export class CampeonatoFormController extends Controller {

	constructor() {
		super()
		this._view = new CampeonatoFormView({
			onViewCreatedFn: this.init()
		})

	}

	init() {
		return async () => {
			this._view.configureRefreshListaPista(this.consultarPistas())
		}
	}

	consultarPistas() {
		return async () => {
			const response = await get('api/picos/simple')

			switch (response.status) {
				case 200:
					const json = await response.json()
					this._listaPista = []
					json.forEach(json => this._listaPista.push(new Pista(json)))
					break
				case 500:
					console.log(response)
					break
			}
			
			this._view.setupListaPistas(this._listaPista)
		}
	}


}