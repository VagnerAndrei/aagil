/**
 * 
 */
import { Lista } from '../components/Lista.js'
import { Postagem } from '../model/Postagem.js'

export class Postagens extends Lista {

	constructor(element) {
		super('AAGIL', 'api/postagens')
		this._element = document.getElementById(element)
		this.init()
	}

	init() {
		const ul = document.createElement('ul')
		ul.id = `ul-lista-${this._viewName}`
		this._element.appendChild(ul)

		super.init()

		this.template()
	}

	async template() {
		await this.atualizarLista()
		this.updateTemplate()
		this.update()
		this.adicionarClickEvent()
	}
	
	adicionarClickEvent(){
		document.querySelectorAll('#ul-thumbnail-postagem li img').forEach(img => img.addEventListener('click', event => this.thumbnailClickHandler(event)))
	}
	
	

	listTemplate() {
		let itensHTML = ''
		this._lista.map(item => {
			const postagem = new Postagem(item)
			itensHTML +=
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
					<img class="img-postagem" id="img-postagem-${postagem.id}" src="api/fotos/${postagem.fotos[0].id}">
				
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
		})
		return itensHTML;
	}

	thumbnailClickHandler(event) {
		const idPostagem = event.target.getAttribute('postagemID')
		const idFoto = event.target.getAttribute('fotoID')
		const img = document.getElementById(`img-postagem-${idPostagem}`)
		img.src = `api/fotos/${idFoto}`
	}

	update() {
		this._element?.appendChild(this._ulLista)
	}

}