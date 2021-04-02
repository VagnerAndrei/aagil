/**
 * 
 */
import { View } from '../components/View.js'

export class Home extends View {

	constructor() {
		super('Página Inicial')
	}

	template() {
		return `
		<div class="padding-top">
			<div class="border-container">
				<img alt="Circle" src="assets/img/home.png">
			</div>
		</div>
		`
	}
}