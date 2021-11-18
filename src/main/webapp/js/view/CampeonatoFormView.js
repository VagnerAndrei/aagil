/**
 * 
 */
import { View2 } from './../components/View2.js'
import { UploadFormItem } from './../components/UploadFormItem.js'
import { CategoriaCampeonato } from './../model/CategoriaCampeonato.js'
import { PremiacaoCampeonato } from './../model/PremiacaoCampeonato.js'
import { Campeonato } from './../model/Campeonato.js'
import { Atleta } from './../model/Atleta.js'

export class CampeonatoFormView extends View2 {

	constructor({ onViewCreatedFn, isEdicaoMode }) {
		super({ titulo: `${isEdicaoMode ? 'Editar' : 'Criar'} Campeonato`, onViewCreatedFn })
		this._isEdicaoMode = isEdicaoMode
	}

	async _update() {
		super._update(await this._template())
	}

	async _template() {
		return this._getHTML('pages/admin/campeonato-registro.html')
	}

	_init() {
		this._h2TituloForm = document.querySelector('#h2-titulo-form')
		this._form = document.querySelector('#form-campeonato')
		this._inputTitulo = document.querySelector('#input-titulo')
		this._textareaDescricao = document.querySelector('#textarea-descricao')
		this._inputLocal = document.querySelector('#input-local')
		this._selectPista = document.querySelector('#select-pista')
		this._buttonAtualizarPistas = document.querySelector('#button-atualizar-pistas')
		this._inputData = document.querySelector('#input-data')
		this._inputHora = document.querySelector('#input-hora')
		this._inputMinuto = document.querySelector('#input-minuto')
		this._inputCategoria = document.querySelector('#input-categoria')
		this._textareaDescricaoCategoria = document.querySelector('#textarea-descricao-categoria')
		this._inputVoltasCategoria = document.querySelector('#input-voltas-categoria')
		this._inputPodiumCategoria = document.querySelector('#input-podium-categoria')
		this._divPremiacoes = document.querySelector('#div-premiacoes')
		this._inputValorInscricao = document.querySelector('#input-valor-inscricao')
		this._labelErroCategoria = document.querySelector('#label-erro-categoria')
		this._buttonAdicionarCategoria = document.querySelector('#button-adicionar-categoria')
		this._buttonSalvarCategoria = document.querySelector('#button-salvar-categoria')
		this._buttonCancelarCategoria = document.querySelector('#button-cancelar-categoria')
		this._ulCategorias = document.querySelector('#ul-categorias')
		this._buttonAtualizarArbitros = document.querySelector('#button-atualizar-arbitros')
		this._buttonAdicionarArbitro = document.querySelector('#button-adicionar-arbitro')
		this._selectArbitro = document.querySelector('#select-arbitro')
		this._ulArbitros = document.querySelector('#ul-arbitros')
		this._ulFotos = document.querySelector('#ul-midias-divulgacao')
		this._ulFotos = document.querySelector('#ul-fotos')
		this._buttonSelecionarMidiasDivulgacao = document.querySelector('#button-selecionar-midias-divulgacao')
		this._buttonSelecionarFotos = document.querySelector('#button-selecionar-fotos')
		this._buttonSelecionarAnexoRegulamento = document.querySelector('#button-selecionar-anexo-regulamento')
		this._labelAnexoRegulamento = document.querySelector('#label-anexo-regulamento')
		this._labelErroFormulario = document.querySelector('#label-erro-formulario')
		this._buttonEnviarFormulario = document.querySelector('#button-enviar-formulario')

		this._h2TituloForm.innerHTML = this._titulo

		this._configurePodiumChange()
		this._configureAdicionarCategoria()
		this._configureSalvarCategoria()
		this._configureCancelarCategoria()

		this._idCategoriaEmEdicao = undefined

		this._configureAdicionarArbitro()


		/*								FILE UPLOADS										*/

		this._uploadMidiasDivulgacao = new UploadFormItem({
			elementID: 'div-midias-divulgacao',
			label: 'Imagens',
			name: 'midias-divulgacao'
		})
		this._uploadFotosCampeonato = new UploadFormItem({
			elementID: 'div-fotos-campeonato',
			label: 'Fotos',
			name: 'fotos-campeonato'
		})
		this._uploadRegulamento = new UploadFormItem({
			elementID: 'div-regulamento',
			label: 'Arquivo',
			name: 'Regulamento',
			acceptTypes: 'application/pdf',
			maxFiles: 1,
			isTypeImage: false
		})

		/*							===================										*/

		this._campeonato = new Campeonato({})
	}

	/*
										TEMPLATES
																						*/

	_templatePremiacao({ podium, premio }) {
		return `
			<div class="form-item">
				<label>Premiação ${podium}º:</label>
				<textarea id="textarea-premiacao-${podium}" maxlength="300">${premio}</textarea>
			</div>
		`
	}

