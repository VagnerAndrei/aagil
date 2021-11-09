/**
 * 
 */
import { Controller } from './../components/Controller.js'
import { CampeonatoView } from './../view/CampeonatoView.js'
import { get } from './../fetch.js'
import { Campeonato } from './../model/Campeonato.js'

export class CampeonatoController extends Controller {

	constructor({ idCampeonato }) {
		super()

		this._view = new CampeonatoView({ onViewCreatedFn: this.init() })

		this._idCampeonato = idCampeonato
	}

	init() {
		return async () => {
			this.consultarCampeonato()
			this._view.configureRegulamento(this.getRegulamento())
		}
	}

	async consultarCampeonato() {
		const response = await get(`api/campeonatos/${this._idCampeonato}`)

		switch (response.status) {
			case 302:
				const json = await response.json()
				const campeonato = new Campeonato(json)
				this._view.setCampeonato(campeonato)
				break
			case 404:
			case 500:
				console.log(response)
				break
		}
	}
	
	getRegulamento(){
		return async () =>{
			
		}		
	}
	
	applyRole(){
		this._view.applyRole()
	}
	
}