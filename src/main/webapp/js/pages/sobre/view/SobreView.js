/**
 * 
 */
import { View } from './../../../components/custom/View.js'

export class SobreView extends View {

	constructor() {
		super({titulo : 'Sobre' })
	}
	
	_init(){
		this._scroll(350)
	}

	async _update() {
		super._update(await this._template())
	}

	async _template() {
		return this._getHTML('pages/public/sobre.html')
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