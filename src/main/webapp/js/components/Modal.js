/**
 * 
 */
export class Modal {

	constructor(titulo, displayCloseButton = true, fullscreen = false) {
		this._divModal = document.querySelector('#div-modal')
		this._titulo = titulo
		this._divModal.innerHTML = this.modal()
		if (!displayCloseButton) document.querySelector('#span-botao-fechar-modal').style.display = 'none'
		this._divBGModal = document.querySelector('#div-bg-modal')
		document.querySelector('#span-botao-fechar-modal').addEventListener('click', event => this.fecharModal(event))
		document.querySelector('#div-conteudo-modal').innerHTML = this.template()
		if (fullscreen) this._divBGModal.classList.add('modal-fullscreen')
		document.body.style.overflow = 'hidden'
		this._divBGModal.style.display = 'block'
	}

	template() {
		throw new Error('Not Yet Implemented')
	}

	modal() {
		return `<div id="div-bg-modal" class="modal">
					<div class="modal-content">
						<header id="header" class="modal-container modal-header">
								<span id="span-botao-fechar-modal" title="Fechar"
									class="close-button display-top-right">&times;</span> <strong
									id="label-titulo">${this._titulo}</strong>
						</header>
						<div id="div-conteudo-modal" class="modal-container">
						</div>
					</div>
				</div>`
	}

	fecharModal() {
		document.body.style.overflow = 'auto'
		this._divModal.innerHTML = '';
	}

}