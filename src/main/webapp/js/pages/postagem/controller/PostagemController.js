import { FotosUpload } from './../../../controller/FotosUpload.js'
import { home } from './../../../navegacao.js'
import { Controller } from '../../../components/Controller.js'
import { PostagemView } from '../view/PostagemView.js'

export class PostagemController extends Controller {

	constructor() {
		super()
		this._view = new PostagemView({ onViewCreatedFn: this._init() })
	}

	_init() {
		return () => {
			this._view.configureEnviarFormulario(this._enviar())
		}
	}


	_enviar() {

		return async (formData) => {

			const upload = formData.has('foto')

			this._xhr = new XMLHttpRequest();

			this._xhr.open('POST', 'api/postagens')

			this._configureXHRUpload(upload)

			this._xhr.send(formData)
		}
	}

	_configureXHRUpload(upload) {
		if (upload) {

			this._xhr.upload.addEventListener('load', () => {
			})

			this._xhr.upload.addEventListener('loadstart', () => {
				this._modalUpload = new FotosUpload('Postagem - Upload', () => this._uploadedHandler(), () => this._cancelarUpload())
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

			this._xhr.onreadystatechange = () => {
				if (this._xhr.readyState === 4)
					this._xhrResponse(upload)
			}

			this._xhr.onerror = () => {
				this._labelErro.textContent = 'Ocorreu um erro no servidor, contate um administrador.'
				this._modalUpload.fecharModal()
			}
		}
	}

	_xhrResponse(upload) {
		switch (this._xhr.status) {
			case 403:
				this._view.setLabelErro('Acesso negado!')
				this._modalUpload.fecharModal()
				break
			case 400:
				const json = JSON.parse(this._xhr.response)
				this._view.setLabelErro(`Erro: [${json.campo}] ${json.mensagem}.`)
				this._modalUpload.fecharModal()
				break
			case 202:
				if (!upload) this._modalUpload = new FotosUpload('Postagem', () => this._uploadedHandler())
				this._modalUpload.setResult('Postagem realizada com sucesso!')
				break
			case 500:
				this._view.setLabelErro('Ocorreu um erro no servidor, contate um administrador.')
				this._modalUpload?.fecharModal()
		}
	}

	_uploadedHandler() {
		home('postagemRegistroEvent')
		window.scroll(0, 500)
	}

	_cancelarUpload() {
		this._xhr?.abort()
	}

}