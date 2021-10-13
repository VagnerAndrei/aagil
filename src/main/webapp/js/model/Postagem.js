/**
 * 
 */
export class Postagem {
	constructor({ id, titulo, conteudo, midia, fotos, tags, data, atleta }) {
		this.id = id
		this.titulo = titulo
		this.conteudo = conteudo
		this.midia = midia
		this.fotos = fotos
		this.tags = tags
		this.data = new Date(data).toLocaleTimeString('pt-BR', { weekday: 'long' , month : 'numeric', day : 'numeric', year:'numeric', hour: 'numeric', minute : 'numeric'})
		this.atleta = atleta
	}
}