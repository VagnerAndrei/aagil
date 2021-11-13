/**
 * 
 */
import { View2 } from './../components/View2.js'
import { Campeonato } from './../model/Campeonato.js'
import { Endereco } from './../model/Endereco.js'
import { CategoriaCampeonato } from './../model/CategoriaCampeonato.js'
import { NotaCampeonato } from './../model/NotaCampeonato.js'
import { isAdmin, isUser, ROLES } from './../sessao.js'
import { registrar, perfil } from './../navegacao.js'

export class CampeonatoView extends View2 {


	constructor({ onViewCreatedFn}) {
		super({ titulo: 'Campeonato' , onViewCreatedFn })
		this._campeonato = {}
	}

	async _update() {
		super._update(await this._template())
	}

	async _template() {
		return this._getHTML('pages/public/campeonato.html')
	}

	_init() {
		this._labelTitulo = document.querySelector('#label-titulo')
		this._pDescricao = document.querySelector('#p-descricao')
		this._aRegulamento = document.querySelector('#a-regulamento')
		this._buttonRegulamento = document.querySelector('#button-regulamento')
		this._strongPistaNome = document.querySelector('#strong-pista-nome')
		this._imgPista = document.querySelector('#img-pista')
		this._divInformacoesPista = document.querySelector('#div-informacoes-pista')
		this._imgUfPista = document.querySelector('#img-uf-pista')
		this._labelDataHoraCampeonato = document.querySelector('#label-data-hora-campeonato')
		this._divCategoriasCampeonato = document.querySelector('#categorias-campeonato')
		//		this._= document.querySelector('#')
		//		this._= document.querySelector('#')
		//		this._= document.querySelector('#')

		this._inscreverSeFn = {}
		this._inscreverAtletaFn = {}
		this._setPermitirInscricoesFn = {}
		this._setExibirInscricoesFn = {}
		this._setExibirClassificacaoFn = {}

		this._updateNotasFn = {}
		this._lancarNotaFn = {}

		this._updateCampeonatoFn = {}
	}

	_setRoledElements() {
		this._campeonato.categorias.forEach(categoria => {
			this._addRoledElement({ id: `button-inscrever-atleta-${categoria.id}`, className: 'button-campeonato-inscrever button-campeonato-inscrever-atleta', role: ROLES.ADMIN })
			this._addRoledElement({ id: `div-controle-inscricao-${categoria.id}`, className: 'controle-categoria-campeonato', role: ROLES.ADMIN })
			this._addRoledElement({ id: `div-controle-classificacao-${categoria.id}`, className: 'controle-categoria-campeonato', role: ROLES.ADMIN })
		})
	}

	/*
										TEMPLATES
																						*/

