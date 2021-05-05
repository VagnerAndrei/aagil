/**
 * 
 */
export class Modal {

	constructor(titulo, displayCloseButton = true) {
		this._divModal = document.querySelector('#div-modal')
		this._divModal.innerHTML = this.modal()
		if (!displayCloseButton) document.querySelector('#span-botao-fechar-modal').style.display = 'none'
		document.querySelector('#label-titulo').textContent = titulo
		document.querySelector('#div-bg-modal').style.display = 'block'
		document.querySelector('#span-botao-fechar-modal').addEventListener('click', event => this.fecharModal(event))
		document.querySelector('#div-conteudo-modal').innerHTML = this.template()
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
									id="label-titulo">Atualizar</strong>
						</header>
						<div class="modal-container">
							<div id="div-conteudo-modal"></div>
						</div>
					</div>
				</div>`
	}

	fecharModal() {
		this._divModal.innerHTML = '';
	}

}