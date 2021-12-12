/**
 * 
 */
import { ListaView } from './ListaView.js'

export class ListaPaginadaView extends ListaView {


	constructor({ titulo, selectedIndexPagination, onViewCreatedFn }) {
		super({ titulo, onViewCreatedFn, idLista: `ul-lista-view-${titulo.toLowerCase().trim()}` })
		this._paginaAtual = 0
		this._indice = 0
		this._selectedIndexPagination = selectedIndexPagination

		this._atualizarListaFn = {}
	}

	_init() {
		super._init()
		this._ulPaginas = document.querySelector(`#ul-paginas-${this._viewName}`)
		this._buttonProximaPagina = document.querySelector(`#button-pagina-proxima-${this._viewName}`)
		this._buttonUltimaPagina = document.querySelector(`#button-pagina-ultima-${this._viewName}`)
		this._buttonPrimeiraPagina = document.querySelector(`#button-pagina-primeira-${this._viewName}`)
		this._buttonPaginaAnterior = document.querySelector(`#button-pagina-anterior-${this._viewName}`)
		this._selectTamanhoDaPagina = document.querySelector(`#select-pagina-tamanho-${this._viewName}`)
		this._sectionHeader = document.querySelector(`#section-header-${this._viewName}`)
		this._labelTotal = document.querySelector(`#label-total-${this._viewName}`)
		this._labelPaginas = document.querySelector(`#label-paginas-${this._viewName}`)

		this._selectTamanhoDaPagina.selectedIndex = this._selectedIndexPagination
		this._tamanhoDaPagina = document.querySelector(`#select-pagina-tamanho-${this._viewName}`).value

		this._selectTamanhoDaPagina.addEventListener('change', event => this._tamanhoDaPaginaChange(event))
		this._buttonProximaPagina.addEventListener('click', event => this._proximaPagina(event))
		this._buttonPaginaAnterior.addEventListener('click', event => this._paginaAnterior(event))
		this._buttonPrimeiraPagina.addEventListener('click', event => this._primeiraPagina(event))
		this._buttonUltimaPagina.addEventListener('click', event => this._ultimaPagina(event))

	}

	async _update() {
		super._update(await this._template())
	}

	// RETORNA O TEMPLATE DA LISTA TODA
	async _template() {
		return `
				<div class="lista-paginada">
					<section id="section-header-${this._viewName}" class="lista-paginada-header">
						<h2>${this._titulo}</h2>
					</section>
					<section id="section-lista-paginada-${this._viewName}" class="flex-column">
						<div id="paginacao-${this._viewName}">
							<label>Resultados por página:</label> 
							<select	id="select-pagina-tamanho-${this._viewName}">
								<option>10</option>
								<option>20</option>
								<option>30</option>
								<option>40</option>
								<option>50</option>
								<option>60</option>
								<option>70</option>
								<option>80</option>
								<option>90</option>
								<option>100</option>
							</select> 	
							<label>Total:</label> <label id="label-total-${this._viewName}"></label>
							<div class="contador-paginas">
								<label id="label-paginas-${this._viewName}"></label>
							</div>
						</div>
				
						<ul id="ul-lista-${this._viewName}" class="lista-items">
			
						</ul>
						<div class="lista-paginada-controle">
							<ul id="ul-paginas-${this._viewName}" class="lista-paginas">
							</ul>
						</div>
						<div  class="lista-paginada-controle">
							<button id="button-pagina-primeira-${this._viewName}" title="Primeira página">&lt;&lt;</button>
							<button id="button-pagina-anterior-${this._viewName}" title="Página anterior">&lt;</button>
							<button id="button-pagina-proxima-${this._viewName}" title="Próxima página">&gt;</button>
							<button id="button-pagina-ultima-${this._viewName}" title="Última página">&gt;&gt;</button>
						</div>
					</section>
				</div>
				`
	}

	configureAtualizarLista(command) {
		this._atualizarListaFn = command
		this._atualizarListaFn(this._indice, this._tamanhoDaPagina)
	}

	updateListTemplate({ lista, totalResults }) {
		// ATUALIZA O TEMPLATE COM OS ITEMS E A LISTA CONSULTADA
		this._totalResult = totalResults
		this._labelTotal.textContent = this._totalResult
		super.updateListTemplate(lista)

		// ATUALIA O TEMPLATE COM OS LINKS DAS PAGINAS E ATIVACAO DOS BOTOES
		this._numeroDePaginas = Math.ceil(this._totalResult / this._tamanhoDaPagina)
		this._ulPaginas.innerHTML = ''

		for (let i = 1; i < this._numeroDePaginas + 1; i++) {

			const li = document.createElement('li')
			const a = document.createElement('a')

			a.textContent = i


			if (Math.floor(this._indice / this._tamanhoDaPagina) !== i - 1) {
				a.addEventListener('click', event => this._pagina(event.currentTarget.textContent))
				a.href = 'javascript:void(0)'
			}
			else this._paginaAtual = i

			li.appendChild(a)
			this._ulPaginas.appendChild(li)
		}

		this._buttonProximaPagina.disabled = this._numeroDePaginas == 0 || this._numeroDePaginas === this._paginaAtual
		this._buttonPaginaAnterior.disabled = this._numeroDePaginas == 0 || this._paginaAtual === 1
		this._buttonPrimeiraPagina.disabled = this._paginaAtual < 2
		this._buttonUltimaPagina.disabled = this._numeroDePaginas < 2 || this._indice > (this._numeroDePaginas - 2)

		this._labelPaginas.textContent = this._numeroDePaginas > 0 ? `Página: ${this._paginaAtual}/${this._numeroDePaginas}` : ''

	}

	_tamanhoDaPaginaChange() {
		this._indice = 0
		this._tamanhoDaPagina = this._selectTamanhoDaPagina.value
		this._atualizarListaFn(this._indice, this._tamanhoDaPagina)
	}

	_pagina(numero) {
		this._indice = this._tamanhoDaPagina * (numero - 1)
		this._atualizarListaFn(this._indice, this._tamanhoDaPagina)
		window.scroll(0, 500)
	}

	_primeiraPagina() {
		this._pagina(1)
	}

	_ultimaPagina() {
		this._pagina(this._numeroDePaginas)
	}

	_proximaPagina() {
		this._pagina(this._paginaAtual + 1)
	}

	_paginaAnterior() {
		this._pagina(this._paginaAtual - 1)
	}

}