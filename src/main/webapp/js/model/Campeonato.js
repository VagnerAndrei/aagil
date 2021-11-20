/**
 * 
 */
import { CategoriaCampeonato } from './../model/CategoriaCampeonato.js'
export class Campeonato {

	constructor({ id, titulo, descricao, pico, data, categorias, arbitros, midiasDivulgacao, fotos, regulamento }) {
		this.id = id
		this.titulo = titulo
		this.descricao = descricao
		this.data = data
		this.pico = pico
		this.categorias = categorias ? categorias.map(categoria => new CategoriaCampeonato(categoria)) : []
		this.arbitros = arbitros || []
		this.midiasDivulgacao = midiasDivulgacao || []
		this.fotos = fotos || []
		this.regulamento = regulamento
	}

	setData(data) {
		this.data = new Date(data).toLocaleTimeString('pt-BR', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
	}

	getDataToLocaleTimeString() {
		const formattedDate = new Date(this.getDataAsString())
		return formattedDate.toLocaleTimeString('pt-BR', { weekday: 'long', month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })
	}

	getDataAsString() {
		const day = this.data.slice(0, 2)
		const month = this.data.slice(3, 5)
		const year = this.data.slice(6, 10)
		const hour = this.data.slice(11, 13)
		const minute = this.data.slice(14, 16)
		return (`${year}/${month}/${day} ${hour}:${minute}`)
	}


}