	_templateCategoria(categoria = new CategoriaCampeonato()) {
		return `
			<div class="head-categoria-campeonato">
				<h1 class="titulo-categoria-campeonato">${categoria.nome}:</h1>
				
				${categoria.permitirInscricoes ? `
				<button class="button-campeonato-inscrever" id="button-inscrever-se-${categoria.id}">Inscrever-se</button>
				` : ''}
				
				<button class="button-campeonato-inscrever button-campeonato-inscrever-atleta" id="button-inscrever-atleta-${categoria.id}">Inscrever Atleta</button>
			</div>
			
			<div class="controle-categoria-campeonato" id="div-controle-inscricao-${categoria.id}">
				<div class="div-checkbox-label">
					<input type="checkbox" id="checkbox-permitir-inscricoes-${categoria.id}" name="checkbox-permitir-inscricoes-${categoria.id}" 
						class="checkbox-permitir-exibicao-campeonato" ${categoria.permitirInscricoes ? 'checked' : ''}>
					<label for="checkbox-permitir-inscricoes-${categoria.id}" class="label-permitir-incricoes-campeonato">Permitir inscricoes publicamente</label>
				</div>
				<div class="div-checkbox-label">
					<input type="checkbox" id="checkbox-exibir-inscricoes-${categoria.id}" name="checkbox-exibir-inscricoes-${categoria.id}"
					${categoria.exibirInscricoes ? 'checked' : ''}>
					<label for="checkbox-exibir-inscricoes-${categoria.id}">Exibir inscricoes publicamente</label>
				</div>
			</div>
			
			${(categoria.exibirInscricoes || isAdmin()) ? `
			<table id="table-campeonato-incritos-${categoria.id}" class="tabela-campeonato-inscricao">
				<thead>
					<tr>
						<th>Atleta</th>
						<th>Idade</th>
						<th>Apelido</th>
						${isAdmin() ? `
						<th>Telefone</th>
						<th>Pagamento</th>
						<th>Data</th>
						<th>Remover</th>						
						` : ''}
					</tr>
				</thead>
				<tbody id="tbody-inscricoes-${categoria.id}">
					${this._templateInscricao(categoria)}
				</tbody>
			</table>
			<br/>
			` : ''}
			
			
			<div class="controle-categoria-campeonato" id="div-controle-classificacao-${categoria.id}">
				<div class="div-checkbox-label">
					<input type="checkbox" id="checkbox-exibir-classificacao-${categoria.id}" name="checkbox-exibir-classificacao-${categoria.id}"
					${categoria.exibirClassificacao ? 'checked' : ''}>
					<label for="checkbox-exibir-classificacao-${categoria.id}">Exibir classificação publicamente</label>
				</div>
			</div>
			
			${(categoria.exibirClassificacao || isAdmin()) ? `
			<table id="table-campeonato-classificacao-${categoria.id}" class="tabela-campeonato-classificacao">
				<thead>
					<tr>
						<th rowspan="2">Atleta</th>
						${this._templateTHVoltasClassificacao(categoria.voltas)}
						<th rowspan="2">Total Geral</th>
						<th rowspan="2">Rank</th>
					</tr>
					<tr>
						${this._templateTHArbitrosClassificacao(categoria.voltas)}
					</tr>
				</thead>
				<tbody>
					${this._templateInscricaoClassificacao(categoria)}
				</tbody>
			</table>
			` : ''}
			
		`
	}

	_templateInscricao(categoria) {
		if (categoria.inscricoes)
			return categoria.inscricoes.map(inscricao => `
			<tr>
				<td><a class="link-atleta" 
				id="a-link-atleta-${inscricao.id}-${inscricao.atleta.id}"
				title="Acessar perfil">${inscricao.atleta.nome}</a></td>
				<td>${inscricao.atleta.nascimento ? inscricao.atleta.getIdade() : ''}</td>
				<td>${inscricao.atleta.apelido ?? ''}</td>
				${isAdmin() ? `
				<td>${inscricao.atleta.telefone ?? ''}</td>
				<td><a href="">${inscricao.statusPagamento}</a></td>
				<td>${inscricao.data ?? ''}</td>
				<td><img id="img-remover-inscricao-${inscricao.id}" class="icon-remover icon-remover-arbitro" title="Remover"></td>
				` : ''}
			</tr>
		`).join('')
		return ''

	}

	_templateTHVoltasClassificacao(voltasLength) {
		let html = ''
		for (let i = 1; i <= voltasLength; i++)
			html += `<th colspan="${this._campeonato.arbitros.length + 1}">${i}ª Volta</th>`
		return html
	}

	_templateTHArbitrosClassificacao(voltasLength) {
		let html = ''
		for (let i = 1; i <= voltasLength; i++) {
			for (let j = 0; j < this._campeonato.arbitros.length; j++)
				html += `<td>${this._campeonato.arbitros[j].nome}</td>`
			html += '<td>Total</td>'
		}
		return html
	}

	_templateInscricaoClassificacao(categoria) {
		if (categoria.inscricoes)
			return categoria.inscricoes.map(inscricao => `
			<tr>
				<td>${inscricao.atleta.nome}</td>
				${this._templateTBVoltasClassificacao(inscricao, categoria)}
			</tr>
		`).join('')
		return ''
	}

