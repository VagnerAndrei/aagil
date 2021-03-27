/**
 * 
 */
import { Lista } from './Lista.js'
import { get } from './../controller/navegacao-controller.js'

export class ListaPaginada extends Lista {


	constructor() {
		super()
		this._buttonPrimeiraPagina = document.querySelector("#button-pagina-primeira")
		this._buttonUltimaPagina = document.querySelector("#button-pagina-ultima")
		this._buttonProximaPagina = document.querySelector("#button-pagina-proxima")
		this._buttonPaginaAnterior = document.querySelector("#button-pagina-anterior")
		this._selectTamanhoDaPagina = document.querySelector("#select-pagina-tamanho")
		this._ulPaginas = document.querySelector("#ul-paginas")

		this._tamanhoDaPagina = this._selectTamanhoDaPagina.value
		this._paginaAtual = 1
		this._indice = 0

		this._selectTamanhoDaPagina.addEventListener('change', event => this.tamanhoDaPagina(event))
	}

	async atualizarLista(url) {
		console.log(`${url}/${this._indice}/${this._tamanhoDaPagina}`)
		const responseAtletas = await get(`${url}/${this._indice}/${this._tamanhoDaPagina}`)

		switch (responseAtletas.status) {
			case 200:
				const json = await responseAtletas.json()
				super._lista = json.pagina
				this._totalResult = json.total
				break
			case 500:
				console.log(responseAtletas)
				break
		}
	}

	atualizarHTML() {
		console.log(this._totalResult)
		const numeroDePaginas = Math.ceil(this._totalResult / this._tamanhoDaPagina)
		this._ulPaginas.innerHTML = ''
		for (let i = 1; i < numeroDePaginas + 1; i++) {
			const li = document.createElement('li')
			const a = document.createElement('a')
			a.textContent = i
			a.addEventListener('click', event => this.pagina(event.currentTarget.textContent))
			if (Math.floor(this._indice / this._tamanhoDaPagina) !== i - 1) a.href = 'javascript:void(0)'
			li.appendChild(a)
			this._ulPaginas.appendChild(li)
		}
		super.atualizarHTML()
	}

	tamanhoDaPagina() {
		this._indice = 0
		this._tamanhoDaPagina = this._selectTamanhoDaPagina.value
		this.atualizarLista()
	}

	pagina(numero) {
		this._indice = this._tamanhoDaPagina * (numero - 1)
		this.atualizarLista()
	}

	primeiraPagina() { }
	ultimaPagina() { }
	proximaPagina() { }
	paginaAnterior() { }

}