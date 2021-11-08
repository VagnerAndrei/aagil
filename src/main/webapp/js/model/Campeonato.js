/**
 * 
 */
export class Campeonato {

	constructor({ id, titulo, descricao, pico, data, categorias= [], arbitros = [], midiasDivulgacao, fotos, regulamento }) {
		this.id = id
		this.titulo = titulo
		this.descricao = descricao
		this.setData(data)
		this.pico = pico
		this.categorias = categorias
		this.arbitros = arbitros
		this.midiasDivulgacao = midiasDivulgacao
		this.fotos = fotos
		this.regulamento = regulamento
	}
	
	setData(data){
		this.data = new Date(data).toLocaleTimeString('pt-BR', { month : 'numeric', day : 'numeric', year:'numeric', hour: 'numeric', minute : 'numeric', second : 'numeric'})
	}

}