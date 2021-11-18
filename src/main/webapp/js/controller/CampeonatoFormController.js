/**
 * 
 */

import { Controller } from './../components/Controller.js'
import { CampeonatoFormView } from './../view/CampeonatoFormView.js'
import { FotosUpload } from '../controller/FotosUpload.js'
import { get } from './../fetch.js'
import { Pista } from './../model/Pista.js'
import { Atleta } from './../model/Atleta.js'
import { campeonato, pagina_nao_encontrada } from './../navegacao.js'

export class CampeonatoFormController extends Controller {

	constructor({ idCampeonato }) {
		super()
		this._view = new CampeonatoFormView({
			onViewCreatedFn: this._init(), isEdicaoMode: idCampeonato != undefined
		})
		this._idCampeonato = idCampeonato
	}

	_init() {
		return async () => {
			await this._view.configureRefreshListaPista(this._consultarPistas())
			await this._view.configureRefreshListaArbitro(this._consultarArbitros())
			this._view.configureEnviarFormulario(this._salvarCampeonato())
			if (this._idCampeonato)
				this._consultarCampeonato()
		}
	}

	async _consultarCampeonato() {
		const response = await get(`api/campeonatos/${this._idCampeonato}`)

		switch (response.status) {
			case 302:
				const json = await response.json()
				this._view.setCampeonato(json)
				break
			case 404:
				console.log(response)
				pagina_nao_encontrada()
				break
			case 500:
				console.log(response)
				break
		}

	}

	_consultarPistas() {
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

	_consultarArbitros() {
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

	_salvarCampeonato() {
		return async () => {
			const formData = new FormData()

			/*			JSON CAMPEONATO			*/
			const campeonato = this._view.getCampeonatoModel()

			const blobJSON = new Blob([JSON.stringify(campeonato)], { type: 'application/json' })

			formData.append('json', blobJSON)


			/*		REGULAMENTO	 ATTACHMENT				*/
			const regulamentoFile = this._view.getRegulamentoFile()
			if (!this._view.isRegulamentoNotModified())
				if (regulamentoFile.length == 0 && campeonato.regulamento)
					formData.append('regulamento', '')
				else
					for (let i = 0; i < regulamentoFile.length; i++) {
						formData.append('regulamento', regulamentoFile[i])
					}

			/*		MIDIAS DIVULGACAO ATTACHMENT		*/
			const midiasDivulgacaoFiles = this._view.getMidiasDivulgacaoFileList()
			for (let i = 0; i < midiasDivulgacaoFiles.length; i++) {
				formData.append('midiaDivulgacao', midiasDivulgacaoFiles[i])
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
				let json = {}, erro
				switch (this._xhr.status) {
					case 403:
						erro = 'Acesso negado!'
						if (this._upload) this._modalUpload.setResult(erro)
						this._view.setErroLabel(erro)
						break
					case 400:
						json = JSON.parse(this._xhr.response)
						erro = `Erro: [${json.campo}] ${json.mensagem}.`
						if (this._upload) this._modalUpload.setResult(erro)
						this._view.setErroLabel(erro)
						break
					case 201:
					case 202:
						json = JSON.parse(this._xhr.response)
						this._idCampeonato = json.id
						if (!this._upload) this._modalUpload = new FotosUpload('Campeonato', () => this._uploadedHandler())
						this._modalUpload.setResult(`Campeonato ${this._xhr.status == 201 ? 'criado' : 'atualizado'} com sucesso!`)
						break
					case 500:
						const erro = 'Ocorreu um erro no servidor, contate um administrador.'
						if (this._upload) this._modalUpload.setResult(erro)
						this._view.setErroLabel(erro)
				}
			}
		}

		this._xhr.onerror = () => {
			this._labelErro.textContent = 'Ocorreu um erro no servidor, contate um administrador.'
			this._modalUpload.fecharModal()
		}
	}

	_uploadedHandler() {
		if (this._xhr.status == 201 || this._xhr.status == 202) {
			campeonato({ event: 'campeonatoRegistroEvent', idCampeonato: this._idCampeonato })
			window.scroll(0, 500)
		}
	}

	_cancelarUpload() {
		this._xhr?.abort()
	}

	_getView() {
		return this._view
	}


}