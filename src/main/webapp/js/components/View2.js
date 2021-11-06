/**
 * 
 */
import { get } from '../fetch.js'

export class View2 {

	constructor({ titulo, onViewCreatedFn }) {
		this._titulo = titulo
		this._onViewCreatedFn = onViewCreatedFn
		this._viewName = `view-${this._titulo.toLowerCase().trim()}`
		this._main = document.getElementsByTagName('main')[0]
		document.getElementsByTagName('title')[0].textContent = this._titulo;
		this.update()
	}

	applyRole() {
	}

	display(condition) {
		if (condition) {
			document.getElementsByTagName('title')[0].textContent = this._titulo
			document.getElementById(this._viewName).style.display = ''
		} else
			document.getElementById(this._viewName).style.display = 'none'
	}

	remove() {
		this._main.removeChild(document.getElementById(this._viewName))
	}

	async getHTML(url) {
		//{ status , html}
		const retorno = {}
		const response = await get(url)
		retorno.status = response.status
		switch (response.status) {
			case 200:
				const html = await response.text()
				retorno.html = new DOMParser().parseFromString(html, 'text/html').getElementsByTagName('main')[0].innerHTML
				break
			case 403:
				retorno.html = `<h2>Acesso negado!</h2>`
				break
			case 404:
				retorno.html = `<h2>Página não encontrada!</h2>`
				break
		}
		return retorno;
	}

	init() { }

	update({ html , status = 200 }) {
		const div = document.createElement('div')
		div.id = this._viewName
		div.innerHTML = !html ? this.template() : html
		div.classList.add('container-view')
		this._main.append(div)
		if (status && status == 200) {
			this.init()
			this._onViewCreatedFn()
		}
	}

	template() {
		return `<h2>${this._titulo}</h2>`
	}

}