	_templateLiCategoria(model = new CategoriaCampeonato()) {
		return `
			<p class="icon-label titulo-categoria-label"><img class="icon-categoria">${model.nome}</p>
			<img class="icon-editar icon-editar-categoria" title="Editar" id="icon-editar-categoria-${model.id ?? model.idElement}">
			<img class="icon-remover icon-remover-categoria" title="Remover" id="icon-remover-categoria-${model.id ?? model.idElement}">
			<br/>
			<p class="icon-label"><img class="icon-descricao">${model.descricao}</p>
			<br/>
			<p class="icon-label"><img class="icon-double-arrow">Voltas: ${model.voltas}</p>
			<br/>
			
			${model.premiacoes?.map(premiacao =>
			`<p class="icon-label"><img class="icon-podium">${premiacao.colocacao}º: ${premiacao.premiacao}</p>`).join('')}
			<br/>
			
			${model.valorInscricao ? `<p class="icon-label"><img class="icon-money">Inscrição: R$ ${model.valorInscricao.replace('.', ',')}</p>` : ''}
			<br/>
		`
	}

	_templateLiArbitro(model = new Atleta()) {
		return `
			<span>${model.nome}</span> 
			<img id="img-remover-arbitro-${model.id}" class="icon-remover icon-remover-arbitro" title="Remover">
		`
	}


	/*
										PUBLIC METHODS
																						*/

	setupListaPistas(pistas) {
		this._selectPista.innerHTML = ''
		const option = document.createElement('option')
		option.label = 'Selecione...'
		this._selectPista.appendChild(option)
		pistas.forEach(pista => {
			const option = document.createElement('option')
			option.value = pista.id
			option.label = pista.titulo
			this._selectPista.appendChild(option)
		})
	}

	setupListaArbitros(arbitros) {
		this._selectArbitro.innerHTML = ''
		const option = document.createElement('option')
		option.label = 'Selecione...'
		this._selectArbitro.appendChild(option)
		arbitros.forEach(arbitro => {
			const option = document.createElement('option')
			option.value = arbitro.id
			option.label = arbitro.nome
			this._selectArbitro.appendChild(option)
		})
	}

	setCampeonato(campeonato) {
		this._campeonato = new Campeonato(campeonato)
		this._setupCampeonato()
	}

	_setupCampeonato() {
		const campeonato = this._campeonato
		this._inputTitulo.value = campeonato.titulo
		this._textareaDescricao.value = campeonato.descricao
		this._selectPista.value = campeonato.pico.id
		const data = campeonato.getDataAsString()

		this._inputData.value = data.slice(0, 10).replaceAll('/', '-')
		this._inputHora.value = data.slice(11, 13)
		this._inputMinuto.value = data.slice(14, 16)

		campeonato.categorias.forEach(categoria => this._setupCategoria(categoria))
		campeonato.arbitros.forEach(arbitro => this._setupArbitro({ id: arbitro.id, nome: arbitro.nome }))

		this._setupRegulamento()
		this._setupMidiasDivulgacao()
		this._setupFotosCampeonato()

	}

	async configureRefreshListaPista(command) {
		this._buttonAtualizarPistas.addEventListener('click', () => { command() })
		await command()
	}

	async configureRefreshListaArbitro(command) {
		this._buttonAtualizarArbitros.addEventListener('click', () => { command() })
		await command()
	}

	configureEnviarFormulario(command) {
		this._buttonEnviarFormulario.addEventListener('click', (event) => {
			this._enviarFormulario(event, command)
		})
	}

	_enviarFormulario(event, command) {
		event.preventDefault()
		const erros = this._validateFormulário()
		if (this._form.checkValidity() && erros.length == 0) {
			this._labelErroFormulario.textContent = ''

			this._campeonato.titulo = this._inputTitulo.value
			this._campeonato.descricao = this._textareaDescricao.value

			let data = new Date(this._inputData.value.replace('-', '/'))
			data.setHours(this._inputHora.value)
			data.setMinutes(this._inputMinuto.value)
			this._campeonato.setData(data)

			this._campeonato.pico = { id: this._selectPista.value }
			this._campeonato.midiasDivulgacao = this._uploadMidiasDivulgacao.getListIdsSrcFiles().map(id => ({ id }))
			this._campeonato.fotos = this._uploadFotosCampeonato.getListIdsSrcFiles().map(id => ({ id }))

			command()
		}
		else {
			this._form.reportValidity()
			this._labelErroFormulario.textContent = `${erros.map(erro => erro).join('\n')}`
		}
	}

	getCampeonatoModel() {
		const camp = new Campeonato(this._campeonato)
		camp.categorias.forEach(categoria => categoria.idElement = undefined)
		return camp
	}

