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
		const response = await get(url)
		switch (response.status) {
			case 200:
				const html = await response.text()
				return new DOMParser().parseFromString(html, 'text/html').getElementsByTagName('main')[0].innerHTML
			case 403:
				return `<h2>Acesso negado!</h2>`
			case 404:
				return `<h2>Página não encontrada!</h2>`
		}
	}

	update(template) {
		const div = document.createElement('div')
		div.id = this._viewName
		div.innerHTML = !template ? this.template() : template
		this._main.append(div)
	}

	template() {
		return `<h2>${this._titulo}</h2>`
	}

}