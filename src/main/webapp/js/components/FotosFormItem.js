/**
 * 
 */
export class FotosFormItem {

	constructor(elementID, maxFiles=10, maxSize=10) {
		this._maxSize = maxFiles;
		this._maxFiles = maxFiles
		this._elementID = elementID;
		this._init()
	}

	_init() {
		document.getElementById(this._elementID).innerHTML = this._template();

		this._inputFotos = document.querySelector('#input-fotos')
		this._buttonSelecionarFotos = document.querySelector('#button-selecionar-fotos')
		this._spanLimiteFotos = document.querySelector('#span-limite-fotos')
		this._ulFotos = document.getElementById('ul-fotos')

		this._inputFotos.addEventListener('change', event => this._handleFiles(event))
		this._buttonSelecionarFotos.addEventListener('click', event => this._selecionarFotos(event), false)


	}

	_handleFiles(event) {
		const files = event.target.files
		if (files.length) {
			for (let i = 0; i < files.length; i++) {
				if (this._ulFotos.children.length == this._maxFiles) {
					this._buttonSelecionarFotos.disabled = true;
					break
				}
				let file = files[i]
				if (file.size / 1024 / 1024 > this._maxSize)
					continue
				let li = document.createElement('li')
				let fileSize = document.createElement('span')
				let fileName = document.createElement('span')
				fileSize.innerText = `${(file.size / 1024 / 1024).toFixed(2)} MB`
				fileName.innerText = file.name
				li.title = 'Remover esta foto'
				li.addEventListener('click', (event) => {
					this._ulFotos.removeChild(event.currentTarget)
					this._buttonSelecionarFotos.disabled = false;
					this._setSpanText()
				})

				let img = document.createElement('img')
				img.height = 60
				img.classList.add('imgFileObject')
				img.file = file;


				/*img.src = window.URL.createObjectURL(file)
				img.onload = function() {
					window.URL.revokeObjectURL(this.src)
				}*/

				const reader = new FileReader()
				reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result } })(img)
				reader.readAsDataURL(file)

				li.appendChild(img)
				li.appendChild(fileName)
				li.appendChild(fileSize)
				this._ulFotos.appendChild(li)
			}
			this._inputFotos.value = ''
			this._setSpanText()

		}

	}

	_setSpanText() {
		this._spanLimiteFotos.textContent = `Máximo: ${this._ulFotos.children.length}/${this._maxFiles} fotos. ${this._maxSize}MB cada.`
	}

	_selecionarFotos(event) {
		this._inputFotos.click()
		event.preventDefault();
	}

	_template() {
		return `
			<div class="form-item">
				<label>Fotos:</label>
				<input type="file" id="input-fotos" accept="image/jpg, image/jpeg, image/png, image/bmp" multiple style="display:none">
				<button id="button-selecionar-fotos" type="button" class="botao-selecionar-fotos">Selecionar...</button>
				<span id="span-limite-fotos"></span>
			</div>
			<ul id="ul-fotos">
			</ul>
		`
	}

	getListFiles() {
		const imgs = document.querySelectorAll('.imgFileObject')

		const listFiles = []

		for (let i = 0; i < imgs.length; i++) {
			listFiles.push(imgs[i].file)
		}
		
		return listFiles;
	}
}