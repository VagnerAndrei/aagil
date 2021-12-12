/**
 * 
 */
import { ListaPaginadaView } from './../../../components/ListaPaginadaView.js'
import { pistaRegistro } from './../../../navegacao.js'
import { isAdmin } from './../../../sessao.js'
import { AlbumViewer } from './../../../controller/AlbumViewer.js'

export class PistaListaView extends ListaPaginadaView {

    constructor({ onViewCreatedFn }) {
        super({ titulo: 'Atletas', selectedIndexPagination = 0, onViewCreatedFn })
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
        this._applyRole(isAdmin())
    }


    _adicionarClickEvent(pista) {
        document.querySelector(`#li-pista-${pista.id}`).addEventListener('click', () => this._albumViewer(pista))
    }

    _albumViewer(pista) {
        if (pista.fotos)
            new AlbumViewer(pista.titulo, pista.fotos)
    }

    _liTemplateObject(pista) {
        const li = document.createElement('li')
        li.id = `li-pista-${pista.id}`
        li.className = 'li-pista'
        li.innerHTML = `<strong>${pista.titulo}</strong>
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
                         `
        return li
    }


}