	getMidiasDivulgacaoFileList() {
		return this._uploadMidiasDivulgacao.getListFiles()
	}

	getFotosCampeonatoFileList() {
		return this._uploadFotosCampeonato.getListFiles()
	}

	getRegulamentoFile() {
		return this._uploadRegulamento.getListFiles()
	}

	isRegulamentoNotModified() {
		return this._uploadRegulamento.getListIdsSrcFiles().length == 1
	}

	setErroLabel(value) {
		this._labelErroFormulario.innerHTML = value
	}


	/*
										CATEGORIA
																						*/

	_configurePodiumChange() {
		this._inputPodiumCategoria.addEventListener('change', (event) => {
			const podium = event.target.value

			const premiacoesOld = this._divPremiacoes.getElementsByTagName('textarea')
			const labelPremiacoesOld = []

			for (let i = 0; i < premiacoesOld.length; i++)
				labelPremiacoesOld[i] = premiacoesOld[i].value


			this._divPremiacoes.innerHTML = ''
			for (let i = 1; i <= podium; i++)
				this._divPremiacoes.innerHTML += this._templatePremiacao({ podium: i, premio: labelPremiacoesOld[i - 1] ? labelPremiacoesOld[i - 1] : '' })

		})
	}

	_configureAdicionarCategoria() {
		this._buttonAdicionarCategoria.addEventListener('click', () => {
			this._saveCategoria()
		})
	}

	_configureSalvarCategoria() {
		this._buttonSalvarCategoria.addEventListener('click', () => {
			this._saveCategoria()
		})
	}

	_configureCancelarCategoria() {
		this._buttonCancelarCategoria.addEventListener('click', () => {
			this._setupEditarCategoria(false)
			this._setCategoriaForm()
		})
	}

	_configureRemoverCategoria(id) {
		document.querySelector(`#icon-remover-categoria-${id}`).addEventListener('click', () => {
			const index = this._campeonato.categorias.findIndex(item => item.id == id)
			let remove = true

			if (index != -1 && this._campeonato.categorias[index].inscricoes.length != 0)
				remove = confirm("Está categoria já possui atletas inscritos, OK para remover mesmo assim.")

			if (remove) {
				this._ulCategorias.removeChild(document.querySelector(`#li-categoria-${id}`))
				this._campeonato.categorias.splice(this._getIndexCategoriaByIdElement(id), 1)
				this._setupEditarCategoria(false)
				this._setCategoriaForm()
			}
		})
	}

	_configureEditarCategoria(categoria) {
		const id = categoria.id ?? categoria.idElement
		document.querySelector(`#icon-editar-categoria-${id}`).addEventListener('click', () => {
			this._setupEditarCategoria(true)
			const categoria = this._campeonato.categorias[this._getIndexCategoriaByIdElement(id)]
			this._idCategoriaEmEdicao = id
			this._setCategoriaForm(categoria)
			this._inputCategoria.focus({ preventScroll: false })
		})
	}

	_getPremiacoesCategoria() {
		const premiacoes = this._divPremiacoes.getElementsByTagName('textarea')
		const premiacoesCampeonato = []
		for (let i = 0; i < premiacoes.length; i++)
			premiacoesCampeonato.push(new PremiacaoCampeonato({ colocacao: i + 1, premiacao: premiacoes[i].value }))
		return premiacoesCampeonato
	}

	_saveCategoria() {
		const erros = this._validateCategoria()
		if (erros.length == 0) {
			this._labelErroCategoria.textContent = ''

			let categoria

			if (this._idCategoriaEmEdicao)
				categoria = this._campeonato.categorias[this._getIndexCategoriaByIdElement(this._idCategoriaEmEdicao)]
			else {
				categoria = new CategoriaCampeonato({})
				categoria.idElement = self.crypto.randomUUID()
			}
			categoria.nome = this._inputCategoria.value
			categoria.descricao = this._textareaDescricaoCategoria.value
			categoria.voltas = this._inputVoltasCategoria.value
			categoria.podium = this._inputPodiumCategoria.value
			categoria.valorInscricao = this._inputValorInscricao.value ? new Number(this._inputValorInscricao.value).toFixed(2) : null
			categoria.premiacoes = this._getPremiacoesCategoria()


			this._setupCategoria(categoria)

			this._setCategoriaForm()

		} else {
			this._labelErroCategoria.textContent = `${erros.map(erro => erro).join('\n')}`
		}
	}

	_setupCategoria(categoria) {
		const id = categoria.id ?? categoria.idElement

		if (!categoria.id)
			categoria.idElementHTML = id

		const li = this._idCategoriaEmEdicao ?
			document.querySelector(`#li-categoria-${id}`) :
			document.createElement('li')

		li.innerHTML = this._templateLiCategoria(categoria)

		if (!this._edicaoCategoria) {
			li.id = `li-categoria-${id}`
			if (!categoria.id)
				this._campeonato.categorias.push(categoria)
			this._ulCategorias.appendChild(li)
		} else
			this._setupEditarCategoria(false)


		this._configureRemoverCategoria(id)
		this._configureEditarCategoria(categoria)
	}

