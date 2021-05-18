/**
 * 
 */
import { Lista } from '../components/Lista.js'

export class Postagens extends Lista {

	constructor(element) {
		super('Postagens', 'api/postagens')
		this._element = document.getElementById(element)
		this.init()
	}
	
	init(){
		const ul = document.createElement('ul')
		ul.id=`ul-lista-${this._viewName}`
		this._element.appendChild(ul)
		
		super.init()
		
		this.template()
	}
	
	async template(){
		await this.atualizarLista()
		this.updateTemplate()
		this.update()
	}
	
	listTemplate(){
		let itensHTML = ''
		this._lista.map(postagem => {
			itensHTML +=
			`
			<li>
				<h1>${postagem.titulo}</h1>
				<label>${postagem.data}</label>
				${postagem.midia ?
				`<iframe src="
				${postagem.midia.tipo == 'Youtube' ? 
						`https://www.youtube.com/embed/${postagem.midia.codigo}?rel=0` :
						`https://player.vimeo.com/video/${postagem.midia.codigo}`
						}" 
				allowfullscreen></iframe>` : ''}
				
				
				<img>
				<div>${postagem.conteudo}</div>
			</li>
			`
		})
		return itensHTML;
	}
	
	update(){
		this._element?.appendChild(this._ulLista)
	}
	
}