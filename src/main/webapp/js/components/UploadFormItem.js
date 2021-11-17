/**
 * 	

		Refatoração de FotosFormItem, possibilitando inserir duas instancias na mesma pagina
 

*/
export class UploadFormItem {

	constructor({ elementID, maxFiles, maxSize, name = 'imgUpload', label = 'Imagens', acceptTypes = "image/jpg, image/jpeg, image/png, image/bmp", isTypeImage = true }) {
		this._maxSize = maxSize;
		this._maxFiles = maxFiles
		this._elementID = elementID;
		this._name = name
		this._label = label
		this._isMultipleSelection = !maxFiles || maxFiles != 1
		this._acceptTypes = acceptTypes
		this._isTypeImage = isTypeImage
		this._init()
	}

	_init() {
		document.getElementById(this._elementID).innerHTML = this._template();

		this._input = document.querySelector(`#input-${this._name}`)
		this._buttonSelecionarArquivos = document.querySelector(`#button-selecionar-fotos-${this._name}`)
		this._spanLimiteFotos = document.querySelector(`#span-limite-fotos-${this._name}`)

		this._ulUploads = document.querySelector(`#ul-uploads-${this._name}`)

		this._input.addEventListener('change', event => this._handleFiles(event))
		this._buttonSelecionarArquivos.addEventListener('click', event => this._selecionarArquivos(event), false)
	}

	limparLista() {
		this._ulUploads.innerHTML = ''
		this._setSpanText()
	}

	_handleFiles(event) {
		const files = event.target.files
		if (files.length) {
			for (let i = 0; i < files.length; i++) {

				let file = files[i]
				if (file.size / 1024 / 1024 > this._maxSize)
					continue


				this._setupFile({ file })

				if (!this._validateAvaiableUploadsLength())
					break
			}

			this._setupForm()
		}

	}

	_validateAvaiableUploadsLength() {
		if (this._ulUploads.children.length == this._maxFiles) {
			this._buttonSelecionarArquivos.disabled = true;
			return false
		}
		return true
	}

	_setupForm() {
		this._input.value = ''
		this._setSpanText()
	}

	_setupFile({ id, src, file }) {
		const li = document.createElement('li')

		li.addEventListener('click', (event) => {
			this._ulUploads.removeChild(event.currentTarget)
			this._buttonSelecionarArquivos.disabled = false;
			this._setSpanText()
		})

		let element, fileSize, fileName

		if (file) {
			fileSize = `${(file.size / 1024 / 1024).toFixed(2)} MB`
		}
		fileName = file?.name ?? this._name

		if (this._isTypeImage) {

			const img = document.createElement('img')
			img.height = 80

			/*img.src = window.URL.createObjectURL(file)
			img.onload = function() {
				window.URL.revokeObjectURL(this.src)
			}*/

			if (file) {
				const reader = new FileReader()
				reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result } })(img)
				reader.readAsDataURL(file)
			}
			else
				if (src)
					img.src = src

			element = img
		} else {
			const strong = document.createElement('strong')
			strong.innerText = fileName
			element = strong
		}

		li.title = `Clique para remover este arquivo${this._isTypeImage && !id ? `:\n${fileName}\n${fileSize}` : ''}`
		if (id) element.id = id
		element.file = file
		element.classList.add(`${id ? 'srcFileObject' : 'uploadFileObject'}-${this._name}`)

		li.appendChild(element)

		this._ulUploads.appendChild(li)
	}

	_setSpanText() {
		this._spanLimiteFotos.textContent = `${this._maxFiles ?
			`Máximo: ${this._ulUploads.children.length}/${this._maxFiles} arquivo(s).` : ''} 
			${this._maxSize ? `${this._maxSize}MB cada.` : ''}`
	}

	_selecionarArquivos(event) {
		this._input.click()
		event.preventDefault();
	}

	_template() {
		return `
			<div class="form-item">
				<label>${this._label}:</label>
				<input type="file" id="input-${this._name}" accept="${this._acceptTypes}" ${this._isMultipleSelection ? 'multiple' : ''} style="display:none">
				<button id="button-selecionar-fotos-${this._name}" type="button" class="botao-selecionar-fotos">Selecionar...</button>
				<span id="span-limite-fotos-${this._name}"></span>
			</div>
			
			<ul id="ul-uploads-${this._name}" class="lista-upload"></ul>
			
		`
	}

	getListFiles() {
		const files = document.querySelectorAll(`.uploadFileObject-${this._name}`)

		const listFiles = []

		for (let i = 0; i < files.length; i++) {
			listFiles.push(files[i].file)
		}

		return listFiles;
	}

	getListIdsSrcFiles() {
		const files = document.querySelectorAll(`.srcFileObject-${this._name}`)

		const listFiles = []

		for (let i = 0; i < files.length; i++) {
			listFiles.push(files[i].file)
		}

		return listFiles;
	}

	addFile({ id, src }) {
		this._setupFile({ id, src })
		this._validateAvaiableUploadsLength()
		this._setupForm()
	}
}