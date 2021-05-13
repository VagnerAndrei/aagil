/**
 * 
 */
import { View } from '../components/View.js'
import { postagem } from '../navegacao.js'

export class Home extends View {

	constructor() {
		super('Página Inicial')
	}

	init() {
		document.querySelector('#button-registrar-postagem').addEventListener('click', postagem)
	}

	async update() {
		const { html } = await this.template()
		super.update(html)
		this.init()
	}

	async template() {
		return this.getHTML('pages/public/home.html')
		//		`
		//		<div class="padding-top">
		//			<div class="border-container">
		//				<img alt="Circle" src="assets/img/home.png">
		//			</div>
		//		</div>
		//		`
	}
}