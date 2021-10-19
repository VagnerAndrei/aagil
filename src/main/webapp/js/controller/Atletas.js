/**
 * 
 */
import { ListaPaginada } from '../components/ListaPaginada.js'
import { perfil } from '../navegacao.js'
import { getIdade } from '../util.js'

export class Atletas extends ListaPaginada {

	constructor() {
		super('Atletas', 'api/atletas', 4)
	}
	
	init(){
		super.init()
		this._ulLista.classList.add('lista-atletas')
	}

	/*async template() {
		return this.getHTML('pages/public/atletas.html')
	}*/

	adicionarClickEvent() {
		this._lista?.map(atleta => {
			document.querySelector(`#li-atleta-${atleta.id}`).addEventListener('click', () => {
				perfil('atletaClickEvent', atleta.id)
			})
		})
	}

	listTemplate() {
		let itemsHtml = ''
		this.lista?.map(atleta => {
			itemsHtml += `	
						<li id="li-atleta-${atleta.id}">
							<strong>${atleta.nome}</strong> 
									${atleta.apelido ? `<label>(${atleta.apelido})</label>` : ''}
							<div class="flex-row space-beetween">
								<div class="container-foto-atleta">
									<img src="api/atletas/${atleta.id}/foto/thumb?t=${new Date().getTime()}" onerror="this.src='assets/img/usuario.png'">
								</div>
								<div class="flex-column space-beetween items-right">
									${atleta.localidade ? `<img src="assets/img/ufs/${atleta.localidade.uf}.png">
									<small>${atleta.localidade.nome} - ${atleta.localidade.uf}</small>` : ''}
									${atleta.categoria ? `<small>${atleta.categoria}</small>` : ''}
									${atleta.nascimento ? `<small>${getIdade(atleta.nascimento)}</small>` : ''}
								</div>
							</div>
						</li>
						`
		})
		return itemsHtml
	}






}