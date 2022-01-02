/**
 * 
 */
export class TagsFormItem {

	constructor(elementID) {

		this._elementID = elementID;
		this._tags = []
		this._init()
	}

	_init() {
		this._update()

		this._inputTag = document.getElementById('input-tag')
		this._ulTags = document.getElementById('ul-tags')
		this._labelErroTag = document.getElementById('label-erro-tag')

		this._inputTag.addEventListener('keypress', (e) => {
			if (e.keyCode == 13) {
				e.preventDefault()
				this._handleInputTags()
			}
		})

		document.getElementById('button-adicionar-tag').addEventListener('click', (e) => {
			e.preventDefault()
			this._handleInputTags()
		})

	}

	_handleInputTags() {
		console.log('handler')
		const value = this._inputTag.value.toLowerCase()
		const regex = new RegExp('^[a-z0-9]+$')
		if (regex.test(value)) {
			this._labelErroTag.textContent = ''
			if (!this._tags.some(tag => tag == value)) {
				this._tags.push(value)
				this._createTagElement(value)

			} else this._labelErroTag.textContent = 'Tag já inserida'
			this._inputTag.value = ''
		} else
			this._labelErroTag.textContent = 'Tag inválida'
		this._inputTag.focus()
	}

	_createTagElement(value) {
		const tag = document.createElement('li')
		tag.title = 'Remover esta tag'
		tag.addEventListener('click', e => {
			this._tags.splice(this._tags.indexOf(e.target.textContent), 1)
			this._ulTags.removeChild(e.currentTarget)
			this._inputTag.focus()
		})
		tag.textContent = value;
		this._ulTags.appendChild(tag)
	}

	_template() {
		return `
			<div class="form-item">
				<label>Tags:</label><label>&nbsp;#</label>
				<input type="text" id="input-tag">
				<button id="button-adicionar-tag" type="button" class="botao-adicionar-tag" title="Adicionar">+</button>
				<label class="mensagem-erro" id="label-erro-tag"></label>
			</div>
			<ul id="ul-tags"></ul>
		`
	}

	getTagsList() {
		return this._tags;
	}

	_update() {
		document.getElementById(this._elementID).innerHTML = this._template();
	}

	setTags(tags) {
		this._tags = tags
		this._ulTags.innerHTML = ''
		this._tags.forEach(tag => this._createTagElement(tag))
	}
}