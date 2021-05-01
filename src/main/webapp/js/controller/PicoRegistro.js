/**
 * 
 */
import { View } from '../components/View.js'
import { get } from '../fetch.js'

export class PicoRegistro extends View {

	constructor() {
		super('Registro de pico')
		this._maxFiles = 10;
		this._maxSize = 10;
		this._tags = []
	}

	init() {
		this._inputCEP = document.querySelector('#input-cep')
		this._strongCepMsg = document.querySelector('#strong-cep-msg')

		this._inputUF = document.querySelector('#input-estado')
		this._inputLocalidade = document.querySelector('#input-localidade')
		this._inputBairro = document.querySelector('#input-bairro')
		this._inputLogradouro = document.querySelector('#input-logradouro')
		this._inputComplemento = document.querySelector('#input-complemento')
		this._inputPerimetro = document.querySelector('#input-perimetro')
		this._inputReferencia = document.querySelector('#input-referencia')

		this._inputFotos = document.querySelector('#input-fotos')
		this._buttonSelecionarFotos = document.querySelector('#button-selecionar-fotos')
		this._spanLimiteFotos = document.querySelector('#span-limite-fotos')

		this._inputTag = document.querySelector('#input-tag')
		this._textareaObservacoes = document.querySelector('#textarea-observacoes')

		this._ulTags = document.querySelector('#ul-tags')
		this._ulFotos = document.querySelector('#ul-fotos')

		this._inputCEP.addEventListener('change', event => this.handleInputCEP(event))
		this._inputFotos.addEventListener('change', event => this.handleFiles(event))
		this._buttonSelecionarFotos.addEventListener('click', event => this.selecionarFotos(event), false)

		this._inputTag.addEventListener('change', event => this.handleInputTags(event))
		this._strongTagMsg = document.querySelector('#strong-tag-msg')
	}

	handleInputTags(event) {
		const value = event.currentTarget.value.toLowerCase()
		const regex = new RegExp('^[a-z0-9]+$')
		if (regex.test(value)) {
			this._strongTagMsg.textContent = ''
			if (!this._tags.some(tag => tag == value)) {
				this._tags.push(value)
				const tag = document.createElement('li')
				tag.textContent = value;
				this._ulTags.appendChild(tag)
			} else this._strongTagMsg.textContent = 'Tag já inserida'
		} else
			this._strongTagMsg.textContent = 'Tag inválida'

		this._inputTag.value = ''
	}


	handleFiles(event) {
		const files = event.target.files
		if (!files.length) {
			console.log('sem arquivos selecionados')
		} else {

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
					this.setSpanText()
				})

				let img = document.createElement('img')
				img.src = window.URL.createObjectURL(file)
				img.height = 60
				img.onload = function() {
					window.URL.revokeObjectURL(this.src)
				}

				li.appendChild(img)
				li.appendChild(fileName)
				li.appendChild(fileSize)
				this._ulFotos.appendChild(li)
				console.log('arquivos selecionados')
			}
			this._inputFotos.value = ''
			this.setSpanText()

		}

	}

	setSpanText() {
		this._spanLimiteFotos.textContent = `Máximo: ${this._ulFotos.children.length}/${this._maxFiles} fotos. ${this._maxSize}MB cada.`
	}

	selecionarFotos(event) {
		this._inputFotos.click()
		event.preventDefault();
	}

	handleInputCEP(event) {
		//event.target.value = event.target.value.replace(/[^\d]/, '')
		const value = event.target.value
		const regex = new RegExp('^[0-9]{5}[-]?[0-9]{3}$')
		this.resetEndereco()
		if (value)
			if (regex.test(value)) this.consultaCEP(value)
			else this._strongCepMsg.textContent = 'CEP inválido'
		else this._strongCepMsg.textContent = ''

	}

	async update() {
		super.update(await this.template())
		this.init()
	}

	async template() {
		return this.getHTML('pages/user/pico-registro.html')
	}

	async consultaCEP(cep) {
		const result = await get(`https://viacep.com.br/ws/${cep}/json/`)
		const json = await result.json()
		if (!json.erro) {
			const { logradouro, complemento, localidade, bairro, uf } = json;
			this._inputUF.value = uf;
			this._inputLocalidade.value = localidade;
			this._inputBairro.value = bairro;
			this._inputLogradouro.value = logradouro;
			this._inputComplemento.value = complemento;
			this._strongCepMsg.textContent = ''
		}
		else {
			this._strongCepMsg.textContent = 'CEP não encontrado'

		}
	}

	resetEndereco() {
		this._inputUF.value = '';
		this._inputLocalidade.value = '';
		this._inputBairro.value = '';
		this._inputLogradouro.value = '';
		this._inputComplemento.value = '';
		this._inputPerimetro.value = '';
		this._inputReferencia.value = '';
	}



}