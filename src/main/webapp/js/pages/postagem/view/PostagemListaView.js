/**
 * 
 */
import { ListaView } from '../../../components/custom/ListaView.js'
import { Postagem } from '../model/Postagem.js'
import { isAdmin } from './../../../sessao.js'
import { postagem } from './../../../navegacao.js'

export class PostagemListaView extends ListaView {

	constructor({ element }) {
		super({ titulo: 'AAGIL' })
		this._idLista = `ul-lista-${this._viewName}`
		this._atualizarListaFn = {}
		this._element = element
		this._init()
	}

	_update() {
	}

	_init() {
		const ul = document.createElement('ul')
		ul.id = this._idLista
		this._element = document.getElementById(this._element)
		this._element.appendChild(ul)

		super._init()
	}

	configureAtualizarLista(command) {
		this._atualizarListaFn = command
		this._atualizarListaFn()
	}

	updateListTemplate(lista) {
		super.updateListTemplate(lista)
		this._update()
	}

	_adicionarClickEvent(postagem) {
		//		document.querySelectorAll(`#img-postagem-thumbnail-${postagem.id}`).forEach(img =>
		//			img.addEventListener('click', event => this._thumbnailClickHandler(event)))
		document.querySelector(`#img-editar-postagem-${postagem.id}`).addEventListener('click', () => this._editarClickHandler(postagem.id))
	}

	_liTemplateObject(item) {
		const postagem = new Postagem(item)
		const li = document.createElement('li')
		li.className = 'li-postagem'
		li.innerHTML =
			`
			<img id="img-editar-postagem-${postagem.id}"
				src="assets/img/icon-editar.png" class="img-editar-postagem botao-editar ${isAdmin() ? '' : 'display-none'}"
				title="Editar informações">
             <label>${postagem.data}</label>
             <h1>${postagem.titulo}</h1>
             ${postagem.midia ?
				`<iframe src="
             ${postagem.midia.tipo == 'Youtube' ?
					`https://www.youtube.com/embed/${postagem.midia.codigo}` :
					`https://player.vimeo.com/video/${postagem.midia.codigo}`
				}" 
             allowfullscreen></iframe>` : ''}
             
             ${postagem.fotos ? `
             <div class="album-postagens">
                 <div class="container-img-postagem">
                     <img class="img-postagem" id="img-postagem-${postagem.id}" src="api/fotos/${postagem.fotos[0].id}">
                 </div>
             
             
             </div>
             ` : ''}
              
             <div>${postagem.conteudo}</div>
             `
		return li;
	}
	
	_editarClickHandler(idPostagem){
		postagem({event : 'editarPostagemEvent' , idPostagem })
	}

	_thumbnailClickHandler(event) {
		const idPostagem = event.target.getAttribute('postagemID')
		const idFoto = event.target.getAttribute('fotoID')
		const img = document.getElementById(`img-postagem-${idPostagem}`)
		img.src = `api/fotos/${idFoto}`
	}

	applyRole() {
		document.querySelectorAll("[id^='img-editar-postagem']").forEach(img => {
			isAdmin() ? img.classList.remove('display-none') : img.classList.add('display-none')
		})

	}


}