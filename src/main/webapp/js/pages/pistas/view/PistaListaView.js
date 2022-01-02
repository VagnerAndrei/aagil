/**
 * 
 */
import { ListaPaginadaView } from './../../../components/custom/ListaPaginadaView.js'
import { pistaRegistro } from './../../../navegacao.js'
import { isAdmin } from './../../../sessao.js'
import { AlbumViewer } from './../../../components/AlbumViewer.js'

export class PistaListaView extends ListaPaginadaView {

    constructor({ onViewCreatedFn }) {
        super({ titulo: 'Pistas', selectedIndexPagination : 0 , onViewCreatedFn })
    }

    _init() {
        super._init()
        this._ulLista.classList.add('lista-pistas')
        this._addButtonRegister()
        this._addRoledElement({ id: this._buttonRegister.id })
        this.applyRole()
    }

    _addButtonRegister() {
        this._buttonRegister = document.createElement('button')
        this._buttonRegister.id = 'button-registrar-pista'
        this._buttonRegister.textContent = 'Inserir Registro'
        this._buttonRegister.addEventListener('click', event => pistaRegistro(event))
        this._sectionHeader.appendChild(this._buttonRegister)
    }

    applyRole() {
		document.querySelectorAll("#div-editar-pista").forEach(img => {
			isAdmin() ? img.classList.remove('display-none') : img.classList.add('display-none')
		})
        this._applyRole(isAdmin())
    }


    _adicionarClickEvent(pista) {
        document.querySelector(`#img-pista-${pista.id}`).addEventListener('click', () => this._albumViewer(pista))
    }

    _albumViewer(pista) {
        if (pista.fotos)
            new AlbumViewer(pista.titulo, pista.fotos)
    }

    _liTemplateObject(pista) {
        const li = document.createElement('li')
        li.id = `li-pista-${pista.id}`
        li.className = 'li-pista'
        li.innerHTML = `<div class="div-cabecalho-li-pista">
								<strong>${pista.titulo}</strong>
								<div id="div-editar-pista" class="${isAdmin() ? '' : 'display-none'}">
									<img id="img-editar-pista-${pista.id}"
										src="assets/img/icon-editar.png" class="botao-editar"
										title="Editar informações">
								</div>
						</div>
                        <div class="flex-row">
                            <div>
                                <img id="img-pista-${pista.id}" src="${pista.fotos ? `api/fotos/${pista.fotos[0].id}/thumb` : 'assets/img/no-image.png'}" onerror="this.src='assets/img/no-image.png'">
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
                         `
        return li
    }


}