/**
 * 
 */
import { InscricaoCampeonato } from './../model/InscricaoCampeonato.js'

export class CategoriaCampeonato {

	constructor({ id, nome, descricao, voltas, podium, valorInscricao, premiacoes, inscricoes}) {
		this.id = id
		this.nome = nome
		this.descricao = descricao
		this.voltas = voltas
		this.podium = podium
		this.valorInscricao = valorInscricao
		this.premiacoes = premiacoes
		this.inscricoes = inscricoes?.map(inscricao => new InscricaoCampeonato(inscricao))
	}

}