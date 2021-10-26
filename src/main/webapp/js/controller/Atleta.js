import { get } from '../fetch.js'
import { pagina_nao_encontrada } from '../navegacao.js';
import { atletaLogado, isLogged, isUser } from '../sessao.js';
import { getIdade } from '../util.js'
import { AtletaForm } from './AtletaForm.js'
import { AtletaFotoUpload } from './AtletaFotoUpload.js'
import { View } from '../components/View.js'


export class Atleta extends View {

	constructor(idAtleta) {
		super("Atleta")
		this._idAtleta = idAtleta
	}

	init() {
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
		this._imgAtualizarFoto.addEventListener('click', event => this.atualizarFoto(event))
		this._imgAtualizarAtleta.addEventListener('click', event => this.atualizarAtleta(event))
		this.consultarAtleta()
	}

	async update() {
		const { status, html } = await this.template()
		super.update(html)
		if (status == 200)
			this.init()
	}

	async template() {
		return this.getHTML('pages/public/atleta.html')
		/*`
		<div id="div-atleta" class="display-none">
			<div class="flex-column atleta">
				<h2>Atleta!</h2>
				<div class="flex-row space-beetween">
					<strong id="label-nome"></strong> <img id="img-atualizar-atleta"
						src="assets/img/icon-editar.png" class="botao-editar display-none"
						title="Editar informações">
				</div>
				<div class="flex-row space-beetween">
					<div class="container-foto-atleta">
						<img id="img-atleta" onerror="this.src='assets/img/usuario.png'">
	
						<img id="img-atualizar-foto" src="assets/img/icon-foto.png"
							class="botao-foto display-none" title="Atualizar foto">
					</div>
					<div class="flex-column space-beetween items-right">
	
						<img id="img-estado"> <strong id="label-localidade-uf"></strong>
						<strong id="label-categoria"></strong> <strong id="label-idade"></strong>
					</div>
				</div>
				<div>
					<p id="p-biografia"></p>
				</div>
			</div>
			<div class="manobras">
				<h2>Manobras!</h2>
			</div>
			<div class="grupos">
				<h2>Grupos!</h2>
			</div>
		</div>
		`*/
	}

	applyRole() {
		if (isUser()) {
			if (atletaLogado.id == this._idAtleta) {
				this._imgAtualizarFoto.classList.remove('display-none');
				this._imgAtualizarAtleta.classList.remove('display-none');
			} else {
				this._imgAtualizarFoto.classList.add('display-none');
				this._imgAtualizarAtleta.classList.add('display-none');
			}
		} else {
			this._imgAtualizarFoto.classList.add('display-none');
			this._imgAtualizarAtleta.classList.add('display-none');
		}
}

// TODO: asd
async consultarAtleta(idAtleta) {
	if (idAtleta) this._idAtleta = idAtleta
	const response = await get(`api/atletas/${this._idAtleta}`);

	if (response.status == 302) {
		const atleta = await response.json();

		this.setAtleta(atleta);

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

async atualizarFoto() {
	if (await isLogged('linkVerificationEvent'))
		new AtletaFotoUpload(this._atleta, event => this.confereFoto(event))
	// TODO: adicionar mensagem de login em outra conta
}

async atualizarAtleta() {
	if (await isLogged('linkVerificationEvent'))
		new AtletaForm(this._atleta, event => this.setAtleta(event))
	// TODO: adicionar mensagem de login em outra conta 
}

setAtleta(atleta) {
	this._atleta = atleta;
	this._labelNome.textContent = this._atleta.nome
	this._labelApelido.textContent = `(${this._atleta.apelido})`
	this._textoBiografia.textContent = this._atleta.biografia
	this._textoBiografia.innerHTML = this._textoBiografia.innerHTML.replace(/\n/g, '<br>\n')

	if (this._atleta.localidade) {
		this._labelLocalidadeUf.textContent = `${this._atleta.localidade.nome} - ${this._atleta.localidade.uf}`
		this._imgEstado.src = `assets/img/ufs/${this._atleta.localidade.uf}.png`
	}

	if (this._atleta.nascimento) this._labelIdade.textContent = getIdade(this._atleta.nascimento);
	if (this._atleta.categoria) this._labelCategoria.textContent = this._atleta.categoria;

	this.applyRole()
}



}