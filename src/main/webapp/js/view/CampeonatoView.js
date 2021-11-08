/**
 * 
 */
import { View2 } from './../components/View2.js'
import { Campeonato } from './../model/Campeonato.js'
import { CategoriaCampeonato } from './../model/CategoriaCampeonato.js'

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
		this._buttonRegulamento = document.querySelector('#button-regulamento')
		this._imgPista = document.querySelector('#img-pista')
		this._divInformacoesPista = document.querySelector('#div-informacoes-pista')
		this._imgUfPista = document.querySelector('#img-uf-pista')
		this._labelDataHoraCampeonato = document.querySelector('#label-data-hora-campeonato')
		this._divCategoriasCampeonato = document.querySelector('#categorias-campeonato')
		//		this._= document.querySelector('#')
		//		this._= document.querySelector('#')
		//		this._= document.querySelector('#')
	}

	/*
										TEMPLATES
																						*/

	_templateCategoria(categoria = new CategoriaCampeonato()) {
		return `
			<div class="head-categoria-campeonato">
				<h1 class="titulo-categoria-campeonato">${categoria.nome}:</h1>
				<button class="button-campeonato-inscrever" id="button-inscrever-se-${categoria.id}">Inscrever-se</button>
				<button class="button-campeonato-inscrever button-campeonato-inscrever-atleta" id="button-inscrever-atleta-${categoria.id}">Inscrever Atleta</button>
			</div>
			
			<div class="controle-categoria-campeonato">
				<div class="div-checkbox-label">
					<input type="checkbox" id="checkbox-permitir-inscricoes-${categoria.id}" name="checkbox-permitir-inscricoes-${categoria.id}" 
						class="checkbox-permitir-exibicao-campeonato">
					<label for="checkbox-permitir-inscricoes-${categoria.id}" class="label-permitir-incricoes-campeonato">Permitir inscricoes publicamente</label>
				</div>
				<div class="div-checkbox-label">
					<input type="checkbox" id="checkbox-exibir-inscricoes-${categoria.id}" name="checkbox-exibir-inscricoes-${categoria.id}">
					<label for="checkbox-exibir-inscricoes-${categoria.id}">Exibir inscricoes publicamente</label>
				</div>
			</div>
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
			<div class="controle-categoria-campeonato-${categoria.id}">
				<div class="div-checkbox-label">
					<input type="checkbox" id="checkbox-exibir-classificacao-${categoria.id}" name="checkbox-exibir-classificacao-${categoria.id}">
					<label for="checkbox-exibir-classificacao-${categoria.id}">Exibir classificação publicamente</label>
				</div>
			</div>
			
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
		`
	}

	_templateInscricao(categoria) {
		if (categoria.inscricoes)
			return categoria.inscricoes.map(inscricao => `
			<tr>
				<td><a href="">${inscricao.atleta.nome}</a></td>
				<td>${inscricao.atleta.idade}</td>
				<td>${inscricao.atleta.apelido}</td>
				<td>${inscricao.atleta.telefone}</td>
				<td><a href="">${inscricao.statusPagamento}</a></td>
				<td><img id="img-remover-inscricao-${inscricao.id}" class="icon-remover icon-remover-arbitro" title="Remover"></td>
			</tr>
		`)
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
		`)
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

	setCampeonato(campeonato = new Campeonato()) {
		this._campeonato = campeonato
		console.log(campeonato)
		this._campeonato.categorias.forEach(categoria => {
			const divCategoria = document.createElement('div')
			divCategoria.id = `div-categoria-${categoria.id}`
			divCategoria.classList.add('categoria-campeonato')
			divCategoria.innerHTML = this._templateCategoria(categoria)
			this._divCategoriasCampeonato.appendChild(divCategoria)
		})
	}
}