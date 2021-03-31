/**
 * 
 */
import { Lista } from './Lista.js'
import { get } from './../controller/fetch.js'

export class ListaPaginada extends Lista {


	constructor(url) {
		super(url)
		this._ulPaginas = document.querySelector('#ul-paginas')
		this._paginaAtual = 1
		this._indice = 0

		this._buttonProximaPagina = document.querySelector('#button-pagina-proxima')
		this._buttonUltimaPagina = document.querySelector('#button-pagina-ultima')
		this._buttonPrimeiraPagina = document.querySelector('#button-pagina-primeira')
		this._buttonPaginaAnterior = document.querySelector('#button-pagina-anterior')
		this._selectTamanhoDaPagina = document.querySelector('#select-pagina-tamanho')
		this._labelTotal = document.querySelector('#label-total')

		this._tamanhoDaPagina = this._selectTamanhoDaPagina.value

		document.querySelector('#select-pagina-tamanho').addEventListener('change', event => this.tamanhoDaPagina(event))
		document.querySelector('#button-pagina-proxima').addEventListener('click', event => this.proximaPagina(event))
		document.querySelector('#button-pagina-anterior').addEventListener('click', event => this.paginaAnterior(event))
		document.querySelector('#button-pagina-primeira').addEventListener('click', event => this.primeiraPagina(event))
		document.querySelector('#button-pagina-ultima').addEventListener('click', event => this.ultimaPagina(event))
	}

	async atualizarLista() {
		console.log(`${this._url}/${this._indice}/${this._tamanhoDaPagina}`)
		const responseAtletas = await get(`${this._url}/${this._indice}/${this._tamanhoDaPagina}`)

		switch (responseAtletas.status) {
			case 200:
				const json = await responseAtletas.json()
				super._lista = json.pagina
				this._totalResult = json.total
				this._labelTotal.textContent = this._totalResult
				break
			case 500:
				console.log(responseAtletas)
				break
		}
	}

	atualizarHTML() {
		this._numeroDePaginas = Math.ceil(this._totalResult / this._tamanhoDaPagina)
		this._ulPaginas.innerHTML = ''

		for (let i = 1; i < this._numeroDePaginas + 1; i++) {

			const li = document.createElement('li')
			const a = document.createElement('a')

			a.textContent = i
			a.addEventListener('click', event => this.pagina(event.currentTarget.textContent))

			if (Math.floor(this._indice / this._tamanhoDaPagina) !== i - 1) a.href = 'javascript:void(0)'
			else this._paginaAtual = i

			li.appendChild(a)
			this._ulPaginas.appendChild(li)
		}

		this._buttonProximaPagina.disabled = this._numeroDePaginas === this._paginaAtual
		this._buttonPaginaAnterior.disabled = this._paginaAtual === 1
		this._buttonPrimeiraPagina.disabled = this._paginaAtual < 3
		this._buttonUltimaPagina.disabled = this._numeroDePaginas < 3 || this._indice > this._numeroDePaginas - 2

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
		document.body.scrollTop = 0
		document.documentElement.scrollTop = 0
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