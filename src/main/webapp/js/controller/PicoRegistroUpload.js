/**
 * 
 */
import { Modal } from '../components/Modal.js'
import { picos } from '../navegacao.js'

export class PicoRegistroUpload extends Modal {

	constructor(cancelarUploadHandler) {
		super('Registro de Pico - Upload', false)
		this._progressBar = document.querySelector('#progress');
		this._labelProgress = document.querySelector('#label-progress');
		this._labelSuccess = document.querySelector('#label-success');
		this._botaoCancelar = document.querySelector('#botao-cancelar');
		this._botaoFechar = document.querySelector('#botao-fechar');
		this._imgLoading = document.querySelector('#img-loading');
		this._botaoFechar.addEventListener('click', () => this.fecharModal(true))
		document.querySelector('#botao-cancelar').addEventListener('click', e => cancelarUploadHandler(e))
	}

	setPercent(percent) {
		this._progressBar.value = percent;
		this._labelProgress.textContent = (percent !== 100) ? `Enviando... ${Math.round(percent)}%` : "Aguarde alguns instantes enquanto as imagens são processadas no servidor..."
		if (percent === 100) {
			this._botaoCancelar.classList.add('display-none')
			this._imgLoading.classList.remove('display-none')
		}
	}

	setResult(msg) {
		this._progressBar.style.display = 'none'
		this._imgLoading.style.display = 'none'
		this._labelProgress.style.display = 'none'
		this._botaoCancelar.style.display = 'none'
		this._labelSuccess.classList.remove('display-none')
		this._botaoFechar.classList.remove('display-none')
		this._labelSuccess.textContent = msg
	}

	fecharModal(redirect) {
		if (redirect){
			picos('picoRegistroEvent')
			window.scroll(0,500)
		}
		super.fecharModal()
	}

	template() {
		return `
				<form class="pico-upload">
					<progress id="progress" value="0" max="100"></progress>
					<label id="label-success"></label>
					<label id="label-progress" class="mensagem-progress"></label>
					<img id="img-loading" class="loading display-none" src="assets/img/loading.gif">
					<button id="botao-cancelar" type="button" class="botao-cancelar">Cancelar</button>
					<button id="botao-fechar" type="button" class="botao-cancelar display-none">Fechar</button>
				</form>
					`
	}



}