/**
 * 
 */
import { Usuario } from './../model/Usuario.js'

export class Atleta {

	constructor({ id, nome, apelido, usuario, nascimento, biografia }) {
		this.id = id
		this.nome = nome
		this.apelido = apelido
		this.nascimento = nascimento
		this.biografia = biografia
		this.usuario = usuario ? new Usuario(usuario) : usuario
	}

	getIdade() {
		const now = new Date();
		const aniversario = this.nascimento.split("-");
		const anos = now.getFullYear() - new Number(aniversario[0]);
		const mesAniversario = new Number(aniversario[1]);
		const diaAniversario = new Number(aniversario[2]);

		const idade = (now.getMonth() + 1 < mesAniversario || (now.getMonth() + 1 == mesAniversario && now.getDate() < diaAniversario)) ? anos - 1 : anos;

		return `${idade} anos`;
	}

}