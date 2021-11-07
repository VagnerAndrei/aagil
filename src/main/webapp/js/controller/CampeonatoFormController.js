/**
 * 
 */

import { Controller } from './../components/Controller.js'
import { CampeonatoFormView } from './../view/CampeonatoFormView.js'
import { get } from './../fetch.js'
import { Pista } from './../model/Pista.js'
import { Atleta } from './../model/Atleta.js'

export class CampeonatoFormController extends Controller {

	constructor() {
		super()
		this._view = new CampeonatoFormView({
			onViewCreatedFn: this.init()
		})

	}

	init() {
		return async () => {
			this._view.configureRefreshListaPista(this.consultarPistas())
			this._view.configureRefreshListaArbitro(this.consultarArbitros())
		}
	}

	consultarPistas() {
		return async () => {
			const response = await get('api/picos/simple')

			switch (response.status) {
				case 200:
					const json = await response.json()
					this._listaPista = []
					json.forEach(json => this._listaPista.push(new Pista(json)))
					break
				case 500:
					console.log(response)
					break
			}
			
			this._view.setupListaPistas(this._listaPista)
		}
	}
	
	consultarArbitros() {
		return async () => {
			const response = await get('api/atletas/simple')

			switch (response.status) {
				case 200:
					const json = await response.json()
					this._listaArbitro = []
					json.forEach(json => this._listaArbitro.push(new Atleta(json)))
					break
				case 500:
					console.log(response)
					break
			}
			
			this._view.setupListaArbitros(this._listaArbitro)
		}
	}
	
	salvarCampeonato() {
		return async () => {
			const formData = new FormData()
			
			/*			JSON CAMPEONATO			*/
			const campeonato = this._view.getCampeonatoModel()
			
			const json = JSON.stringify(campeonato)
			
			console.log(json)
		
			
			/*		REGULAMENTO	 ATTACHMENT				*/
			const regulamentoFile = this._view.getRegulamentoFile()
			for (let i = 0; i < regulamentoFile.length; i++) {
				formData.append('regulamento', regulamentoFile[i])
			}
			
			/*		MIDIAS DIVULGACAO ATTACHMENT		*/
			const midiasDivulgacaoFiles = this._view.getMidiasDivulgacaoFileList()
			for (let i = 0; i < midiasDivulgacaoFiles.length; i++) {
				formData.append('midia-divulgacao', midiasDivulgacaoFiles[i])
			}
			
			/*		FOTOS CAMPEONATO ATTACHMENT			*/
			const fotosCampeonatoFiles = this._view.getFotosCampeonatoFileList()
			for (let i = 0; i < fotosCampeonatoFiles.length; i++) {
				formData.append('foto', fotosCampeonatoFiles[i])
			}
			
			
		
			
		}
	}


}