/**
 * 
 */
export class Campeonato {

	constructor({ id, titulo, descricao, pico, data, categorias= [], arbitros = [], midiasDivulgacao = [], fotos  = [], regulamento }) {
		this.id = id
		this.titulo = titulo
		this.descricao = descricao
		this.pico = pico
		this.data = data
		this.categorias = categorias
		this.arbitros = arbitros
		this.midiasDivulgacao = midiasDivulgacao
		this.fotos = fotos
		this.regulamento = regulamento
	}

}