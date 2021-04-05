/**
 * 
 */
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

	update() {
		const div = document.createElement('div')
		div.id = this._viewName
		div.innerHTML = this.template()
		this._main.append(div)
	}

	template() {
		return `<h2>${this._titulo}</h2>`
	}

}