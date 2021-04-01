/**
 * 
 */
import { get } from './../fetch.js'
import { View } from './../components/View.js'

export class Lista extends View {

	constructor(titulo, url) {
		super(titulo)
		this._url = url
		this._ulLista = document.querySelector('#ul-lista')
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

	updateTemplate() {
		this._ulLista.innerHTML = this.listTemplate()
	}

	listTemplate() {
		throw new Error('Not Yet Implemented')
	}
	
	template() {
		throw new Error('Not Yet Implemented')
	}


}
