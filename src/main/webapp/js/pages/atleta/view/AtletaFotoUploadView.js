/**
 * 
 */
import { Modal } from '../../../components/custom/Modal.js'
import { Atleta } from '../model/Atleta.js'

export class AtletaFotoUploadView extends Modal {

	constructor({ atleta }) {
		super('Atualizar Foto')
		this._atleta = new Atleta(atleta)
		this._tamanhoMaximo = 10
		this._init()
	}

	_init() {
		this._form = document.forms.namedItem('form-upload');
		this._labelErroFoto = document.querySelector('#label-erro-foto');
		this._botaoRemoverFoto = document.querySelector('#botao-remover-foto');
		this._botaoCancelar = document.querySelector('#botao-cancelar');
		this._botaoEnviar = document.querySelector('#botao-enviar');
		this._progressBar = document.querySelector('#progress');
		this._labelProgress = document.querySelector('#label-progress');
		this._inputFoto = document.querySelector('#input-foto');

		if (this._atleta.foto) {
			this.setVisibleBotaoRemoverFoto(true)
		}
		this._configureInputFotoChange()
	}

	_template() {
		return `
			<form enctype="multipart/form-data" name="form-upload">
				<label id="label-erro-foto" for="foto" class="mensagem-erro"></label> 
				<p>
				<input id="input-foto" type="file" name="foto" required size="10"
					accept="image/jpg, image/jpeg, image/png, image/bmp">
					
				<progress id="progress" value="0" max="100" class="display-none"></progress>
				<label id="label-progress" for="foto" class="mensagem-progress"></label> 
				<button id="botao-remover-foto" type="button"
					class="display-none botao-cancelar">Remover foto atual</button>
				
				<button id="botao-cancelar" type="button"
					class="display-none botao-cancelar">Cancelar</button>
					
				<button id="botao-enviar" class="display-none" type="submit">Enviar</button>
			</form>
		`
	}

	/*
									   PRIVATE CONFIGURE METHODS
																													   */
	_configureInputFotoChange() {
		this._inputFoto.addEventListener('change', event => this._inputFotoChange(event))
	}

	/*
									   PUBLIC CONFIGURE METHODS
																													   */

	configureEnviarFoto(command) {
		this._form.addEventListener('submit', event => this._enviarFoto(event, command));
	}
	
	configureRemoverFoto(command) {
		this._botaoRemoverFoto.addEventListener('click', () => this._removerFoto(command))
	}

	configureCancelarUpload(command) {
		this._botaoCancelar.addEventListener('click', () => this._cancelarUpload(command))
	}




	_inputFotoChange() {
		console.log('1')
		if ((this._inputFoto.files[0].size / 1024 / 1024).toFixed(2) > this._tamanhoMaximo) {
		console.log('2')

			this._labelErroFoto.textContent = `Tamanho do arquivo ${(this._inputFoto.files[0].size / 1024 / 1024).toFixed(2)} excede ${this._tamanhoMaximo.toFixed(2)} (MB)`

			this._form.reset();
			this._setVisibleBotaoEnviar(false)
			this.setVisibleBotaoRemoverFoto(false)
		}
		else {
		console.log('3')
			this._setVisibleBotaoEnviar(true)
			this.setErroLabel('')
			this.setVisibleBotaoRemoverFoto(false)
		}
		this._setVisibleBotaoCancelar(true)
	}

	_enviarFoto(event, enviarFotoController) {
		event.preventDefault();
		if (this._labelErroFoto.textContent == '')
			enviarFotoController(this._atleta, event)
	}

	_removerFoto(removerFotoControler) {
		removerFotoControler(this._atleta)
	}

	_cancelarUpload(cancelarUploadController) {

		cancelarUploadController(this._atleta)

		this.setErroLabel('')
		this._form.reset()

		this.enviando(false)

		if (this._atleta.foto) {
			this.setVisibleBotaoRemoverFoto(true)
		}
	}

	enviando(bool) {
		this._setEnabledInputFoto(!bool)
		this._setVisibleBotaoCancelar(bool)
		this._setVisibleProgressBar(bool)
		this._setVisibleBotaoEnviar(false)
	}

	updateProgress(event) {
		let percent = event.lengthComputable ? (event.loaded / event.total) * 100 : '0';
		this._progressBar.value = percent;
		this._labelProgress.textContent = percent !== 100 ? `Enviando... ${Math.round(percent)}%` : "Processando imagem..."
		if (percent === 100) this._setVisibleBotaoCancelar(false)
	}

	setErroLabel(msg) {
		this._labelErroFoto.textContent = msg
	}

	setVisibleBotaoRemoverFoto(visible) {
		this._botaoRemoverFoto.className = visible ? 'botao-cancelar' : 'display-none'
	}

	_setVisibleBotaoEnviar(visible) {
		this._botaoEnviar.className = visible ? '' : 'display-none'
	}

	_setVisibleBotaoCancelar(visible) {
		this._botaoCancelar.className = visible ? 'botao-cancelar' : 'display-none'
	}

	_setVisibleProgressBar(visible) {
		this._progressBar.className = visible ? '' : 'display-none'
	}

	_setEnabledInputFoto(enabled) {
		this._inputFoto.disabled = !enabled
	}

}