	_templateTBVoltasClassificacao(inscricao, categoria) {
		let html = ''
		for (let i = 1; i <= categoria.voltas; i++) {
			for (let j = 0; j < this._campeonato.arbitros.length; j++)
				html += `<td><input id="input-inscricao-${inscricao.id}-volta-${i}-arbitro-${this._campeonato.arbitros[j].id}" type="number" max="10" min="0" step="0.1" ${isAdmin() ? '' : 'disabled'}></td>`
			html += `<td id="td-total-volta-${i}-inscricao-${inscricao.id}">${inscricao.getTotalVolta(i)}</td>`
		}
		html += `<td id="td-total-geral-${inscricao.id}">${inscricao.getTotalGeral()}</td>
				 <td id="td-inscricao-rank-${inscricao.id}"></td>`
		return html
	}



	/*
										PUBLIC METHODS
																			*/

	configureInscreverSeFunction(command) {
		this._inscreverSeFn = command
	}

	configureInscreverAtletaFunction(command) {
		this._inscreverAtletaFn = command
	}

	configureSetExibirInscricoes(command) {
		this._setExibirInscricoesFn = command
	}

	configureSetPermitirInscricoes(command) {
		this._setPermitirInscricoesFn = command
	}

	configureSetExibirClassificacao(command) {
		this._setExibirClassificacaoFn = command
	}

	configureLancarNota(command) {
		this._lancarNotaFn = command
	}

	configureUpdateNotas(command) {
		this._updateNotasFn = command
	}

	configureUpdateCampeonato(command) {
		this._updateCampeonatoFn = command
	}

	setCampeonato(campeonato) {
		this._campeonato = new Campeonato(campeonato)
		this._setRoledElements()
		this._setupCampeonato()
	}

	updateCampeonato(campeonato) {
		this._campeonato = new Campeonato(campeonato?? this._campeonato)
		this._clearDivCategorias()
		this._setupCampeonato()
	}

	updateNotasCampeonato(campeonato) {
		this._campeonato = new Campeonato(campeonato)
		this._setNotasInput()
	}

	setNota(idCategoria, idInscricao, notaJson) {
		const nota = new NotaCampeonato(notaJson)

		const input = document.querySelector(`#input-inscricao-${idInscricao}-volta-${nota.volta}-arbitro-${nota.arbitro.id}`)
		input.classList.remove('input-nota-change')
		input.classList.add('input-nota-commited')

		const indexCategoria = this._findIndexCategoria(idCategoria)
		const indexInscricao = this._findIndexInscricao(indexCategoria, idInscricao)
		const indexNota = this._findIndexNota(indexCategoria, indexInscricao, nota.volta, nota.arbitro.id)
		if (!indexNota || indexNota == -1)
			this._campeonato.categorias[indexCategoria].inscricoes[indexInscricao].notas.push(nota)
		else
			this._campeonato.categorias[indexCategoria].inscricoes[indexInscricao].notas[indexNota] = nota;

		document.querySelector(`#td-total-volta-${nota.volta}-inscricao-${idInscricao}`).innerHTML = this._campeonato.categorias[indexCategoria].inscricoes[indexInscricao].getTotalVolta(nota.volta)
		document.querySelector(`#td-total-geral-${idInscricao}`).innerHTML = this._campeonato.categorias[indexCategoria].inscricoes[indexInscricao].getTotalGeral()

		this._setRank(idCategoria)
	}

