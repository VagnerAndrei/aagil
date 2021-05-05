/**
 * 
 */
import { View } from '../components/View.js'
import { get } from '../fetch.js'
import { atletaLogado } from '../sessao.js'
import { PicoRegistroUpload } from '../controller/PicoRegistroUpload.js'

export class PicoRegistro extends View {

	constructor() {
		super('Registro de pico')
		this._maxFiles = 10;
		this._maxSize = 10;
		this._tags = []
	}

	init() {
		this._inputTitulo = document.querySelector('#input-titulo')

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

		this._strongTagMsg = document.querySelector('#strong-tag-msg')

		this._labelErro = document.querySelector('#label-erro')
		this._buttonEnviar = document.querySelector('#button-enviar')


		this._inputCEP.addEventListener('change', event => this.handleInputCEP(event))
		this._inputFotos.addEventListener('change', event => this.handleFiles(event))
		this._buttonSelecionarFotos.addEventListener('click', event => this.selecionarFotos(event), false)

		document.querySelector('#button-adicionar-tag').addEventListener('click', (e) => {
			e.preventDefault()
			this.handleInputTags()
		}
		)

		this._buttonEnviar.addEventListener('click', event => this.enviar(event))

		this._formPico = document.querySelector('#form-pico')

		this._formPico.addEventListener('submit', e => { e.preventDefault() })

		this._inputTag.addEventListener('keypress', (event) => {
			if (event.keyCode == 13) {
				event.preventDefault()
				this.handleInputTags()
			}
		})
	}

	async update() {
		const { status, html } = await this.template()
		super.update(html)
		if (status == 200)
			this.init()
	}

	async template() {
		return this.getHTML('pages/user/pico-registro.html')
	}

	async consultaCEP(cep) {
		const result = await get(`https://viacep.com.br/ws/${cep}/json`)
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


	enviar() {
		if (this._formPico.checkValidity()) {
			const imgs = document.querySelectorAll('.imgFileObject')

			const formData = new FormData()

			/*
							FOTOS ATTACHMENT
			*/

			for (let i = 0; i < imgs.length; i++) {
				formData.append('foto', imgs[i].file)
			}


			/*
							JSON OBJECT
			*/

			const json = {
				"atleta": {
					"id": atletaLogado.id
				},
				"picoNovo": {
					"titulo": this._inputTitulo.value,
					"endereco": {
						"cep": this._inputCEP.value,
						"estado": this._inputUF.value,
						"localidade": this._inputLocalidade.value,
						"bairro": this._inputBairro.value,
						"logradouro": this._inputLogradouro.value,
						"complemento": this._inputComplemento.value,
						"perimetro": this._inputPerimetro.value,
						"referencia": this._inputReferencia.value
					},
					"tags": this._tags
				},
				"observacoes": this._textareaObservacoes.value
			}

			const blobJSON = new Blob([JSON.stringify(json)], { type: 'application/json' })
			formData.append('json', blobJSON)

			/*
							XML HTTP REQUEST
					
			*/

			this._xhr = new XMLHttpRequest();

			this._xhr.open('POST', 'api/picos')

			const upload = imgs.length != 0
			if (upload) {
				this._xhr.upload.addEventListener('load', () => {
				})

				this._xhr.upload.addEventListener('loadstart', () => {
					this._modalUpload = new PicoRegistroUpload(() => this.cancelarUpload())
				})

				this._xhr.upload.addEventListener('abort', () => {
					this._labelErro.textContent = 'Upload cancelado'
					this._modalUpload.fecharModal(false)
				})

				this._xhr.upload.addEventListener('error', () => {
					this._labelErro.textContent = 'Upload erro'
					this._modalUpload.fecharModal(false)
				})

				this._xhr.upload.addEventListener('progress', e => {
					let percent = e.lengthComputable ? (e.loaded / e.total) * 100 : '0';
					this._modalUpload?.setPercent(percent)
				})
			}


			this._xhr.onreadystatechange = () => {
				if (this._xhr.readyState === 4) {
					switch (this._xhr.status) {
						case 403:
							this._labelErro.textContent = 'Acesso negado!'
							this._modalUpload.fecharModal(false)
							break
						case 400:
							const json = JSON.parse(this._xhr.response)
							this._labelErro.textContent = `Erro: [${json.campo}] ${json.mensagem}.`
							this._modalUpload.fecharModal(false)
							break
						case 202:
							if (!upload) this._modalUpload = new PicoRegistroUpload()
							this._modalUpload.setResult(this._xhr.responseText)
							break
						case 500:
							this._labelErro.textContent = 'Ocorreu um erro no servidor, contate um administrador.'
							this._modalUpload.fecharModal(false)
					}
				}
			}

			this._xhr.onerror = () => {
				this._labelErro.textContent = 'Ocorreu um erro no servidor, contate um administrador.'
				this._modalUpload.fecharModal(false)
			}

			this._xhr.send(formData)

		} else this._formPico.reportValidity()
	}

	cancelarUpload() {
		this._xhr?.abort()
	}

	handleInputTags() {
		const value = this._inputTag.value.toLowerCase()
		const regex = new RegExp('^[a-z0-9]+$')
		if (regex.test(value)) {
			this._strongTagMsg.textContent = ''
			if (!this._tags.some(tag => tag == value)) {
				this._tags.push(value)
				const tag = document.createElement('li')
				tag.title = 'Remover esta tag'
				tag.addEventListener('click', e => {
					this._tags.splice(this._tags.indexOf(e.target.textContent), 1)
					this._ulTags.removeChild(e.currentTarget)
					this._inputTag.focus()
				})
				tag.textContent = value;
				this._ulTags.appendChild(tag)
			} else this._strongTagMsg.textContent = 'Tag já inserida'
			this._inputTag.value = ''
		} else
			this._strongTagMsg.textContent = 'Tag inválida'
		this._inputTag.focus()
	}


	handleFiles(event) {
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
					this.setSpanText()
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