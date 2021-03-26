/**
 * 
 */
import { List } from "../components/list/list.js"

export class Atletas extends List {

	constructor() {
		super('api/atletas')
		this.conteudoLista_
	}

	async init() {
		await super.init()
		this.template()
	}

	template() {
		const conteudoAtletas = document.getElementById("conteudo-atletas")

		let itemsHtml = ''
		this.lista.map(atleta => {
			itemsHtml += `<div class="flex-column lista-atleta">
									<h2>Atleta!</h2>
									<div class="flex-row space-beetween">
										<strong>${atleta.nome}</strong>
									</div>
							
									<div class="flex-row space-beetween">
							
										<div class="container-foto-atleta">
											<img src="api/atletas/${atleta.id}/foto/thumb" onerror="this.src='assets/img/usuario.png'">
										</div>
							
										<div class="flex-column space-beetween items-right">
										
										${atleta.localidade ?
											`<img src="assets/img/ufs/${atleta.localidade.uf}.png">
											<strong>${atleta.localidade.nome} - ${atleta.localidade.uf}</strong>`
										: ''}
										
										${atleta.categoria ? 
											`<strong>${atleta.categoria}</strong>`
										: ''}
										
										${atleta.nascimento? 
											`<strong>${this.getIdade(atleta.nascimento)}</strong>`
										: ''}
										</div>
									</div>
								</div>`

		})
		conteudoAtletas.innerHTML = itemsHtml
	}



	getIdade(nascimento) {
		const now = new Date();

		const aniversario = nascimento.split("-");
		const anos = now.getFullYear() - new Number(aniversario[0]);
		const mesAniversario = new Number(aniversario[1]);
		const diaAniversario = new Number(aniversario[2]);

		const idade = (now.getMonth() + 1 < mesAniversario || (now.getMonth() + 1 == mesAniversario && now.getDate() < diaAniversario)) ? anos - 1 : anos;

		return `${idade} anos`;
	}




}