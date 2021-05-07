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
		this._ulLista.classList.add('lista-picos')
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
			pico.fotos.sort()
			pico.tags.sort()
			console.log(pico, `api/fotos/${pico.fotos[0].id}/thumb`)
			itemsHtml += `	
						<li id="li-pico-${pico.id}">
							<strong>${pico.titulo}</strong>
							<div class="flex-row">
								<div>
									${pico.fotos ? `
									<img src="api/fotos/${pico.fotos[0].id}/thumb" onerror="this.src='assets/img/usuario.png'">
									` : ''}
								</div>
								<div class="informacoes-pico">
								<label>${pico.endereco.cep}</label>
								<label>${pico.endereco.localidade}-${pico.endereco.uf}</label>
								<label>${pico.endereco.bairro}</label>
								<label>${pico.endereco.logradouro}</label>
								<label>${pico.endereco.complemento}</label>
								<label>${pico.endereco.perimetro}</label>
								<label>${pico.endereco.referencia}</label>
								</div>
								<div>
									<img src="assets/img/ufs/${pico.endereco.uf}.png">
								</div>
							</div>
						</li>
						`
		})
		return itemsHtml
	}


}