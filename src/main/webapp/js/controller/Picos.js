/**
 * 
 */
import { ListaPaginada } from '../components/ListaPaginada.js'
import { picoRegistro } from '../navegacao.js'
import { atletaLogado } from '../sessao.js'
import { AlbumViewer } from '../controller/AlbumViewer.js'

export class Picos extends ListaPaginada {

	constructor() {
		super('Picos', 'api/picos', 2)
	}

	init() {
		super.init()
		console.log('init')
		this._ulLista.classList.add('lista-picos')
		this.applyRole()
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
				this.addButtonRegister()
		}
		else {
			if (this._buttonRegister) {
				this._sectionHeader.removeChild(this._buttonRegister)
				this._buttonRegister = undefined
			}
		}
	}

	adicionarClickEvent() {
		this._lista?.map(pico => {
			document.querySelector(`#li-pico-${pico.id}`).
				addEventListener('click', () => this.albumViewer(pico))
		})
	}

	albumViewer(pico) {
		if (pico.fotos)
			new AlbumViewer(pico.titulo, pico.fotos)
	}

	listTemplate() {
		let itemsHtml = ''
		this.lista?.map(pico => {
			itemsHtml += `	
						<li id="li-pico-${pico.id}" class="li-pico">
							<strong>${pico.titulo}</strong>
							<div class="flex-row">
								<div>
									<img src="${pico.fotos ? `api/fotos/${pico.fotos[0].id}/thumb` : 'assets/img/no-image.png'}" onerror="this.src='assets/img/no-image.png'">
								</div>
								<div class="informacoes-pico">
								<label>${pico.endereco.logradouro} ${pico.endereco.complemento}</label>
								<label>${pico.endereco.bairro}</label>
								<label>${pico.endereco.localidade}-${pico.endereco.uf}</label>
								<label>${pico.endereco.cep.substring(0, 5)}-${pico.endereco.cep.substring(5)}</label>
								<label>Referência: ${pico.endereco.referencia}</label>
								<label>Perimêtro: ${pico.endereco.perimetro}</label>
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