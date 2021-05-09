/**
 * 
 */
import { Modal } from '../components/Modal.js'

export class AlbumViewer extends Modal {

	constructor(title, listFotos) {
		super(title, true, true)
		this._ulThumbnails = document.querySelector('#ul-av-thumbnails')
		this._buttonAnterior = document.querySelector('#button-av-anterior')
		this._buttonProxima = document.querySelector('#button-av-proxima')
		this._img = document.querySelector('#img-album-viewer')


		this._listFotos = listFotos;
		this._listFotos.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0)
		this.thumbnailPopulate()
	}

	thumbnailPopulate() {
		this._listFotos.map(foto => {
			const img = document.createElement('img')
			img.src = `api/fotos/${foto.id}/thumb`
			img.fotoID = foto.id
			img.addEventListener('click', event => this.thumbnailClickHandler(event))
			const li = document.createElement('li')
			li.appendChild(img)
			this._ulThumbnails.appendChild(li)
		})
		this._img.src = `api/fotos/${this._listFotos[0].id}`
	}

	thumbnailClickHandler(event) {
		console.log(event.target, event.currentTarget)
		this._img.src = `api/fotos/${event.target.fotoID}`
	}

	proxima() {

	}

	anterior() {

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