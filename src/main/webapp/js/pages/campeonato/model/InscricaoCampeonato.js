/**
 * 
 */
import { NotaCampeonato } from './../model/NotaCampeonato.js'
import { Atleta } from '../../atleta/model/Atleta.js'

export class InscricaoCampeonato {

	constructor({ id, atleta, notas, statusPagamento, data }) {
		this.id = id
		this.atleta = new Atleta(atleta)
		this.notas = notas ? notas.map(nota => new NotaCampeonato(nota)) : []
		this.statusPagamento = statusPagamento
		this.data = data ? this._getDataFromString(data).toLocaleTimeString('pt-BR', { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }) : data
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

	//pattern = "dd/MM/yyyy HH:mm:ss"
	_getDataFromString(data) {
		const day = data.slice(0, 2)
		const month = data.slice(3, 5)
		const year = data.slice(6, 10)
		const hour = data.slice(11, 13)
		const minute = data.slice(14, 16)
		return new Date(`${year}/${month}/${day} ${hour}:${minute}`)
	}

}