	_setCategoriaForm(model) {
		this._inputCategoria.value = model ? model.nome : ''
		this._textareaDescricaoCategoria.value = model ? model.descricao : ''
		this._inputVoltasCategoria.value = model ? model.voltas : 1
		this._inputPodiumCategoria.value = model ? model.podium : 3
		this._inputValorInscricao.value = model ? model.valorInscricao : ''

		this._idCategoriaEmEdicao = model ? model.id ?? model.idElement : undefined

		this._inputPodiumCategoria.dispatchEvent(new Event('change'))

		const premiacoes = this._divPremiacoes.getElementsByTagName('textarea')
		for (let i = 0; i < premiacoes.length; i++)
			premiacoes[i].value = model ? model.premiacoes[i].premiacao : ''
	}

	_validateCategoria() {
		const erros = []

		if (this._inputCategoria.value == '') erros.push('Nome da categoria obrigatório')
		if (this._textareaDescricaoCategoria.value == '') erros.push('Descrição da categoria obrigatório')
		if (this._inputVoltasCategoria.value == '') erros.push('Número de voltas da categoria obrigatório')
		if (this._inputPodiumCategoria.value == '') erros.push('Podium da categoria obrigatório')

		const premiacoes = this._divPremiacoes.getElementsByTagName('textarea')
		for (let i = 0; i < premiacoes.length; i++)
			if (premiacoes[i].value == '') erros.push(`Premiação ${i + 1}º lugar obrigatório `)

		return erros
	}

	_getIndexCategoriaByIdElement(id) {
		return isNaN(id) ?
			this._campeonato.categorias.findIndex(item => item.idElement == id) :
			this._campeonato.categorias.findIndex(item => item.id == id)

	}


	_setupEditarCategoria(boolean) {
		this._edicaoCategoria = boolean
		if (boolean) {
			this._buttonAdicionarCategoria.classList.add('display-none')
			this._buttonCancelarCategoria.classList.remove('display-none')
			this._buttonSalvarCategoria.classList.remove('display-none')
		} else {
			this._buttonAdicionarCategoria.classList.remove('display-none')
			this._buttonCancelarCategoria.classList.add('display-none')
			this._buttonSalvarCategoria.classList.add('display-none')
		}
	}

	/*
										ÁRBITRO
																						*/


	_configureAdicionarArbitro() {
		this._buttonAdicionarArbitro.addEventListener('click', () => {
			this._addArbitro()
		})
	}

	_addArbitro() {
		const id = this._selectArbitro.value
		const nome = this._selectArbitro[this._selectArbitro.selectedIndex].label
		if (id && !this._campeonato.arbitros.find(arbitro => arbitro.id == id)) {
			this._setupArbitro({ id, nome })
			this._campeonato.arbitros.push(new Atleta({ id }))
		}
	}

	_setupArbitro({ id, nome }) {
		const arbitro = new Atleta({ id, nome })
		const li = document.createElement('li')
		li.innerHTML = this._templateLiArbitro(arbitro)
		li.id = `li-arbitro-${id}`
		this._ulArbitros.appendChild(li)
		this._configureRemoverArbitro(id)
	}

	_configureRemoverArbitro(id) {
		document.querySelector(`#img-remover-arbitro-${id}`).addEventListener('click', () => {
			this._ulArbitros.removeChild(document.querySelector(`#li-arbitro-${id}`))
			this._campeonato.arbitros.splice(this._campeonato.arbitros.findIndex(arbitro => arbitro.id == id), 1)
		})
	}

	/*
										UPLOADS
																						*/

	_setupRegulamento() {
		if (this._campeonato.regulamento)
			this._uploadRegulamento.addFile({ id: this._campeonato.id, src: `api/campeonatos/${this._campeonato.id}/regulamento` })
	}

	_setupMidiasDivulgacao() {
		this._campeonato.midiasDivulgacao?.forEach(midia => this._uploadMidiasDivulgacao.addFile({ id: midia.id, src: `api/fotos/${midia.id}/thumb` }))
	}

	_setupFotosCampeonato() {
		this._campeonato.fotos?.forEach(foto => this._uploadFotosCampeonato.addFile({ id: foto.id, src: `api/fotos/${foto.id}/thumb` }))
	}

	/*
										FORMULÁRIO
																						*/

	_validateFormulário() {
		const erros = []
		if (this._campeonato.categorias.length == 0)
			erros.push('Categoria é obrigatório')
		if (this._campeonato.arbitros.length == 0)
			erros.push('Arbitragem é obrigatório')
		return erros
	}
}