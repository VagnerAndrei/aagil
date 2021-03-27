/**
 * 
 */
import { ListaPaginada } from './../components/ListaPaginada.js'

export class Atletas extends ListaPaginada {

	constructor() {
		super()
	}

	async atualizarLista() {
		await super.atualizarLista('api/atletas')
		this.atualizarHTML()
	}

	template() {
		let itemsHtml = ''
		this.lista?.map(atleta => {
			itemsHtml += `<div class="flex-column lista-atleta">
								<div class="flex-row space-beetween">
									<strong>${atleta.nome}</strong>
								</div>
								<div class="flex-row space-beetween">
									<div class="container-foto-atleta">
										<img src="api/atletas/${atleta.id}/foto/thumb" onerror="this.src='assets/img/usuario.png'">
									</div>
									<div class="flex-column space-beetween items-right">
									${atleta.localidade ? `<img src="assets/img/ufs/${atleta.localidade.uf}.png">
									<strong>${atleta.localidade.nome} - ${atleta.localidade.uf}</strong>` : ''}
									${atleta.categoria ? `<strong>${atleta.categoria}</strong>` : ''}
									${atleta.nascimento ? `<strong>${this.getIdade(atleta.nascimento)}</strong>` : ''}
									</div>
								</div>
							</div>`
		})
		return itemsHtml
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