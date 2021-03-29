/**
 * 
 */
import { ListaPaginada } from './../components/ListaPaginada.js'
import { perfilClick } from './../controller/navegacao-controller.js'
import { getIdade } from './../util.js'

export class Atletas extends ListaPaginada {

	constructor() {
		super('api/atletas')
	}

	async atualizarLista() {
		// REALIZA CONSULTA DA LISTA
		await super.atualizarLista()
		
		// ATUALIZA O COMPONENTE NO HTML
		this.atualizarHTML()
		
		// ADICIONA LINK NO ITEM DA LISTA
		this._lista?.map(atleta => {
			document.querySelector(`#atleta-${atleta.id}`).addEventListener('click', () => {
				perfilClick(atleta.id)
			})
		})
	}
	
	template() {
		let itemsHtml = ''
		this.lista?.map(atleta => {
			itemsHtml += `<div class="flex-column lista-atleta cursor-pointer"  id="atleta-${atleta.id}">
								<div class="flex-row space-beetween">
									<strong>${atleta.nome}</strong>
								</div>
								<div class="flex-row space-beetween">
									<div class="container-foto-atleta">
										<img src="api/atletas/${atleta.id}/foto/thumb?t=${new Date().getTime()}" onerror="this.src='assets/img/usuario.png'">
									</div>
									<div class="flex-column space-beetween items-right">
									${atleta.localidade ? `<img src="assets/img/ufs/${atleta.localidade.uf}.png">
									<strong>${atleta.localidade.nome} - ${atleta.localidade.uf}</strong>` : ''}
									${atleta.categoria ? `<strong>${atleta.categoria}</strong>` : ''}
									${atleta.nascimento ? `<strong>${getIdade(atleta.nascimento)}</strong>` : ''}
									</div>
								</div>
							</div>`
		})
		return itemsHtml
	}






}