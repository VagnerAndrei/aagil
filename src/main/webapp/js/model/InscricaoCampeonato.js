/**
 * 
 */
import { NotaCampeonato } from './../model/NotaCampeonato.js'
import { Atleta } from './../model/Atleta.js'

export class InscricaoCampeonato {

	constructor({ id, atleta, notas, statusPagamento }) {
		this.id = id
		this.atleta = new Atleta(atleta)
		this.notas = notas?.map(nota => new NotaCampeonato(nota))
		this.statusPagamento = statusPagamento
	}

	getTotalVolta(volta) {
		let total = 0
		this.notas?.forEach(nota => total += nota.volta == volta ? nota.nota : 0)
		return total
	}
	
	getTotalGeral() {
		let total = 0
		this.notas?.forEach(nota => total += nota.nota)
		return total
	}

}