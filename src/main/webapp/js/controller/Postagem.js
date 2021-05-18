import { View } from '../components/View.js'
import { TagsFormItem } from '../components/TagsFormItem.js'
import { FotosFormItem } from '../components/FotosFormItem.js'
import { atletaLogado } from '../sessao.js'
import { FotosUpload } from '../controller/FotosUpload.js'
import { home } from '../navegacao.js'

export class Postagem extends View {

	constructor() {
		super('Postagem')
	}

	init() {
		if (!document.getElementById('script-ckeditor-language')) {
			const scriptCKEditorLanguage = document.createElement('script')
			scriptCKEditorLanguage.id = 'script-ckeditor-language'
			scriptCKEditorLanguage.src = 'https://cdn.ckeditor.com/ckeditor5/27.1.0/classic/translations/pt-br.js'
			document.head.appendChild(scriptCKEditorLanguage)
		}
		if (!document.getElementById('script-ckeditor')) {
			const scriptCKEditor = document.createElement('script')
			scriptCKEditor.id = 'script-ckeditor'
			scriptCKEditor.src = 'https://cdn.ckeditor.com/ckeditor5/27.1.0/classic/ckeditor.js'
			scriptCKEditor.addEventListener('load', () => this.loadConfigCKEditor())
			document.head.appendChild(scriptCKEditor)
		} else this.loadConfigCKEditor()

		this._radioFotos = document.getElementById('input-radio-fotos')
		this._radioVideo = document.getElementById('input-radio-video')

		this._radioFotos.addEventListener('change', e => this.inputRadioChangeHandler(e.target))
		this._radioVideo.addEventListener('change', e => this.inputRadioChangeHandler(e.target))

		this._inputTitulo = document.getElementById('input-titulo')
		this._inputMidiaURL = document.getElementById('input-midia-url')

		this._divMidiaURL = document.getElementById('div-midia-url')
		this._labelErroMidiaURL = document.getElementById('label-erro-midia-url')
		this._divFotos = document.getElementById('div-fotos')

		this._tagsFormItem = new TagsFormItem('div-tags')
		this._fotosFormItem = new FotosFormItem('div-fotos')

		this._inputMidiaURL.addEventListener('change', event => this.inputMidiaURLChangeHandler(event))
		this._iframMidia = document.getElementsByTagName('iframe')[0]

		this._labelErro = document.getElementById('label-erro')
		this._buttonEnviar = document.getElementById('button-enviar')
		this._buttonEnviar.addEventListener('click', event => this.enviar(event))

		this._formPostagem = document.getElementById('form-postagem')

	}
	enviar() {
		if (this._formPostagem.checkValidity()) {
			const imgs = this._fotosFormItem.getListFiles()
			
			if ((imgs.length == 0 && this._radioFotos.checked) || (this._radioVideo.checked && !this._codigo ) || (!this._radioVideo.checked && !this._radioFotos.checked))
				if (!confirm('Este formulário nao possui nenhuma foto ou vídeo inserido, gostaria de enviá-lo assim mesmo? '))
					return

			

			const formData = new FormData()

			/*
							FOTOS ATTACHMENT
			*/

			for (let i = 0; i < imgs.length; i++) {
				formData.append('foto', imgs[i])
			}

			console.log(this._radioFotos.checked)
			console.log(this._editor)
			console.log(this._editor.getData())

			/*
							JSON OBJECT
			*/

			const json = {
				"atleta": {
					"id": atletaLogado.id
				},
				"titulo": this._inputTitulo.value,
				"conteudo": this._editor.getData(),
				"tags": this._tagsFormItem.getTagsList()
			}

			if (this._radioVideo.checked && this._codigo) {
				json.midia = {
					"codigo": this._codigo,
					"tipo": this._videoType
				}
			}
			console.log(json)
			const blobJSON = new Blob([JSON.stringify(json)], { type: 'application/json' })
			formData.append('json', blobJSON)

			/*
							XML HTTP REQUEST
					
			*/

			this._xhr = new XMLHttpRequest();

			this._xhr.open('POST', 'api/postagens')

			const upload = imgs.length != 0
			if (upload) {
				this._xhr.upload.addEventListener('load', () => {
				})

				this._xhr.upload.addEventListener('loadstart', () => {
					this._modalUpload = new FotosUpload('Postagem - Upload', () => this.uploadedHandler(), () => this.cancelarUpload())
				})

				this._xhr.upload.addEventListener('abort', () => {
					this._labelErro.textContent = 'Upload cancelado'
					this._modalUpload.fecharModal()
				})

				this._xhr.upload.addEventListener('error', () => {
					this._labelErro.textContent = 'Upload erro'
					this._modalUpload.fecharModal()
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
							this._modalUpload.fecharModal()
							break
						case 400:
							const json = JSON.parse(this._xhr.response)
							this._labelErro.textContent = `Erro: [${json.campo}] ${json.mensagem}.`
							this._modalUpload.fecharModal()
							break
						case 202:
							if (!upload) this._modalUpload = new FotosUpload('Postagem', () => this.uploadedHandler())
							this._modalUpload.setResult('Postagem realizada com sucesso!')
							break
						case 500:
							this._labelErro.textContent = 'Ocorreu um erro no servidor, contate um administrador.'
							this._modalUpload?.fecharModal()
					}
				}
			}

			this._xhr.onerror = () => {
				this._labelErro.textContent = 'Ocorreu um erro no servidor, contate um administrador.'
				this._modalUpload.fecharModal()
			}

			this._xhr.send(formData)
		}else this._formPostagem.reportValidity()
	}

