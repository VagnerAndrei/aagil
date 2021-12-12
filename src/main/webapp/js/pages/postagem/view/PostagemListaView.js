/**
 * 
 */
import { ListaView } from '../../../components/ListaView.js'
import { Postagem } from '../model/Postagem.js'

export class PostagemListaView extends ListaView {

    constructor({ element, onViewCreatedFn }) {
        super({ titulo: 'AAGIL', onViewCreatedFn })
        this._element = document.getElementById(element)
        this._idLista = `ul-lista-${this._viewName}`
        this._atualizarListaFn = {}
    }

    configureAtualizarLista(command) {
        this._atualizarListaFn = command
    }

    _init() {
        const ul = document.createElement('ul')
        ul.id = this._idLista
        this._element.appendChild(ul)

        super._init()

        this._template()
    }

    async _template() {
        await this._atualizarListaFn()
    }

    updateListTemplate(lista) {
        super.updateListTemplate(lista)
        this._update()
    }

    _adicionarClickEvent(item) {
        document.querySelectorAll(`#img-postagem-thumbnail-${postagem.id}`).forEach(img =>
            img.addEventListener('click', event => this._thumbnailClickHandler(event)))
    }

    _liTemplateObject(item) {
        const postagem = new Postagem(item)
        const li = document.createElement('li')
        li.className = 'li-postagem'
        li.innerHTML =
            `
             <li class="li-postagem">
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
                 
                 <ul id="ul-thumbnail-postagem" class="album-postagens-thumbnails ${postagem.fotos.length > 1 ? '' : 'display-none'}">
                 
                     ${postagem.fotos.map(foto => `
                         <li>
                             <img postagemID="${postagem.id}" fotoID="${foto.id}" id="img-postagem-thumbnail-${postagem.id}" src="api/fotos/${foto.id}/thumb">
                         </li>`)}
                     
                 </ul>
                 
                 </div>
                 ` : ''}
                  
                 <div>${postagem.conteudo}</div>
             </li>
             `
        return li;
    }

    _thumbnailClickHandler(event) {
        const idPostagem = event.target.getAttribute('postagemID')
        const idFoto = event.target.getAttribute('fotoID')
        const img = document.getElementById(`img-postagem-${idPostagem}`)
        img.src = `api/fotos/${idFoto}`
    }

    _update() {
        this._element?.appendChild(this._ulLista)
    }

}