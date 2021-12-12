/**
 * 
 */
import { View } from '../components/View.js'
import { postagem } from '../navegacao.js'
import { PostagemListaController } from '../pages/postagem/controller/PostagemListaController.js'
import { isAdmin } from '../sessao.js'

export class Home extends View {

	constructor() {
		super('Página Inicial')
	}

	init() {
		this._buttonPostar = document.getElementById('button-registrar-postagem')
		this._buttonPostar.addEventListener('click', postagem)

		const postagens = new PostagemListaController({ element: 'section-postagens' })
		this.applyRole()
	}

	applyRole() {
		if (isAdmin()) this._buttonPostar.classList.remove('display-none')
		else this._buttonPostar.classList.add('display-none')
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