	/*
											PRIVATE METHODS
																				*/
	_setupCampeonato() {
		this._labelTitulo.innerText = this._campeonato.titulo
		this._pDescricao.innerText = this._campeonato.descricao

		this._aRegulamento.href = `api/campeonatos/${this._campeonato.id}/regulamento`
		this._campeonato.regulamento ? this._buttonRegulamento.classList.remove('display-none') : this._buttonRegulamento.classList.add('display-none')

		this._strongPistaNome.innerText = this._campeonato.pico.titulo
		if (this._campeonato.pico.fotos?.length) {
			this._imgPista.src = `api/fotos/${this._campeonato.pico.fotos[0].id}/thumb`
		}
		if (this._campeonato.pico.endereco) {
			const endereco = new Endereco(this._campeonato.pico.endereco)
			this._divInformacoesPista.innerText = `
				${endereco.logradouro}
				${endereco.bairro}
				${endereco.localidade}-${endereco.uf}
				${endereco.cep}
				${endereco.referencia}
				Perimêtro: ${endereco.perimetro}
			`
			this._imgUfPista.src = `assets/img/ufs/${endereco.uf}.png`
		}


		this._labelDataHoraCampeonato.innerText = this._campeonato.getDataToLocaleTimeString()
		this._campeonato.categorias.forEach(categoria => {
			const divCategoria = document.createElement('div')
			divCategoria.id = `div-categoria-${categoria.id}`
			divCategoria.classList.add('categoria-campeonato')
			divCategoria.innerHTML = this._templateCategoria(categoria)
			this._divCategoriasCampeonato.appendChild(divCategoria)
		})

		this._configureInscricaoButtons()
		this._configureLinksAtleta()

		if (isAdmin()) {
			this._configurePermissoesChecks()
			this._configureInputsNota()
		}
		this._setNotasInput()
		this._applyRole(isAdmin())
		this._setRank()
	}

	_clearDivCategorias() {
		this._divCategoriasCampeonato.innerHTML = ''
	}

	_setRank(categoriaId) {
		if (categoriaId)
			this._setupRank(this._campeonato.categorias.find(categoria => categoria.id == categoriaId))
		else
			this._campeonato.categorias.forEach(categoria => {
				this._setupRank(categoria)
			})

	}

	_setupRank(categoria) {
		const rank = this._getRank(categoria)
		rank.forEach(ranked => {
			const input = document.querySelector(`#td-inscricao-rank-${ranked.idInscricao}`)
			if (input) input.innerHTML = ranked.posicao
		})
	}

	_getRank(categoria) {
		const rank = categoria.getRankAtleta()
		return rank
	}

	_configureInscricaoButtons() {
		this._campeonato.categorias.forEach(categoria => {
			document.querySelector(`#button-inscrever-se-${categoria.id}`)?.addEventListener('click', () => {
				if (!isUser()) {
					alert('Você precisa estar logado para se inscrever em um campeonato')
					registrar('registroCampEvent')
				}
				else
					if (confirm(`Você está preste a inscrever-se no campeonato: \n${this._campeonato.titulo} categoria ${categoria.nome}. ${categoria.valorInscricao ? `\nValor da Inscrição: R$ ${new Number(categoria.valorInscricao).toFixed(2).toString().replace('.', ',')}` : ''}\nClique em OK para confirmar.`))
						this._inscreverSeFn(categoria.id)
			})
			document.querySelector(`#button-inscrever-atleta-${categoria.id}`).addEventListener('click', () => {

			})
		})
	}

	_configurePermissoesChecks() {
		this._campeonato.categorias.forEach(categoria => {
			document.querySelector(`#checkbox-permitir-inscricoes-${categoria.id}`).addEventListener('change', (event) => {
				this._setPermitirInscricoesFn(categoria.id, event.currentTarget.checked)
			})
			document.querySelector(`#checkbox-exibir-inscricoes-${categoria.id}`).addEventListener('change', (event) => {
				this._setExibirInscricoesFn(categoria.id, event.currentTarget.checked)
			})
			document.querySelector(`#checkbox-exibir-classificacao-${categoria.id}`).addEventListener('change', (event) => {
				this._setExibirClassificacaoFn(categoria.id, event.currentTarget.checked)
			})
		})
	}

