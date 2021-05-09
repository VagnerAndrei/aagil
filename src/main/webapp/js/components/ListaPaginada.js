/**
 * 
 */
import { Lista } from './Lista.js'
import { get } from './../fetch.js'

export class ListaPaginada extends Lista {


	constructor(titulo, url, selectedIndexPagination) {
		super(titulo, url)
		this._paginaAtual = 1
		this._indice = 0
		this._selectedIndexPagination = selectedIndexPagination
	}

	init() {
		super.init()
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
		
		this._selectTamanhoDaPagina.addEventListener('change', event => this.tamanhoDaPagina(event))
		this._buttonProximaPagina.addEventListener('click', event => this.proximaPagina(event))
		this._buttonPaginaAnterior.addEventListener('click', event => this.paginaAnterior(event))
		this._buttonPrimeiraPagina.addEventListener('click', event => this.primeiraPagina(event))
		this._buttonUltimaPagina.addEventListener('click', event => this.ultimaPagina(event))

	}

	async update() {
		
		/*//TEMPLATE DO ARQUIVO HTML
		// ATUALIZA O MAIN COM O HTML DE template()
		const { status, html } = await this.template()
		super.update(html)

		// INICIA A LEITURA DOS COMPONENTES
		if (status == 200)
			this.init()*/
		
		
		//TEMPLATE DIRETO DO JAVASCRIPT
		super.update(await this.template())
		this.init()		
		// ATUALIZA A LISTA
		await this.atualizarLista()

		// ATUALIZA O TEMPLATE COM A LISTA CONSULTADA
		this.updateTemplate()
	}

	// RETORNA O TEMPLATE DA LISTA TODA
	async template() {
		/*		throw new Error('Not Yet Implemented')
		*/		//return this.getHTML(this._pagina)
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
								<label>Página:</label> <label id="label-paginas-${this._viewName}"></label>
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

	async atualizarLista() {
		//		console.log(`${this._url}/${this._indice}/${this._tamanhoDaPagina}`)
		const responseAtletas = await get(`${this._url}/${this._indice}/${this._tamanhoDaPagina}`)

		switch (responseAtletas.status) {
			case 200:
				const json = await responseAtletas.json()
				super._lista = json.pagina
				this._totalResult = json.total
				this._labelTotal.textContent = this._totalResult
				this.updateTemplate()
				break
			case 500:
				break
		}
	}

	updateTemplate() {
		// ATUALIZA O TEMPLATE COM OS ITEMS E A LISTA CONSULTADA
		super.updateTemplate()

		// ATUALIA O TEMPLATE COM OS LINKS DAS PAGINAS E ATIVACAO DOS BOTOES
		this._numeroDePaginas = Math.ceil(this._totalResult / this._tamanhoDaPagina)
		this._ulPaginas.innerHTML = ''

		for (let i = 1; i < this._numeroDePaginas + 1; i++) {

			const li = document.createElement('li')
			const a = document.createElement('a')

			a.textContent = i


			if (Math.floor(this._indice / this._tamanhoDaPagina) !== i - 1) {
				a.addEventListener('click', event => this.pagina(event.currentTarget.textContent))
				a.href = 'javascript:void(0)'
			}
			else this._paginaAtual = i

			li.appendChild(a)
			this._ulPaginas.appendChild(li)
		}

		this._buttonProximaPagina.disabled = this._numeroDePaginas === this._paginaAtual
		this._buttonPaginaAnterior.disabled = this._paginaAtual === 1
		this._buttonPrimeiraPagina.disabled = this._paginaAtual < 3
		this._buttonUltimaPagina.disabled = this._numeroDePaginas < 3 || this._indice > this._numeroDePaginas - 2
		this._labelPaginas.textContent = `${this._paginaAtual}/${this._numeroDePaginas}`

		// ADICIONA OS EVENTOS NOS ITEMS DA LISTA
		this.adicionarClickEvent()
	}

	adicionarClickEvent() {
		throw new Error('Not Yet Implemented')
	}

	tamanhoDaPagina() {
		console.log('tamanhodapag')
		this._indice = 0
		this._tamanhoDaPagina = this._selectTamanhoDaPagina.value
		this.atualizarLista()
	}

	pagina(numero) {
		console.log(numero, 'pagina')
		this._indice = this._tamanhoDaPagina * (numero - 1)
		this.atualizarLista()
		window.scroll(0,500)
	}

	primeiraPagina() {
		this.pagina(1)
	}

	ultimaPagina() {
		this.pagina(this._numeroDePaginas)
	}

	proximaPagina() {
		this.pagina(this._paginaAtual + 1)
	}

	paginaAnterior() {
		this.pagina(this._paginaAtual - 1)
	}
	
}