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

				let li = document.createElement('li')

				const fileSize = `${(file.size / 1024 / 1024).toFixed(2)} MB`
				const fileName = file.name

				li.title = `Clique para remover esta arquivo${this._isTypeImage? `:\n${fileName}\n${fileSize}` : ''}`

				li.addEventListener('click', (event) => {
					this._ulUploads.removeChild(event.currentTarget)
					this._buttonSelecionarArquivos.disabled = false;
					this._setSpanText()
				})

				if (this._isTypeImage) {
					let img = document.createElement('img')
					img.height = 60
					img.classList.add(`uploadFileObject-${this._name}`)
					img.file = file;

					/*img.src = window.URL.createObjectURL(file)
					img.onload = function() {
						window.URL.revokeObjectURL(this.src)
					}*/

					const reader = new FileReader()
					reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result } })(img)
					reader.readAsDataURL(file)

					li.appendChild(img)
				}else{
					const strong = document.createElement('strong')
					strong.innerText = fileName
					strong.classList.add(`uploadFileObject-${this._name}`)
					strong.file = file;
					li.appendChild(strong)
				}
				this._ulUploads.appendChild(li)
				if (this._ulUploads.children.length == this._maxFiles) {
					this._buttonSelecionarArquivos.disabled = true;
					break
				}
			}
			this._input.value = ''
			this._setSpanText()

		}

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
}