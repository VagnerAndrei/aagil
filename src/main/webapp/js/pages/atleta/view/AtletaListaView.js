import { ListaPaginadaView } from '../../../components/custom/ListaPaginadaView.js'
import { perfil } from './../../../navegacao.js'
import { getIdade } from '.././../../util.js'

export class AtletaListaView extends ListaPaginadaView {

	constructor({ onViewCreatedFn, selectedIndexPagination = 0 }) {
		super({ titulo: 'Atletas', selectedIndexPagination, onViewCreatedFn })
	}

	_init() {
		super._init()
		this._ulLista.classList.add('lista-atletas')
	}

	_adicionarClickEvent(atleta) {
		document.querySelector(`#li-atleta-${atleta.id}`).addEventListener('click', () => {
			perfil('atletaClickEvent', atleta.id)
		})
	}

	_liTemplateObject(atleta) {
		const li = document.createElement('li')
		li.id = `li-atleta-${atleta.id}`
		li.innerHTML = `<strong>${atleta.nome}</strong> 
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
						</div>`
		return li
	}
}