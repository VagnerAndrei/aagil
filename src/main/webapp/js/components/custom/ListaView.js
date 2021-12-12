/**
 * 
 */
import { View } from './../custom/View.js'

export class ListaView extends View {

	constructor({ titulo, idLista, onViewCreatedFn }) {
		super({ titulo, onViewCreatedFn })
		this._idLista = idLista
	}

	_init() {
		this._ulLista = document.querySelector(`#${this._idLista}`)
	}

	_liTemplateObject() {
		throw new Error('Not Yet Implemented')
	}

	updateListTemplate(list) {
		this._ulLista.innerHTML = ''
		list.forEach(item => {
			this._ulLista.appendChild(this._liTemplateObject(item))
			this._adicionarClickEvent(item)
		})
	}

	_update(template) {
		super._update(template ? (typeof template == "string" ? { html: template } : template) : { html: super._template(), status: 203 })
	}

	_adicionarClickEvent() {
		throw new Error('Not Yet Implemented')
	}


}
