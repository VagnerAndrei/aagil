/**
 * 
 */
import { View2 } from './../components/View2.js'

export class ListaView extends View2 {

	constructor({ titulo, idLista, onViewCreatedFn }) {
		super({ titulo, onViewCreatedFn })
		this._idLista = idLista
	}

	init() {
		this._ulLista = document.querySelector(`#${this._idLista}`)
	}

	liTemplate() {
		throw new Error('Not Yet Implemented')
	}

	updateList(list) {
		this._ulLista.innerHTML = ''
		list.forEach(item => {
			const li = document.createElement('li')
			li.innerHTML = this.liTemplate(item)
			this._ulLista.appendChild(li)
			this.adicionarClickEvent(item)
		})
	}

	update(template) {
		super.update(template ? template : { html: super.template(), status: 203 })
	}

	adicionarClickEvent() {
		throw new Error('Not Yet Implemented')
	}


}
