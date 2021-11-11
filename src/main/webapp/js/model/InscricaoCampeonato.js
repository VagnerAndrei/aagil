/**
 * 
 */
import { NotaCampeonato } from './../model/NotaCampeonato.js'
import { Atleta } from './../model/Atleta.js'

export class InscricaoCampeonato {

	constructor({ id, atleta, notas, statusPagamento, data }) {
		this.id = id
		this.atleta = new Atleta(atleta)
		this.notas = notas ? notas.map(nota => new NotaCampeonato(nota)) : []
		this.statusPagamento = statusPagamento
		this.data = data ? new Date(data).toLocaleTimeString('pt-BR', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }) : data
	}

	getTotalVolta(volta) {
		let total = 0
		this.notas?.forEach(nota => total += (nota.volta == volta) ? nota.nota : 0)	
		return new Number(total).toFixed(1)
	}

	getTotalGeral() {
		let total = 0
		this.notas?.forEach(nota => total += nota.nota)
		return new Number(total).toFixed(1)
	}

}