/**
 * 
 */
import { get } from './../../../fetch.js'
import { pistas } from './../../../navegacao.js'
import { PistaFormView } from './../view/PistaFormView.js'
import { FotosUpload } from './../../../components/FotosUpload.js'
import { Controller } from './../../../components/custom/Controller.js'

export class PistaFormController extends Controller {

	constructor() {
		super('Registro de pista')
		this._view = new PistaFormView({ onViewCreatedFn: this._init() })
	}

	_init() {
		return () => {
			this._view.configureConsultarCEP(this._consultarCEP())
			this._view.configureEnviarFormulario(this._enviarFormulario())
		}
	}

	_consultarCEP() {
		return async (cep) => {
			const result = await get(`https://viacep.com.br/ws/${cep}/json`)
			const json = await result.json()
			if (!json.erro)
				this._view.setConsultaCEP(json)

			else
				this._view.setErroConsultaCEP()
		}
	}


	_enviarFormulario() {
		return async (formData) => {

			this._xhr = new XMLHttpRequest();

			this._xhr.open('POST', 'api/pistas')

			const upload = formData.has('foto')

			this._configureXHR(upload)

			this._xhr.send(formData)

		}
	}

	_configureXHR(upload) {
		if (upload) {

			this._xhr.upload.addEventListener('load', () => {
			})

			this._xhr.upload.addEventListener('loadstart', () => {
				this._modalUpload = new FotosUpload('Registro de Pista - Upload', () => this._uploadedHandler(), () => this._cancelarUpload())
			})

			this._xhr.upload.addEventListener('abort', () => {
				this._view.setErroLabel('Upload cancelado')
				this._modalUpload.fecharModal()
			})

			this._xhr.upload.addEventListener('error', () => {
				this._view.setErroLabel('Upload erro')
				this._modalUpload.fecharModal()
			})

			this._xhr.upload.addEventListener('progress', e => {
				let percent = e.lengthComputable ? (e.loaded / e.total) * 100 : '0';
				this._modalUpload?.setPercent(percent)
			})
		}

		this._xhr.onreadystatechange = () => {
			if (this._xhr.readyState === 4) {
				this._xhrResponse(upload)
			}
		}

		this._xhr.onerror = () => {
			this._view.setErroLabel('Ocorreu um erro no servidor, contate um administrador.')
			this._modalUpload.fecharModal()
		}
	}

	_xhrResponse(upload) {
		switch (this._xhr.status) {
			case 403:
				this._view.setErroLabel('Acesso negado!')
				this._modalUpload.fecharModal()
				break
			case 400:
				const json = JSON.parse(this._xhr.response)
				this._view.setErroLabel(`Erro: [${json.campo}] ${json.mensagem}.`)
				this._modalUpload.fecharModal()
				break
			case 202:
				if (!upload) this._modalUpload = new FotosUpload('Registro de Pista', () => this.uploadedHandler())
				this._modalUpload.setResult(this._xhr.responseText)
				break
			case 500:
				this._view.setErroLabel('Ocorreu um erro no servidor, contate um administrador.')
				this._modalUpload?.fecharModal()
		}
	}

	_uploadedHandler() {
		pistas('pistaRegistroEvent')
		window.scroll(0, 500)
	}

	_cancelarUpload() {
		this._xhr?.abort()
	}

}