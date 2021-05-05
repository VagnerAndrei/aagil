/**
 * 
 */
import { View } from '../components/View.js'

export class Sobre extends View {

	constructor() {
		super('Sobre')
	}

	async update() {
		const { html } = await this.template()
		super.update(html)
	}

	async template() {
		return this.getHTML('pages/public/sobre.html')
		//		`
		//		<div class="sobre">
		//			<h1>Sobre</h1>
		//			<p>A Circle é um Sistema Web para agrupamento de atletas de esportes
		//			radicais e realização das práticas. Fornecendo para o atleta
		//			a possibilidade de catalogar sua experiência com o esporte tanto
		//			individualmente quanto em grupo, além de detalhar a categoria
		//			esportiva e possuir um meio de registro dos locais de prática Também
		//			possui um sistema de melhor manobra e gerencia de eventos,
		//			campeonatos e rankings.</p>
		//		</div>
		//		`
	}
}