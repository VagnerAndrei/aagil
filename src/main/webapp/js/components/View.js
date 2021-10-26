/**
 * 
 */
import { get } from '../fetch.js'

export class View {

	constructor(titulo) {
		this._titulo = titulo
		this._viewName = `view-${this._titulo.toLowerCase().trim()}`
		this._main = document.getElementsByTagName('main')[0]
		document.getElementsByTagName('title')[0].textContent = this._titulo;
		this.update()
	}

	applyRole() {
	}

	save() {
		this._saved = document.getElementsByTagName('main')[0].innerHTML
	}

	load() {
		document.getElementsByTagName('main')[0].innerHTML = this._saved
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

	update(template) {
		const div = document.createElement('div')
		div.id = this._viewName
		div.innerHTML = !template ? this.template() : template
		div.classList.add('container-view')
		this._main.append(div)
	}

	template() {
		return `<h2>${this._titulo}</h2>`
	}

}