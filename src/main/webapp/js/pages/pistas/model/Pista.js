/**
 * 
 */
import { Endereco } from './../../../model/Endereco.js'

export class Pista {
	
	constructor({ id, titulo, endereco, tags, fotos }) {
		this.id = id;
		this.titulo = titulo
		this.endereco = new Endereco(endereco)
		this.tags = tags
		this.fotos = fotos
	}
}