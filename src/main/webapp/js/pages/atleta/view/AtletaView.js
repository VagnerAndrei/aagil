import { View2 } from '../../../components/View2.js';
import { AtletaFormController } from '../controller/AtletaFormController.js'
import { AtletaFotoUploadController } from '../controller/AtletaFotoUploadController.js';
import { getIdUser, isLogged } from '../../../sessao.js';
import { getIdade } from '../../../util.js';

export class AtletaView extends View2 {

	constructor({ onViewCreatedFn }) {
		super({ titulo: 'Atleta', onViewCreatedFn })
		this._atleta = {}
	}

	async _update() {
		super._update(await this._template())
	}

	async _template() {
		return this._getHTML('pages/public/atleta.html')
	}

	_init() {
		this._imgAtleta = document.querySelector('#img-atleta');
		this._imgEstado = document.querySelector('#img-estado');
		this._labelNome = document.querySelector('#label-nome');
		this._labelApelido = document.querySelector('#label-apelido');
		this._textoBiografia = document.querySelector('#p-biografia');
		this._labelIdade = document.querySelector('#label-idade');
		this._labelCategoria = document.querySelector('#label-categoria');
		this._labelLocalidadeUf = document.querySelector('#label-localidade-uf');
		this._imgAtualizarAtleta = document.querySelector('#img-atualizar-atleta');
		this._imgAtualizarFoto = document.querySelector('#img-atualizar-foto');

		this._configureAtualizarFoto()
		this._configureAtualizarAtleta()
	}

	_configureAtualizarFoto() {
		this._imgAtualizarFoto.addEventListener('click', event => this._atualizarFoto(event))
	}

	_configureAtualizarAtleta() {
		this._imgAtualizarAtleta.addEventListener('click', event => this._atualizarAtleta(event))
	}

	async _atualizarFoto() {
		if (await isLogged('linkVerificationEvent'))
			new AtletaFotoUploadController({atleta : this._atleta , callbackHandler :  (event) => {
				this._setFoto(event)
				this._confereFoto() 
			}})
	}

	async _atualizarAtleta() {
		if (await isLogged('linkVerificationEvent'))
			new AtletaFormController({ atleta: this._atleta, callbackHandler: (atleta) => this.setAtleta(atleta) })
	}

	_confereFoto() {
		this._imgAtleta.src = `api/atletas/${this._atleta.id}/foto/thumb?t=${new Date().getTime()}`
	}
	
	_setFoto(foto){
		this._atleta.foto = foto
	}
	
	setAtleta(atleta) {
		this._atleta = atleta
		this._labelNome.textContent = this._atleta.nome ?? ''
		this._labelApelido.textContent = this._atleta.apelido ? ` (${this._atleta.apelido})` : ''
		this._textoBiografia.textContent = this._atleta.biografia
		this._textoBiografia.innerHTML = this._textoBiografia.innerHTML.replace(/\n/g, '<br>\n')

		this._labelLocalidadeUf.textContent = this._atleta.localidade ? `${this._atleta.localidade.nome} - ${this._atleta.localidade.uf}` : ''
		this._imgEstado.src = this._atleta.localidade ? `assets/img/ufs/${this._atleta.localidade.uf}.png` : ''

		this._labelIdade.textContent = this._atleta.nascimento ? getIdade(this._atleta.nascimento) : ''
		this._labelCategoria.textContent = this._atleta.categoria ? this._atleta.categoria : ''
		this._confereFoto()
		this._applyRole()
		this._scroll(350)
	}

	_applyRole() {
		const userOwner = this._atleta.id == getIdUser()
		this._imgAtualizarFoto.className = userOwner ? 'botao-foto' : 'display-none'
		this._imgAtualizarAtleta.className = userOwner ? 'botao-editar' : 'display-none'
	}

}