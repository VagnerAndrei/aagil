/**
 * 
 */
import { View2 } from './../components/View2.js'

export class ListaView extends View2 {

	constructor({ titulo, idLista, onViewCreatedFn }) {
		super({ titulo, onViewCreatedFn })
		this._idLista = idLista
	}

	_init() {
		this._ulLista = document.querySelector(`#${this._idLista}`)
	}

	_liTemplate() {
		throw new Error('Not Yet Implemented')
	}

	updateList(list) {
		this._ulLista.innerHTML = ''
		list.forEach(item => {
			const li = document.createElement('li')
			li.innerHTML = this._liTemplate(item)
			this._ulLista.appendChild(li)
			this._adicionarClickEvent(item)
		})
	}

	_update(template) {
		super._update(template ? template : { html: super._template(), status: 203 })
	}

	_adicionarClickEvent() {
		throw new Error('Not Yet Implemented')
	}


}
