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

		this.configurePodiumChange()
		this._configureAdicionarCategoria()
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
			<li id="${index}">
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
			</li>
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

	configurePodiumChange() {
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
			const erros = []
			if (this._inputCategoria.value == '') erros.push('Nome da categoria obrigatório')
			if (this._textareaDescricaoCategoria.value == '') erros.push('Descrição da categoria obrigatório')
			if (this._inputVoltasCategoria.value == '') erros.push('Número de voltas da categoria obrigatório')
			if (this._inputPodiumCategoria.value == '') erros.push('Podium da categoria obrigatório')
			const premiacoes = this._divPremiacoes.getElementsByTagName('textarea')
			for (let i = 0; i < premiacoes.length; i++)
				if (premiacoes[i].value == '') erros.push(`Premiação ${i + 1}º lugar obrigatório `)

			if (erros.length == 0) {
				this._labelErroCategoria.textContent = ''

				const categoria = new CategoriaCampeonato({
					nome: this._inputCategoria.value,
					descricao: this._textareaDescricaoCategoria.value,
					voltas: this._inputVoltasCategoria.value,
					podium: this._inputPodiumCategoria.value,
					valorInscricao: this._inputValorInscricao.value,
					premiacoes: this.getPremiacoesCategoria()
				})
				this._ulCategorias.innerHTML += this._templateLiCategoria({ model: categoria, index: Math.floor(Math.random() * 100000) })
				this._inputCategoria.value = ''
				this._textareaDescricaoCategoria.value = ''
				this._inputVoltasCategoria.value = 1
				this._inputPodiumCategoria.value = 3 
				this._inputValorInscricao.value = ''
				
				const premiacoes = this._divPremiacoes.getElementsByTagName('textarea')
				for (let i = 0; i < premiacoes.length; i++)
					premiacoes[i].value = ''
					
			} else {
				this._labelErroCategoria.textContent = `${erros.map(erro => erro).join('\n')}`
			}
		})
	}

}