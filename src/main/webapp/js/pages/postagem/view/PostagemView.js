import { TagsFormItem } from '../../../components/TagsFormItem.js'
import { UploadFormItem } from '../../../components/UploadFormItem.js'
import { View } from '../../../components/custom/View.js'
import { atletaLogado } from '../../../sessao.js'
import { Postagem } from './../model/Postagem.js'

export class PostagemView extends View {

	constructor({ onViewCreatedFn, isEdicaoMode }) {
		super({ titulo: 'Postagem', onViewCreatedFn })
		this._enviarFormularioFn = {}
		this._isEdicaoMode = isEdicaoMode
	}

	_init() {
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
			scriptCKEditor.addEventListener('load', () => this._loadConfigCKEditor())
			document.head.appendChild(scriptCKEditor)
		} else this._loadConfigCKEditor()

		this._radioFotos = document.getElementById('input-radio-fotos')
		this._radioVideo = document.getElementById('input-radio-video')

		this._radioFotos.addEventListener('change', e => this._inputRadioChangeHandler(e.target))
		this._radioVideo.addEventListener('change', e => this._inputRadioChangeHandler(e.target))

		this._inputTitulo = document.getElementById('input-titulo')
		this._inputMidiaURL = document.getElementById('input-midia-url')

		this._divMidiaURL = document.getElementById('div-midia-url')
		this._labelErroMidiaURL = document.getElementById('label-erro-midia-url')
		this._divFotos = document.getElementById('div-fotos')

		this._tagsFormItem = new TagsFormItem('div-tags')
		this._uploadFormItem = new UploadFormItem({ elementID: 'div-fotos', name: 'fotos-postagem' })

		this._inputMidiaURL.addEventListener('change', event => this._inputMidiaURLChangeHandler(event))
		this._iframMidia = document.getElementsByTagName('iframe')[0]

		this._labelErro = document.getElementById('label-erro')
		this._buttonEnviar = document.getElementById('button-enviar')

		if (this._isEdicaoMode)
			this._buttonEnviar.textContent = 'Atualizar'

		this._buttonEnviar.addEventListener('click', event => this._enviar(event))

		this._formPostagem = document.getElementById('form-postagem')


	}

	configureEnviarFormulario(command) {
		this._enviarFormularioFn = command
	}

	setLabelErro(msg) {
		this._labelErro.textContent = msg
	}

	_enviar() {
		if (this._formPostagem.checkValidity()) {

			const imgs = this._uploadFormItem.getListFiles()
			const idsImgs = this._uploadFormItem.getListIdsSrcFiles()

			if (((imgs.length == 0 && idsImgs.length == 0) && this._radioFotos.checked) || (this._radioVideo.checked && !this._codigo) || (!this._radioVideo.checked && !this._radioFotos.checked))
				if (!confirm('Este formulário nao possui nenhuma foto ou vídeo inserido, gostaria de enviá-lo assim mesmo? '))
					return



			const formData = new FormData()
			/*
							FOTOS ATTACHMENT
			*/

			for (let i = 0; i < imgs.length; i++) {
				formData.append('foto', imgs[i])
			}

			/*
							JSON OBJECT
			*/
			console.log(this._editor.getData())
			const json = {
				"atleta": {
					"id": atletaLogado.id
				},
				"titulo": this._inputTitulo.value,
				"conteudo": this._editor.getData(),
				"tags": this._tagsFormItem.getTagsList(),
				"fotos": idsImgs
			}

			if (this._postagem?.id)
				json.id = this._postagem.id

			if (this._radioVideo.checked && this._codigo) {
				json.midia = {
					"codigo": this._codigo,
					"tipo": this._videoType
				}
			}

			const blobJSON = new Blob([JSON.stringify(json)], { type: 'application/json' })

			formData.append('json', blobJSON)

			this._enviarFormularioFn(formData)
		}
		else this._formPostagem.reportValidity()
	}

	_inputRadioChangeHandler(target) {
		switch (target.value) {
			case 'Fotos':
				this._divMidiaURL.classList.add('display-none')
				this._divFotos.classList.remove('display-none')
				this._setIFrameSrc()
				this._inputMidiaURL.value = ''
				this._labelErroMidiaURL.textContent = ''
				break
			case 'Video':
				this._divMidiaURL.classList.remove('display-none')
				this._divFotos.classList.add('display-none')
				this._uploadFormItem.limparLista()
				break
		}
	}

	_inputMidiaURLChangeHandler(event) {
		this._verificaURL(event.target.value)
	}

	_verificaURL(value) {
		const youtubeRegex = /^((http)?(s)?\:\/\/)?((www|m)\.)?(youtube\.com|youtu\.be)(\/([\w\-]+\?v=|embed\/|v\/)?)(?<id>[\w\-]+)(\S)*$/
		const vimeoRegex = /^((http)?(s)?\:\/\/)?((www)\.)?(vimeo\.com)(\/)(?<id>[\d\-]+)*$/
		let videoType
		let match = youtubeRegex.exec(value)
		if (match) {
			videoType = 'Youtube'
			this._setIFrameSrc(`https://www.youtube.com/embed/${match.groups.id}?rel=0`)
		} else {
			match = vimeoRegex.exec(value)
			if (match) {
				videoType = 'Vimeo'
				this._setIFrameSrc(`https://player.vimeo.com/video/${match.groups.id}`)
			}
		}
		if (!match) {
			this._labelErroMidiaURL.textContent = value != '' ? 'URL Inválida' : ''
			this._setIFrameSrc()
			this._codigo = undefined
		}
		else {
			this._labelErroMidiaURL.textContent = ''
			this._codigo = match.groups.id
			this._videoType = videoType
		}
	}

	_setIFrameSrc(src) {
		this._iframMidia.src = src ? src : ''
		if (!src || src == '') this._iframMidia.classList.add('display-none')
		else this._iframMidia.classList.remove('display-none')
	}

	_loadConfigCKEditor() {
		ClassicEditor.create(document.querySelector('#editor'), {
			language: 'pt-br',
			removePlugins: ['ImageUpload', 'EasyImage', 'MediaEmbed'],

		}).then(newEditor => {
			this._editor = newEditor
			if (this._postagem) {
				this._editor.setData(this._postagem.conteudo)
			}
		}
		).catch(error => {
			console.log(error);
		})
	}


	async _update() {
		super._update(await this._template())
	}

	async _template() {
		return this._getHTML('pages/admin/postagem.html')
	}

	setPostagem(json) {
		const postagem = new Postagem(json)
		this._postagem = postagem;
		this._inputTitulo.value = postagem.titulo
		if (postagem.midia) {
			this._radioVideo.checked = true
			this._radioVideo.dispatchEvent(new Event('change'))
			console.log(postagem.midia)
			this._iframMidia.src = postagem.midia.tipo == 'Youtube' ?
				`https://www.youtube.com/embed/${postagem.midia.codigo}` :
				`https://player.vimeo.com/video/${postagem.midia.codigo}`
			this._inputMidiaURL.value = this._iframMidia.src
			this._verificaURL(this._iframMidia.src)
		}
		else if (postagem.fotos && postagem.fotos.lenth != 0) {
			this._radioFotos.checked = true
			this._radioFotos.dispatchEvent(new Event('change'))
			postagem.fotos.forEach(foto => this._uploadFormItem.addFile({ id: foto.id, src: `api/fotos/${foto.id}/thumb` }))
		}
		if (postagem.tags && postagem.tags.length != 0) {
			this._tagsFormItem.setTags(postagem.tags)
		}
		if (this._editor)
			this._editor.setData(this._postagem.conteudo)

	}
}