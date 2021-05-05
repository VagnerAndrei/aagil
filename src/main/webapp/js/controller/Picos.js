/**
 * 
 */
import { View } from '../components/View.js'
import { picoRegistro } from '../navegacao.js'

export class Picos extends View {

	constructor() {
		super('Picos')
	}

	init() {
		this._buttonRegitrar = document.querySelector('#button-registrar-pico')

		this._buttonRegitrar.addEventListener('click', event => picoRegistro(event))
	}

	async update() {
		const { status, html } = await this.template()
		super.update(html)
		if (status == 200)
			this.init()
	}

	async template() {
		return this.getHTML('pages/public/picos.html')
	}

}