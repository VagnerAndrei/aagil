/**
 * 
 */
import { ListaPaginada } from '../components/ListaPaginada.js'
import { picoRegistro } from '../navegacao.js'
import { atletaLogado } from '../sessao.js'

export class Picos extends ListaPaginada {

	constructor() {
		super('Picos', 'api/picos', 2)
	}

	init() {
		super.init()
		console.log('init')
		this._ulLista.classList.add('lista-picos')
		if (atletaLogado) {
			this.addButtonRegister()
		}
	}

	addButtonRegister() {
		this._buttonRegister = document.createElement('button')
		this._buttonRegister.id = 'button-registrar-pico'
		this._buttonRegister.textContent = 'Inserir Registro'
		this._buttonRegister.addEventListener('click', event => picoRegistro(event))
		this._sectionHeader.appendChild(this._buttonRegister)
	}

	applyRole() {
		if (atletaLogado) {
			if (!this._buttonRegister)
				addButtonRegister()
		}
		else {
			this._sectionHeader.removeChild(this._buttonRegister)
			this._buttonRegister = undefined
		}
	}

	adicionarClickEvent() {

	}

	listTemplate() {
		let itemsHtml = ''
		this.lista?.map(pico => {
			itemsHtml += `	
						<li id="li-pico-${pico.id}">
							<strong>${pico.titulo}</strong>
							<div class="flex-row">
								<div>
									<img src="${pico.fotos ? `api/fotos/${pico.fotos[0].id}/thumb` : 'assets/img/no-image.png'}" onerror="this.src='assets/img/no-image.png'">
								</div>
								<div class="informacoes-pico">
								<label>${pico.endereco.logradouro}</label>
								<label>${pico.endereco.complemento}</label>
								<label>${pico.endereco.perimetro}</label>
								<label>${pico.endereco.bairro}</label>
								<label>${pico.endereco.referencia}</label>
								<label>${pico.endereco.localidade}-${pico.endereco.uf}</label>
								<label>${pico.endereco.cep.substring(0,5)}-${pico.endereco.cep.substring(5)}</label>
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