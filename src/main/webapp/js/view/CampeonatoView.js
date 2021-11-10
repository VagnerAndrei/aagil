/**
 * 
 */
import { View2 } from './../components/View2.js'
import { Campeonato } from './../model/Campeonato.js'
import { Endereco } from './../model/Endereco.js'
import { CategoriaCampeonato } from './../model/CategoriaCampeonato.js'
import { isAdmin, isUser, ROLES } from './../sessao.js'
import { registrar } from './../navegacao.js'

export class CampeonatoView extends View2 {


	constructor({ onViewCreatedFn }) {
		super({ titulo: 'Campeonato', onViewCreatedFn })
		this._campeonato = {}
	}

	async update() {
		super.update(await this.template())
	}

	async template() {
		return this.getHTML('pages/public/campeonato.html')
	}

	init() {
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
						<th>Telefone</th>
						<th>Pagamento</th>
						<th>Remover</th>
					</tr>
				</thead>
				<tbody id="tbody-inscricoes-${categoria.id}">
					${this._templateInscricao(categoria)}
				</tbody>
			</table>
			<br/>
			` : '' }
			
			
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
				<td><a href="">${inscricao.atleta.nome}</a></td>
				<td>${inscricao.atleta.nascimento ? inscricao.atleta.getIdade() : ''}</td>
				<td>${inscricao.atleta.apelido ?? ''}</td>
				<td>${inscricao.atleta.telefone ?? ''}</td>
				<td><a href="">${inscricao.statusPagamento}</a></td>
				<td><img id="img-remover-inscricao-${inscricao.id}" class="icon-remover icon-remover-arbitro" title="Remover"></td>
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
				${this._templateTBVoltasClassificacao(inscricao, categoria.voltas)}
			</tr>
		`).join('')
		return ''
	}

	_templateTBVoltasClassificacao(inscricao, voltasLength) {
		let html = ''
		for (let i = 1; i <= voltasLength; i++) {
			for (let j = 0; j < this._campeonato.arbitros.length; j++)
				html += `<td><input id="input-inscricao-${inscricao.id}-volta-${i}-arbitro-${this._campeonato.arbitros[j].id}" type="number" max="10" min="0" step="0.1"></td>`
			html += `<td>${inscricao.getTotalVolta()}</td>`
		}
		html += `<td>${inscricao.getTotalGeral()}</td>
				 <td>2º</td>`
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

	setCampeonato(campeonato = new Campeonato()) {
		this._campeonato = campeonato
		this._setRoledElements()
		console.log(this._campeonato)
		this._setupCampeonato()
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


		this._labelDataHoraCampeonato.innerText = this._campeonato.getData()
		this._campeonato.categorias.forEach(categoria => {
			const divCategoria = document.createElement('div')
			divCategoria.id = `div-categoria-${categoria.id}`
			divCategoria.classList.add('categoria-campeonato')
			divCategoria.innerHTML = this._templateCategoria(categoria)
			this._divCategoriasCampeonato.appendChild(divCategoria)
		})

		this._configureInscricaoButtons()
		this._configurePermissoesChecks()
		this.applyRole()
	}

	_configureInscricaoButtons() {
		this._campeonato.categorias.forEach(categoria => {
			document.querySelector(`#button-inscrever-se-${categoria.id}`)?.addEventListener('click', () => {
				if (!isUser()){
					alert('Você precisa estar logado para se inscrever em um campeonato')
					registrar('registroCampEvent')					
				}
				else
					if (confirm(`Você está preste a inscrever-se no campeonato: \n${this._campeonato.titulo} categoria ${categoria.nome}. ${categoria.valorInscricao ? `\nValor da Inscrição: R$ ${new Number(categoria.valorInscricao).toFixed(2).toString().replace('.',',')}` : ''}\nClique em OK para confirmar.`))
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



	applyRole() {
		this._applyRole(isAdmin())
	}
}