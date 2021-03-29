/**
 * 
 */
import { get } from './../controller/navegacao-controller.js'


export class Modal {

	constructor(url, titulo) {
		this._elemento = document.querySelector('#conteudo-modal')
		this._bgModal = document.querySelector('#bg-modal');
		this._url = url
		document.querySelector('#bg-modal').style.display = 'block'
		document.querySelector('#label-titulo').textContent = titulo
		document.querySelector('#botao-fechar-modal').addEventListener('click', event => this.fecharModal(event))
		this.loadPage()
	}

	init() {
		throw new Error('Not Yet Implemented')
	}

	async loadPage() {
		const response = await get(this._url)
		if (response.status == 403) this._elemento.innerHTML = '<h2>Acesso negado</h2>';
		else {
			const html = await response.text();
			this._elemento.innerHTML = new DOMParser().parseFromString(html, "text/html").getElementsByTagName('main')[0].innerHTML;
			this.init()
		}
	}

	fecharModal() {
		this._elemento.innerHTML = '';
		this._bgModal.style.display = 'none';
	}

}