/**
 * 
 */
import { View2 } from './../components/View2.js'
import { CategoriaCampeonato } from './../model/CategoriaCampeonato.js'
import { PremiacaoCampeonato } from './../model/PremiacaoCampeonato.js'

export class CampeonatoFormView extends View2 {

	constructor({ onViewCreatedFn }) {
		super({ titulo: 'Criar campeonato', onViewCreatedFn })
	}

	async update() {
		super.update(await this.template())
	}

	async template() {
		return this.getHTML('pages/admin/campeonato-registro.html')
	}

	init() {
		this._inputTitulo = document.querySelector('#input-titulo')
		this._textareaDescricao = document.querySelector('#textarea-descricao')
		this._inputLocal = document.querySelector('#input-local')
		this._datalistPistas = document.querySelector('#datalist-pistas')
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
		this._ulArbitros = document.querySelector('#ul-arbitros')
		this._ulFotos = document.querySelector('#ul-midias-divulgacao')
		this._ulFotos = document.querySelector('#ul-fotos')
		this._buttonSelecionarMidiasDivulgacao = document.querySelector('#button-selecionar-midias-divulgacao')
		this._buttonSelecionarFotos = document.querySelector('#button-selecionar-fotos')
		this._buttonSelecionarAnexoRegulamento = document.querySelector('#button-selecionar-anexo-regulamento')
		this._labelAnexoRegulamento = document.querySelector('#label-anexo-regulamento')
		this._labelErroFormulario = document.querySelector('#label-erro-formulario')
		this._buttonEnviarFormulario = document.querySelector('#button-enviar-formulario')

		this._configurePodiumChange()
		this._configureAdicionarCategoria()
		this._configureSalvarCategoria()
		this._configureCancelarCategoria()
		
		this._listCategoriasTemp = []
		this._edicaoCategoria = false
		this._idIndexElementCategoriaEmEdicao = undefined
	}

	_templatePremiacao({ podium, premio }) {
		return `
			<div class="form-item">
				<label>Premiação ${podium}º:</label>
				<textarea id="textarea-premiacao-${podium}" maxlength="300">${premio}</textarea>
			</div>
		`
	}

	_templateLiCategoria({ model = new CategoriaCampeonato(), index }) {
		return `
			<p class="icon-label titulo-categoria-label"><img class="icon-categoria">${model.nome}</p>
			<img class="icon-editar icon-editar-categoria" title="Editar" id="icon-editar-categoria-${index}">
			<img class="icon-remover icon-remover-categoria" title="Remover" id="icon-remover-categoria-${index}">
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

	_templateLiArbitro(atletaModel = new Atleta()) {
		return `
			<li>
				Árbitro 01 
				<img class="icon-remover icon-remover-arbitro" title="Remover">
			</li>
		`
	}

	_templateLiImagem() {
		return `
			<li>
				<img title="Clique para remover" class="imgFileObject" width="150" src="https://scontent.fbel7-1.fna.fbcdn.net/v/t39.30808-6/245157547_5149568728391126_2072399307286031093_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=973b4a&_nc_ohc=7ucmfikQJm0AX86ecT2&_nc_ht=scontent.fbel7-1.fna&oh=822d464593fdfa31342a98bcb343a835&oe=6174C52D">
			</li>
		`
	}

	setupListaPremiacoes() {
		this._inputPodiumCategoria.value
	}

	setupListaPistas(pistas) {
		this._datalistPistas.innerHTML = ''
		pistas.forEach(pista => {
			const option = document.createElement('option')
			option.value = pista.titulo
			option.itemid = pista.id
			this._datalistPistas.appendChild(option)
		})
	}

	configureRefreshListaPista(command) {
		this._buttonAtualizarPistas.addEventListener('click', () => { command() })
		command()
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

	getPremiacoesCategoria() {
		const premiacoes = this._divPremiacoes.getElementsByTagName('textarea')
		const premiacoesCampeonato = []
		for (let i = 0; i < premiacoes.length; i++)
			premiacoesCampeonato.push(new PremiacaoCampeonato({ colocacao: i + 1, premiacao: premiacoes[i].value }))
		return premiacoesCampeonato
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

	_saveCategoria() {
		if (this._validateCategoria().length == 0) {
			this._labelErroCategoria.textContent = ''

			const index = this._edicaoCategoria ?
				this._idIndexElementCategoriaEmEdicao :
				Math.floor(Math.random() * 100000)

			const categoria = new CategoriaCampeonato({
				nome: this._inputCategoria.value,
				descricao: this._textareaDescricaoCategoria.value,
				voltas: this._inputVoltasCategoria.value,
				podium: this._inputPodiumCategoria.value,
				valorInscricao: this._inputValorInscricao.value ? new Number(this._inputValorInscricao.value).toFixed(2) : null,
				premiacoes: this.getPremiacoesCategoria()
			})


			const li = this._edicaoCategoria ?
				document.querySelector(`#li-categoria-${index}`) :
				document.createElement('li')

			li.id = `li-categoria-${index}`
			li.innerHTML = this._templateLiCategoria({ model: categoria, index })


			if (!this._edicaoCategoria) {
				this._listCategoriasTemp.push({ index, categoria })
				this._ulCategorias.appendChild(li)
			} else {
				this._listCategoriasTemp[this._getIndexCategoriaByIdElement(index)] = { index, categoria }
				this._setupEditarCategoria(false)
			}


			this._configureRemoverCategoria(index)
			this._configureEditarCategoria(index)

			this._setCategoriaForm()

		} else {
			this._labelErroCategoria.textContent = `${erros.map(erro => erro).join('\n')}`
		}
	}

	_setCategoriaForm(model) {
		this._inputCategoria.value = model ? model.nome : ''
		this._textareaDescricaoCategoria.value = model ? model.descricao : ''
		this._inputVoltasCategoria.value = model ? model.voltas : 1
		this._inputPodiumCategoria.value = model ? model.podium : 3
		this._inputValorInscricao.value = model ? model.valorInscricao : ''

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

	_configureRemoverCategoria(index) {
		document.querySelector(`#icon-remover-categoria-${index}`).addEventListener('click', () => {
			this._ulCategorias.removeChild(document.querySelector(`#li-categoria-${index}`))
			this._listCategoriasTemp.splice(this._getIndexCategoriaByIdElement(index), 1)

		})
	}

	_getIndexCategoriaByIdElement(index) {
		return this._listCategoriasTemp.findIndex(item => item.index == index)
	}

	_configureEditarCategoria(idIndexElement) {
		document.querySelector(`#icon-editar-categoria-${idIndexElement}`).addEventListener('click', () => {
			this._setupEditarCategoria(true)
			const { categoria, index } = this._listCategoriasTemp[this._getIndexCategoriaByIdElement(idIndexElement)]
			this._idIndexElementCategoriaEmEdicao = index
			this._setCategoriaForm(categoria)
		})
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

}