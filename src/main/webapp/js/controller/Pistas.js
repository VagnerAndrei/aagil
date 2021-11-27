/**
 * 
 */
import { ListaPaginada } from '../components/ListaPaginada.js'
import { pistaRegistro } from '../navegacao.js'
import { atletaLogado } from '../sessao.js'
import { AlbumViewer } from '../controller/AlbumViewer.js'

export class Pistas extends ListaPaginada {

	constructor() {
		super('Pistas', 'api/pistas', 2)
	}

	init() {
		super.init()
		console.log('init')
		this._ulLista.classList.add('lista-pistas')
		this.applyRole()
	}

	addButtonRegister() {
		this._buttonRegister = document.createElement('button')
		this._buttonRegister.id = 'button-registrar-pista'
		this._buttonRegister.textContent = 'Inserir Registro'
		this._buttonRegister.addEventListener('click', event => pistaRegistro(event))
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
		this._lista?.map(pista => {
			document.querySelector(`#li-pista-${pista.id}`).
				addEventListener('click', () => this.albumViewer(pista))
		})
	}

	albumViewer(pista) {
		if (pista.fotos)
			new AlbumViewer(pista.titulo, pista.fotos)
	}

	listTemplate() {
		let itemsHtml = ''
		this.lista?.map(pista => {
			itemsHtml += `	
						<li id="li-pista-${pista.id}" class="li-pista">
							<strong>${pista.titulo}</strong>
							<div class="flex-row">
								<div>
									<img src="${pista.fotos ? `api/fotos/${pista.fotos[0].id}/thumb` : 'assets/img/no-image.png'}" onerror="this.src='assets/img/no-image.png'">
								</div>
								<div class="informacoes-pista">
								<label>${pista.endereco.logradouro} ${pista.endereco.complemento}</label>
								<label>${pista.endereco.bairro}</label>
								<label>${pista.endereco.localidade}-${pista.endereco.uf}</label>
								<label>${pista.endereco.cep.substring(0, 5)}-${pista.endereco.cep.substring(5)}</label>
								<label>Referência: ${pista.endereco.referencia}</label>
								<label>Perimêtro: ${pista.endereco.perimetro}</label>
								</div>
								<div>
									<img src="assets/img/ufs/${pista.endereco.uf}.png">
								</div>
							</div>
						</li>
						`
		})
		return itemsHtml
	}


}