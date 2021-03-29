/**
 * 
 */
import { Modal } from './../components/Modal.js'
import { deletar, urls } from './../controller/navegacao-controller.js'


export class AtletaFotoUpload extends Modal {
	constructor(atleta, callbackHandler) {
		super(urls.atleta_atualizar_foto.path, 'Atualizar Foto')
		this._atleta = atleta
		this._callbackHandler = callbackHandler
		this._tamanhoMaximo = 10
	}

	init() {
		/*
	ATRIBUINDO HTML ELEMENTS ATUALIZAR FOTO ATLETA
	*/
		this._form = document.forms.namedItem('form-upload');
		this._labelErroFoto = document.querySelector('#label-erro-foto');
		this._botaoRemoverFoto = document.querySelector('#botao-remover-foto');
		this._botaoCancelar = document.querySelector('#botao-cancelar');
		this._botaoEnviar = document.querySelector('#botao-enviar');
		this._progressBar = document.querySelector('#progress');
		this._labelProgress = document.querySelector('#label-progress');
		this._inputFoto = document.querySelector('#input-foto');

		/*
		ADICIONANDO EVENTOS
		*/
		this._form.addEventListener('submit', event => this.enviarFoto(event));
		this._inputFoto.addEventListener('change', event => this.inputFotoChange(event))
		this._botaoCancelar.addEventListener('click', event => this.cancelarUpload(event))

		/*
		VERIFICANDO FOTO ATUAL
		*/
		if (this._atleta.foto) {
			this._botaoRemoverFoto.classList.remove('display-none');
			this._botaoRemoverFoto.addEventListener('click', event => this.removerFoto(event));
		}
	}

	inputFotoChange() {
		if ((this._inputFoto.files[0].size / 1024 / 1024).toFixed(2) > this._tamanhoMaximo) {
			this._labelErroFoto.textContent = `Tamanho do arquivo ${(this._inputFoto.files[0].size / 1024 / 1024).toFixed(2)} excede ${this._tamanhoMaximo.toFixed(2)} (MB)`
			this._form.reset();
			this._botaoEnviar.classList.add('display-none');
			this._botaoRemoverFoto.classList.add('display-none');
		}
		else {
			this._botaoEnviar.classList.remove('display-none');
			this._labelErroFoto.textContent = '';
			this._botaoRemoverFoto.classList.add('display-none');
		}
		this._botaoCancelar.classList.remove('display-none');
	}


	enviarFoto(event) {

		event.preventDefault();

		if (this._labelErroFoto.textContent == '') {
			this._xhr = new XMLHttpRequest();

			this._xhr.open('PUT', `api/atletas/${this._atleta.id}/foto`);

			this._xhr.upload.addEventListener('load', () => {

			});

			this._xhr.upload.addEventListener('loadstart', () => this.enviando(true));

			this._xhr.upload.addEventListener('abort', () => {
				console.log('abort')
				this._xhr = null;
			});

			this._xhr.upload.addEventListener('error', this.enviando(false));

			this._xhr.upload.addEventListener('progress', e => {
				const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : '0';
				this._progressBar.value = percent;
				this._labelProgress.textContent = percent !== 100 ? `Enviando... (${Math.round(percent)})` : "Processando imagem..."
				if (percent === 100) this._botaoCancelar.classList.add('display-none');
			})

			this._xhr.onreadystatechange = () => {
				if (this._xhr.readyState === 4) {
					switch (this._xhr.status) {
						case 500:
						case 429:
						case 400:
							this._inputFoto.disabled = false
							this._labelErroFoto.textContent = JSON.parse(this._xhr.response).mensagem
							this._xhr = null
							break
						case 202:
							this._callbackHandler(this._xhr.response)
							this._xhr = null
							this.fecharModal()
							break
						case 403:
							this._inputFoto.disabled = false
							this._labelErroFoto.textContent = "Acesso negado"
							break
					}
				}

			}

			this._xhr.onerror = (e) => {
				console.log(e)
				this._labelErroFoto.textContent = "Ocorreu um erro no envio da imagem"
			}
			console.log(event.target)
			console.log(new FormData(event.target))
			this._xhr.send(new FormData(event.target))
		}

	}

	enviando(bool) {
		if (bool) {
			this._inputFoto.disabled = true
			this._botaoCancelar.classList.remove('display-none');
			this._progressBar.classList.remove('display-none');
		}
		else {
			this._inputFoto.disabled = false
			this._progressBar.classList.add('display-none')
			this._botaoCancelar.classList.add('display-none');
		}
		this._botaoEnviar.classList.add('display-none');
	}

	cancelarUpload() {
		this._xhr?.abort();
		this._labelErroFoto.textContent = '';
		this._form.reset();
		this.enviando(false);
		if (this._atleta.foto) {
			this._botaoRemoverFoto.classList.remove('display-none');
		}
	}


	async removerFoto() {
		const response = await deletar(`api/atletas/${this._atleta.id}/foto`)
		console.log(response)
		switch (response.status) {
			case 403:
				this._labelErroFoto.textContent = 'Acesso negado!'
				break
			case 406:
				response.json().then(value => this._labelErroFoto.textContent = value.mensagem)
				this._botaoRemoverFoto.classList.add('display-none');
				this._callbackHandler();
				break
			case 500:
				response.json().then(value => this._labelErroFoto.textContent = value.mensagem)
				break
			case 204:
				this._callbackHandler();
				this.fecharModal();
				break
		}
	}
}