/**
 * 
 */
import { get } from './../fetch.js'

export class Lista {

	constructor(url) {
		this._url = url
		this._elemento = document.querySelector('#ul-lista')
	}
	
	async atualizarLista() {
		const responseAtletas = await get(this._url)

		switch (responseAtletas.status) {
			case 200:
				this._lista = await responseAtletas.json()
				break
			case 500:
				console.log(responseAtletas)
				break
		}
	}

	get lista() {
		return this._lista
	}
	
	atualizarHTML() {
		this._elemento.innerHTML = this.template()
	}

	template() {
		throw new Error('Not Yet Implemented')
	}


}
