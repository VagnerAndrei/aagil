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
		this._roledElements = []
		document.getElementsByTagName('title')[0].textContent = this._titulo;
		this._update()
	}
	
	_focusSroll(component){
		console.log(component, 'focus')
		component.focus({ preventScroll: false })
	}
	
	_scroll(y){
		window.scroll(0, y)
	}
	
	_addRoledElement({id, className, role='ADMIN'}){
		this._roledElements.push({id, className, role})
	}

	_applyRole(isAdmin) {
		this._roledElements.forEach(element => document.getElementById(element.id).className = isAdmin ? element.className : 'display-none')
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

	async _getHTML(url) {
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

	_init() { }

	_update({ html , status = 200 }) {
		const div = document.createElement('div')
		div.id = this._viewName
		div.innerHTML = !html ? this._template() : html
		div.classList.add('container-view')
		this._main.innerHTML = div.outerHTML
		if (status && status == 200) {
			this._init()
			this._onViewCreatedFn()
		}
	}

	_template() {
		return `<h2>${this._titulo}</h2>`
	}

}