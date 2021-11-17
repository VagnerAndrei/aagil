/**
 * 
 */
import { InscricaoCampeonato } from './../model/InscricaoCampeonato.js'

export class CategoriaCampeonato {

	constructor({ id, nome, descricao, voltas, podium, valorInscricao, premiacoes, inscricoes, permitirInscricoes, exibirInscricoes, exibirClassificacao }) {
		this.id = id
		this.nome = nome
		this.descricao = descricao
		this.voltas = voltas
		this.podium = podium
		this.valorInscricao = valorInscricao ? new Number(valorInscricao).toFixed(2) : 0
		this.premiacoes = premiacoes
		this.inscricoes = inscricoes ? inscricoes.map(inscricao => new InscricaoCampeonato(inscricao)) : []
		this.inscricoes = this.inscricoes.sort(function(a, b) {
			if (a.atleta.nome > b.atleta.nome) {
				return 1
			}
			if (a.atleta.nome < b.atleta.nome) {
				return -1
			}
			// a must be equal to b
			return 0
		})
		this.permitirInscricoes = permitirInscricoes;
		this.exibirInscricoes = exibirInscricoes;
		this.exibirClassificacao = exibirClassificacao;

	}

	getRankAtleta() {
		//		console.log('CATEGORIA')
		let rank = []
		this.inscricoes.forEach(inscricao => rank.push({ idInscricao: inscricao.id, totalVolta1: inscricao.getTotalVolta(1), total: inscricao.getTotalGeral() }))
		rank = rank.sort(function(a, b) {
			if (new Number(a.total) < new Number(b.total)) return 1
			if (new Number(a.total) > new Number(b.total)) return -1
			if (new Number(a.totalVolta1) < new Number(b.totalVolta1)) return 1
			if (new Number(a.totalVolta1) > new Number(b.totalVolta1)) return -1
			return 0
		})


		let posicao = 1

		if (rank.length > 0)
			for (let i = 0; i < rank.length; i++) {
				if (rank[i].total == 0)
					rank[i].posicao = '-'
				else
					if (i == rank.length - 1 || rank[i].total > rank[i + 1].total)
						rank[i].posicao = posicao
					else {
						const totalEmpatadosGeral = this._getNumeroEmpatadosTotal(rank, i)
						const totalEmpatadosVolta = this._getNumeroEmpatadosTotalVolta1(rank, i, totalEmpatadosGeral)

						//					console.log('emp i:', i, 'empT: ', totalEmpatadosGeral, ' EmpV:', totalEmpatadosVolta, ' pos:', posicao)

						if (totalEmpatadosVolta > 0) {
							for (let j = 0; j < totalEmpatadosVolta; j++) {
								rank[i + j].posicao = posicao
							}
							posicao++
							i += totalEmpatadosVolta - 1
						}
						else {
							rank[i].posicao = posicao
							posicao++
						}
						continue
					}
				posicao++
			}
		//		console.log(rank)
		return rank
	}

	_getNumeroEmpatadosTotal(rank, index) {
		let total = 1
		do {
			total++
			index++
		} while (rank[index + 1] && rank[index].total == rank[index + 1].total)
		return total
	}

	_getNumeroEmpatadosTotalVolta1(rank, index, totalEmpatadosGeral) {
		let total = 0
		for (let i = 0; i < totalEmpatadosGeral - 1; i++)
			if (rank[index + i].totalVolta1 == rank[index + 1 + i].totalVolta1) {
				total += i == 0 ? 2 : 1;
			}
		return total
	}



}