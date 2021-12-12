/**
 * 
 */
import { SelecionarAtletaView } from './../view/SelecionarAtletaView.js'
import { get } from './../../../fetch.js'
import { Atleta } from './../model/Atleta.js'

export class SelecionarAtletaController {

	constructor({titulo, callBackHandlerFn}) {
		this._view = new SelecionarAtletaView({titulo, callBackHandlerFn})
		this._init()
	}
	
	_init(){
		this._view.configureRefreshListaAtleta(this._consultarAtletas())
	}
	
	_consultarAtletas() {
		return async () => {
			const response = await get('api/atletas/simple')

			switch (response.status) {
				case 200:
					const json = await response.json()
					this._listaAtletas = []
					json.forEach(json => this._listaAtletas.push(new Atleta(json)))
					break
				case 500:
					break
			}

			this._view.setupListaAtletas(this._listaAtletas)
		}
	}
	
}