	_configureLinksAtleta() {
		this._campeonato.categorias.forEach(categoria => {
			categoria.inscricoes?.forEach(inscricao => {
				document.querySelector(`#a-link-atleta-${inscricao.id}-${inscricao.atleta.id}`)?.addEventListener('click', () => {
					perfil('atletaClickEvent', inscricao.atleta.id)
				})
			})
		})
	}

	_configureInputsNota() {
		this._campeonato.categorias.forEach(categoria => {
			categoria.inscricoes?.forEach(inscricao => {
				for (let i = 1; i <= categoria.voltas; i++)
					for (let j = 0; j < this._campeonato.arbitros.length; j++) {

						const input = document.querySelector(`#input-inscricao-${inscricao.id}-volta-${i}-arbitro-${this._campeonato.arbitros[j].id}`)

						input.addEventListener('blur', (event) => {
							this._lancarNotaEventListener({ event, inscricaoId: inscricao.id, volta: i, arbitroId: this._campeonato.arbitros[j].id, categoriaId: categoria.id })
						})
						input.addEventListener('keyup', (event) => {
							if (event.key == 'Enter')
								this._lancarNotaEventListener({ event, inscricaoId: inscricao.id, volta: i, arbitroId: this._campeonato.arbitros[j].id, categoriaId: categoria.id })
						})

						this._oldValue = {}
						input.addEventListener('focusin', (event) => {
							this._oldValue = event.target.value
						})

						input.addEventListener('change', (event) => {
							console.log(event.target.value)
							if (!event.target.value || event.target.value < 0 || event.target.value > 10)
								input.value = this._oldValue
							else {
								input.classList.add('input-nota-change')
								input.classList.remove('input-nota-commited')
							}

						})
					}
			})
		})
	}

	_setNotasInput() {
		this._campeonato.categorias.forEach(categoria => {
			categoria.inscricoes?.forEach(inscricao => {
				inscricao.notas?.forEach(nota => {
					const input = document.querySelector(`#input-inscricao-${inscricao.id}-volta-${nota.volta}-arbitro-${nota.arbitro.id}`)
					if (input) {
						input.value = nota.nota
						if (isAdmin())
							input.classList.add('input-nota-commited')
					}
				})
			})
		})
	}

	_lancarNotaEventListener({ event, inscricaoId, volta, arbitroId, categoriaId }) {
		const input = event.currentTarget
		if (input.classList.contains('input-nota-change')) {
			this._lancarNota({ inscricaoId, nota: input.value, arbitroId, volta, categoriaId })
		}
	}

	_lancarNota({ inscricaoId, nota, arbitroId, volta, categoriaId }) {

		const indexCategoria = this._findIndexCategoria(categoriaId)
		const indexInscricao = this._findIndexInscricao(indexCategoria, inscricaoId)
		const indexNota = this._findIndexNota(indexCategoria, indexInscricao, volta, arbitroId)

		const notaCampeonato = new NotaCampeonato({
			nota: nota ?? 0,
			arbitro: { id: arbitroId },
			volta: volta,
			id: indexNota != -1 ? this._campeonato.categorias[indexCategoria].inscricoes[indexInscricao].notas[indexNota].id : undefined
		})

		this._lancarNotaFn(categoriaId, inscricaoId, notaCampeonato)
	}

	_findIndexCategoria(idCategoria) {
		return this._campeonato.categorias.findIndex(categoria => categoria.id == idCategoria)
	}

	_findIndexInscricao(indexCategoria, idInscricao) {
		return this._campeonato.categorias[indexCategoria].inscricoes.findIndex(inscricao => inscricao.id == idInscricao)
	}

	_findIndexNota(indexCategoria, indexInscricao, volta, arbitroId) {
		return this._campeonato.categorias[indexCategoria].inscricoes[indexInscricao].notas.findIndex(n => (n.volta == volta && n.arbitro.id == arbitroId))
	}

	_updateNotas() {
		this._updateNotasFn()
	}


	applyRole() {
		this.updateCampeonato()
	}
}