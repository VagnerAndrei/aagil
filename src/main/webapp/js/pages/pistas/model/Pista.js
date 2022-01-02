/**
 * 
 */
import { Endereco } from './../../../model/Endereco.js'

export class Pista {
	
	constructor({ id, titulo, endereco, tags, fotos }) {
		this.id = id;
		this.titulo = titulo
		this.endereco = endereco ? new Endereco(endereco) : endereco
		this.tags = tags
		this.fotos = fotos
	}
}