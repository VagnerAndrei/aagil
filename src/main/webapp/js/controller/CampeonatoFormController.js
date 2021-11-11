/**
 * 
 */

import { Controller } from './../components/Controller.js'
import { CampeonatoFormView } from './../view/CampeonatoFormView.js'
import { FotosUpload } from '../controller/FotosUpload.js'
import { get } from './../fetch.js'
import { Pista } from './../model/Pista.js'
import { Atleta } from './../model/Atleta.js'
import { campeonato } from './../navegacao.js'

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
			this._view.configureEnviarFormulario(this.salvarCampeonato())
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

			const blobJSON = new Blob([JSON.stringify(campeonato)], { type: 'application/json' })

			formData.append('json', blobJSON)


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


			/*					XML HTTP REQUEST						*/

			this._xhr = new XMLHttpRequest();
			this._xhr.open('POST', 'api/campeonatos')

			this._upload = (fotosCampeonatoFiles.length + midiasDivulgacaoFiles.length + regulamentoFile.length) != 0

			if (this._upload)
				this._configureXHRUpload()
			this._configureXHRResponse()

			this._xhr.send(formData)
		}
	}

	_configureXHRUpload() {
		this._xhr.upload.addEventListener('load', () => {
		})

		this._xhr.upload.addEventListener('loadstart', () => {
			this._modalUpload = new FotosUpload('Campeonato - Upload', () => this._uploadedHandler(), () => this._cancelarUpload())
		})

		this._xhr.upload.addEventListener('abort', () => {
			this._labelErro.textContent = 'Upload cancelado'
			this._modalUpload.fecharModal()
		})

		this._xhr.upload.addEventListener('error', () => {
			this._labelErro.textContent = 'Upload erro'
			this._modalUpload.fecharModal()
		})

		this._xhr.upload.addEventListener('progress', e => {
			let percent = e.lengthComputable ? (e.loaded / e.total) * 100 : '0';
			this._modalUpload?.setPercent(percent)
		})
	}

	_configureXHRResponse() {

		this._xhr.onreadystatechange = () => {
			if (this._xhr.readyState === 4) {
				let json = {}
				switch (this._xhr.status) {
					case 403:
						this._labelErro.textContent = 'Acesso negado!'
						this._modalUpload.fecharModal()
						break
					case 400:
						json = JSON.parse(this._xhr.response)
						this._labelErro.textContent = `Erro: [${json.campo}] ${json.mensagem}.`
						this._modalUpload.fecharModal()
						break
					case 202:
						json = JSON.parse(this._xhr.response)
						this._idCampeonato = json.id
						if (!this._upload) this._modalUpload = new FotosUpload('Campeonato', () => this._uploadedHandler())
						this._modalUpload.setResult('Campeonato criado com sucesso!')
						break
					case 500:
						this._labelErro.textContent = 'Ocorreu um erro no servidor, contate um administrador.'
						this._modalUpload?.fecharModal()
				}
			}
		}

		this._xhr.onerror = () => {
			this._labelErro.textContent = 'Ocorreu um erro no servidor, contate um administrador.'
			this._modalUpload.fecharModal()
		}
	}

	_uploadedHandler() {
		campeonato({ event: 'campeonatoRegistroEvent', id: this._idCampeonato })
		window.scroll(0, 500)
	}

	_cancelarUpload() {
		this._xhr?.abort()
	}
	
	_getView(){
		return this._view
	}


}