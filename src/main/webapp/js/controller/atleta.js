import { get, pagina_nao_encontrada, urls } from './navegacao-controller.js';
import { usuarioLogado } from './conta-controller.js';
import { getIdade } from './../util.js'
import { AtletaForm } from './AtletaForm.js'
import { AtletaFotoUpload } from './AtletaFotoUpload.js'

let atleta;
const elements = {
	labelNome: null, textoBiografia: null, imgAtleta: null, imgEstado: null, labelIdade: null, labelCategoria: null, labelCidade: null, labelCategoria: null,
	labelLocalidadeUf: null, container: null, imgAtualizarAtleta: null, imgAtualizarFoto: null, botaoFecharModal: null, title: null
}

export async function initAtleta() {

	/*
	ATRIBUINDO HTML ELEMENTS PERFIL ATLETA
	*/
	elements.imgAtleta = document.getElementById('img-atleta');
	elements.imgEstado = document.getElementById('img-estado');
	elements.labelNome = document.getElementById('label-nome');
	elements.textoBiografia = document.getElementById('p-biografia');
	elements.labelIdade = document.getElementById('label-idade');
	elements.labelCategoria = document.getElementById('label-categoria');
	elements.labelCategoria = document.getElementById('label-categoria');
	elements.labelLocalidadeUf = document.getElementById('label-localidade-uf');
	elements.container = document.getElementById('container');
	elements.imgAtualizarAtleta = document.getElementById('img-atualizar-atleta');
	elements.imgAtualizarFoto = document.getElementById('img-atualizar-foto');
	elements.botaoFecharModal = document.getElementById('botao-fechar-modal');
	elements.title = document.getElementsByTagName('title')[0];


	/*
	CONSULTANDO ATLETA
	*/
	let response = await get(`api/atletas/${urls.atleta.id}`);

	if (response.status == 302) {
		const atleta = await response.json();

		setAtleta(atleta);

		if (usuarioLogado && usuarioLogado.id == urls.atleta.id) {
			elements.imgAtualizarFoto.classList.remove('display-none');
			elements.imgAtualizarAtleta.classList.remove('display-none');
			elements.imgAtualizarFoto.addEventListener('click', atualizarFoto)
			elements.imgAtualizarAtleta.addEventListener('click', atualizarAtleta)
		}

		elements.container.classList.add('container-atleta');
		elements.container.classList.remove('display-none');

		confereFoto(atleta.foto)
	}
	else
		if (response.status == 404 || response.status == 500)
			pagina_nao_encontrada();
}

function setAtleta(a) {
	atleta = a;
	elements.labelNome.textContent = atleta.nome
	elements.textoBiografia.textContent = atleta.biografia
	elements.textoBiografia.innerHTML = elements.textoBiografia.innerHTML.replace(/\n/g, '<br>\n')

	if (atleta.localidade) {
		elements.labelLocalidadeUf.textContent = `${atleta.localidade.nome} - ${atleta.localidade.uf}`
		elements.imgEstado.src = `assets/img/ufs/${atleta.localidade.uf}.png`
	}

	if (atleta.nascimento) elements.labelIdade.textContent = getIdade(atleta.nascimento);
	if (atleta.categoria) elements.labelCategoria.textContent = atleta.categoria;
}

function confereFoto(foto) {
	atleta.foto = foto
	elements.imgAtleta.src = `api/atletas/${atleta.id}/foto/thumb?t=${new Date().getTime()}`
}

function atualizarFoto() {
	new AtletaFotoUpload(atleta, confereFoto)
}

function atualizarAtleta() {
	new AtletaForm(atleta, setAtleta)
}