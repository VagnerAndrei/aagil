/**
 * 
 */
import { Controller } from '../../../components/custom/Controller.js'
import { deletar } from '../../../fetch.js'
import { AtletaFotoUploadView } from '../view/AtletaFotoUploadView.js'

export class AtletaFotoUploadController extends Controller {

	constructor({ atleta, callbackHandler }) {
		super('Atualizar Foto')
		this._view = new AtletaFotoUploadView({atleta})
		this._callbackHandler = callbackHandler
		this._init()
	}

	_init() {
		this._view.configureEnviarFoto(this._enviarFoto())
		this._view.configureCancelarUpload(this._cancelarUpload())
		this._view.configureRemoverFoto(this._removerFoto())
	}


	_enviarFoto() {
		return async (atleta, event) => {

			this._xhr = new XMLHttpRequest();

			this._xhr.open('PUT', `api/atletas/${atleta.id}/foto`);

			this._xhr.upload.addEventListener('load', () => {

			});

			this._xhr.upload.addEventListener('loadstart', () => this._view.enviando(true));

			this._xhr.upload.addEventListener('abort', () => {
				this._xhr = null;
			});

			this._xhr.upload.addEventListener('error', this._view.enviando(false));

			this._xhr.upload.addEventListener('progress', e => {
				this._view.updateProgress(e)
			})

			this._xhr.onreadystatechange = () => {
				if (this._xhr.readyState === 4) {
					switch (this._xhr.status) {
						case 500:
						case 429:
						case 400:
							this._view.setErroLabel(JSON.parse(this._xhr.response).mensagem)
							this._xhr = null
							break
						case 202:
							this._callbackHandler(this._xhr.response)
							this._xhr = null
							this._view.fecharModal()
							break
						case 403:
							this._view.setErroLabel('Acesso negado')
							break
					}
				}

			}

			this._xhr.onerror = (e) => {
				this._view.setErroLabel('Ocorreu um erro no envio da imagem')
			}

			this._xhr.send(new FormData(event.target))

		}
	}

	_cancelarUpload() {
		return async () => {
			this._xhr?.abort();
		}
	}

	_removerFoto() {
		return async (atleta) => {
			const response = await deletar(`api/atletas/${atleta.id}/foto`)
			switch (response.status) {
				case 403:
					this._view.setErroLabel('Acesso Negado!')
					break
				case 406:
					response.json().then(value => this._view.setErroLabel(value.mensagem))
					this._botaoRemoverFoto.classList.add('display-none');
					this._callbackHandler();
					break
				case 500:
					response.json().then(value => this._labelErroFoto.textContent = value.mensagem)
					break
				case 204:
					this._callbackHandler();
					this._view.fecharModal();
					break
			}
		}
	}

}