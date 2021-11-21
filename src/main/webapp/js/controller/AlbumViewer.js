/**
 * 
 */
import { Modal } from '../components/Modal.js'

export class AlbumViewer extends Modal {

	constructor(title, listFotos, index) {
		super(title, true, true)
		this._ulThumbnails = document.querySelector('#ul-av-thumbnails')
		this._buttonAnterior = document.querySelector('#button-av-anterior')
		this._buttonProxima = document.querySelector('#button-av-proxima')
		this._img = document.querySelector('#img-album-viewer')


		this._buttonAnterior.addEventListener('click', () => this.anterior())
		this._buttonProxima.addEventListener('click', () => this.proxima())

		this._listFotos = listFotos
		this._clickIndex = index
		this.init()
	}
	
	async init(){
		await this.thumbnailPopulate()
		
		if (this._clickIndex){
			this.thumbnailClickHandler(this._listFotos[this._clickIndex].id)
			this._scrollIntoView(this._clickIndex)
		}
	}

	async thumbnailPopulate() {
		this._listFotos.forEach((foto, index) => {
			const img = document.createElement('img')
			img.src = `api/fotos/${foto.id}/thumb`
			img.fotoID = foto.id
			img.title = foto.id
			img.addEventListener('click', event => this.thumbnailClickHandler(event.target.fotoID))
			const li = document.createElement('li')
			li.appendChild(img)
			img.id = `li-img-${index}`
			this._ulThumbnails.appendChild(li)
		})
		this._img.src = `api/fotos/${this._listFotos[0].id}`
		this._currentIndex = 0;
	}

	thumbnailClickHandler(fotoID) {
		this._img.src = `api/fotos/${fotoID}`
		this._currentIndex = this._listFotos.findIndex(foto => foto.id == fotoID)
	}

	proxima() {
		if (this._listFotos.length > this._currentIndex + 1) {
			this._currentIndex++
			this.thumbnailClickHandler(this._listFotos[this._currentIndex].id)
			this._scrollIntoView(this._currentIndex)
		}
	}

	anterior() {
		if (this._currentIndex > 0) {
			this._currentIndex--
			this.thumbnailClickHandler(this._listFotos[this._currentIndex].id)
			this._scrollIntoView(this._currentIndex)
		}
	}
	
	_scrollIntoView(index){
		document.querySelector(`#li-img-${index}`).scrollIntoView()
	}

	template() {
		return `
			<div class="album-viewer-container">
				<ul id="ul-av-thumbnails">
				</ul>
				
				<div id="div-av-navigation">
					<span title="Anterior" id="button-av-anterior" class="navigation-button">&lt;</span>
					
					<img id="img-album-viewer">
					
					<span title="Próxima" id="button-av-proxima" class="navigation-button">&gt;</span>
				</div>
				
			</div>
				`
	}

}