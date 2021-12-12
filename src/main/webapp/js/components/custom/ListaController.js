/**
 * 
 */
import { get } from './../../fetch.js'
import { Controller } from './Controller.js'

export class ListaController extends Controller {

	constructor({ url }) {
		super()
		this._url = url
	}

	async _atualizarLista() {
		const response = await get(this._url)

		switch (response.status) {
			case 200:
				this._lista = await response.json()
				break
			case 500:
				console.log(response)
				break
		}
	}
	
	

	get lista() {
		return this._lista
	}
	
}