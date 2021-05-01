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
	
	async update(){
		super.update(await this.template())
		this.init()
	}

	async template() {
		return this.getHTML('pages/public/picos.html')
	}

}