	uploadedHandler() {
		home('postagemRegistroEvent')
		window.scroll(0, 500)
	}

	cancelarUpload() {
		this._xhr?.abort()
	}

	inputRadioChangeHandler(target) {
		switch (target.value) {
			case 'Fotos':
				this._divMidiaURL.classList.add('display-none')
				this._divFotos.classList.remove('display-none')
				this.setIFrameSrc()
				this._inputMidiaURL.value = ''
				this._labelErroMidiaURL.textContent = ''
				break
			case 'Video':
				this._divMidiaURL.classList.remove('display-none')
				this._divFotos.classList.add('display-none')
				this._fotosFormItem.limparLista()
				break
		}
	}

	inputMidiaURLChangeHandler(event) {
		console.log('a')
		const youtubeRegex = /^((http)?(s)?\:\/\/)?((www|m)\.)?(youtube\.com|youtu\.be)(\/([\w\-]+\?v=|embed\/|v\/)?)(?<id>[\w\-]+)(\S)*$/
		const vimeoRegex = /^((http)?(s)?\:\/\/)?((www)\.)?(vimeo\.com)(\/)(?<id>[\d\-]+)*$/
		let videoType
		let match = youtubeRegex.exec(event.target.value)
		if (match) {
			videoType = 'Youtube'
			this.setIFrameSrc(`https://www.youtube.com/embed/${match.groups.id}?rel=0`)
		} else {
			match = vimeoRegex.exec(event.target.value)
			if (match) {
				videoType = 'Vimeo'
				this.setIFrameSrc(`https://player.vimeo.com/video/${match.groups.id}`)
			}
		}
		if (!match) {
			this._labelErroMidiaURL.textContent = event.target.value != '' ? 'URL Inválida' : ''
			this.setIFrameSrc()
			this._codigo = undefined
		}
		else {
			this._labelErroMidiaURL.textContent = ''
			this._codigo = match.groups.id
			this._videoType = videoType
		}
	}

	setIFrameSrc(src) {
		this._iframMidia.src = src ? src : ''
		if (!src || src == '') this._iframMidia.classList.add('display-none')
		else this._iframMidia.classList.remove('display-none')
	}

	loadConfigCKEditor() {
		ClassicEditor.create(document.querySelector('#editor'), {
			language: 'pt-br',
			removePlugins: ['ImageUpload', 'EasyImage', 'MediaEmbed'],

		}).then(newEditor => {
			this._editor = newEditor
		}
		).catch(error => {
			console.error(error);
		})
	}


	async update() {
		const { status, html } = await this.template()
		super.update(html)
		if (status == 200)
			this.init()
	}

	async template() {
		return this.getHTML('pages/admin/postagem.html')
	}
}