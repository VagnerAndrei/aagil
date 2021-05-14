import { View } from '../components/View.js'
import { TagsFormItem } from '../components/TagsFormItem.js'
import { FotosFormItem } from '../components/FotosFormItem.js'

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

		this._inputMidiaURL = document.getElementById('input-midia-url')

		this._divMidiaURL = document.getElementById('div-midia-url')
		this._labelErroMidiaURL = document.getElementById('label-erro-midia-url')
		this._divFotos = document.getElementById('div-fotos')

		this._tagsFormItem = new TagsFormItem('div-tags')
		this._fotosFormItem = new FotosFormItem('div-fotos')

		this._inputMidiaURL.addEventListener('change', event => this.inputMidiaURLChangeHandler(event))
		this._iframMidia = document.getElementsByTagName('iframe')[0]
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
			this._labelErroMidiaURL.textContent = 'URL Inválida'
			this.setIFrameSrc()
		}
		else
			this._labelErroMidiaURL.textContent = ''
	}

	setIFrameSrc(src) {
		this._iframMidia.src = src
		if (!src || src == '') this._iframMidia.classList.add('display-none')
		else this._iframMidia.classList.remove('display-none')
	}

	loadConfigCKEditor() {
		ClassicEditor.create(document.querySelector('#editor'), {
			language: 'pt-br',
			removePlugins: ['ImageUpload', 'EasyImage', 'MediaEmbed'],

		}).catch(error => {
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