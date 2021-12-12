/**
 * 
 */
import { get } from './../../fetch.js'
import { Controller } from './Controller.js'

export class ListaPaginadaController extends Controller {

	constructor({ url }) {
		super()
		this._url = url
	}

	async _atualizarLista(indice, tamanhoDaPagina) {
		const responseAtletas = await get(`${this._url}/${indice}/${tamanhoDaPagina}`)
		switch (responseAtletas.status) {
			case 200:
				this._jsonResult = await responseAtletas.json()
				break
			case 500:
				break
		}
	}



	get lista() {
		return this._jsonResult.pagina
	}

	get totalResults() {
		return this._jsonResult.total
	}

}