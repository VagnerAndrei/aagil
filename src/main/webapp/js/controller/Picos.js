/**
 * 
 */
import { ListaPaginada } from '../components/ListaPaginada.js'
import { picoRegistro } from '../navegacao.js'

export class Picos extends ListaPaginada {

	constructor() {
		super('Picos', 'api/picos', 2)
	}

	init() {
		super.init()
		console.log('init0-')
		const buttonRegister = document.createElement('button')
		buttonRegister.id = 'button-registrar-pico'
		buttonRegister.textContent = 'Inserir Registro'
		buttonRegister.addEventListener('click', event => picoRegistro(event))
		document.querySelector('#section-header').appendChild(buttonRegister)
	}
	
	adicionarClickEvent(){
		
	}
	
	listTemplate(){
		let itemsHtml = ''
		this.lista?.map(pico => {
			itemsHtml += `	
						<li class="flex-column lista-atleta cursor-pointer" id="li-pico-${pico.id}">
							<strong>${pico.titulo}</strong>
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
						</li>
						`
		})
		return itemsHtml
	}


}