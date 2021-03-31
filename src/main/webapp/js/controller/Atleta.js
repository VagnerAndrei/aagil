import { get } from '../fetch.js'
import { pagina_nao_encontrada } from '../navegacao.js';
import { usuarioLogado } from '../sessao.js';
import { getIdade } from '../util.js'
import { AtletaForm } from './AtletaForm.js'
import { AtletaFotoUpload } from './AtletaFotoUpload.js'
import { View } from '../components/View.js'


export class Atleta extends View {

	constructor(idAtleta) {
		super()
		this._imgAtleta = document.querySelector('#img-atleta');
		this._imgEstado = document.querySelector('#img-estado');
		this._labelNome = document.querySelector('#label-nome');
		this._textoBiografia = document.querySelector('#p-biografia');
		this._labelIdade = document.querySelector('#label-idade');
		this._labelCategoria = document.querySelector('#label-categoria');
		this._labelLocalidadeUf = document.querySelector('#label-localidade-uf');
		this._container = document.querySelector('#container');
		this._imgAtualizarAtleta = document.querySelector('#img-atualizar-atleta');
		this._imgAtualizarFoto = document.querySelector('#img-atualizar-foto');
		this._idAtleta = idAtleta
		this.consultarAtleta()
	}

	async consultarAtleta() {
		const response = await get(`api/atletas/${this._idAtleta}`);

		if (response.status == 302) {
			const atleta = await response.json();

			this.setAtleta(atleta);

			if (usuarioLogado && usuarioLogado.id == this._idAtleta) {
				this._imgAtualizarFoto.classList.remove('display-none');
				this._imgAtualizarAtleta.classList.remove('display-none');
				this._imgAtualizarFoto.addEventListener('click', event => this.atualizarFoto(event))
				this._imgAtualizarAtleta.addEventListener('click', event => this.atualizarAtleta(event))
			}

			this._container.classList.add('container-atleta');
			this._container.classList.remove('display-none');

			this.confereFoto(this._atleta.foto)
		}
		else
			if (response.status == 404 || response.status == 500)
				pagina_nao_encontrada();
	}

	confereFoto(foto) {
		this._atleta.foto = foto
		this._imgAtleta.src = `api/atletas/${this._atleta.id}/foto/thumb?t=${new Date().getTime()}`
	}

	atualizarFoto() {
		new AtletaFotoUpload(this._atleta, event => this.confereFoto(event))
	}

	atualizarAtleta() {
		new AtletaForm(this._atleta, event => this.setAtleta(event))
	}

	setAtleta(atleta) {
		this._atleta = atleta;
		this._labelNome.textContent = this._atleta.nome
		this._textoBiografia.textContent = this._atleta.biografia
		this._textoBiografia.innerHTML = this._textoBiografia.innerHTML.replace(/\n/g, '<br>\n')

		if (this._atleta.localidade) {
			this._labelLocalidadeUf.textContent = `${this._atleta.localidade.nome} - ${this._atleta.localidade.uf}`
			this._imgEstado.src = `assets/img/ufs/${this._atleta.localidade.uf}.png`
		}

		if (this._atleta.nascimento) this._labelIdade.textContent = getIdade(this._atleta.nascimento);
		if (this._atleta.categoria) this._labelCategoria.textContent = this._atleta.categoria;
	}


}