/**
 * 
 */
import { View } from '../components/View.js'

export class Home extends View {

	constructor() {
		super('Página Inicial')
	}

	async update() {
		const { html } = await this.template()
		super.update(html)
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