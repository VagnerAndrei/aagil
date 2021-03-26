import { get, put, deletar, pagina_nao_encontrada, urls } from './navegacao-controller.js';
import { usuarioLogado } from './conta-controller.js';

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
			elements.botaoFecharModal.addEventListener('click', fecharModal)
		}

		elements.container.classList.add('container-atleta');
		elements.container.classList.remove('display-none');

		confereFoto();
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

	if (atleta.nascimento) {
		const now = new Date();

		const aniversario = atleta.nascimento.split("-");
		const anos = now.getFullYear() - new Number(aniversario[0]);
		const mesAniversario = new Number(aniversario[1]);
		const diaAniversario = new Number(aniversario[2]);

		const idade = (now.getMonth() + 1 < mesAniversario || (now.getMonth() + 1 == mesAniversario && now.getDate() < diaAniversario)) ? anos - 1 : anos;

		elements.labelIdade.textContent = `${idade} anos`;
	}

	if (atleta.categoria) {
		elements.labelCategoria.textContent = atleta.categoria;
	}
}

function confereFoto() {
	document.getElementById('img-atleta').src = `api/atletas/${atleta.id}/foto`
}

const elementsModal = { bgModal: null, conteudoModal: null, labelTitulo: null };
const elementsAtualizarFoto = { botaoCancelar: null, botaoRemoverFoto: null, botaoEnviar: null, progressBar: null, labelProgress: null, inputFoto: null, labelErroFoto: null, form: null };

async function atualizarFoto() {

	/*
	ATRIBUINDO MODAL HTML DOCUMENT ELEMENTS
	*/
	elementsModal.bgModal = document.getElementById('bg-modal');
	elementsModal.conteudoModal = document.getElementById('conteudo-modal');
	elementsModal.labelTitulo = document.getElementById('label-titulo');


	elementsModal.bgModal.style.display = 'block';
	elementsModal.labelTitulo.textContent = "Atualizar Foto";

	/*
	NAVEGANDO ATUALIZAR FOTO ATLETA
	*/
	const response = await get(urls.atleta_atualizar_foto.path)

	switch (response.status) {
		case (202): {

		}
		case (403): {

		}
		case (429, 547): {

		}
	}

	if (response.status == 403)
		elementsModal.conteudoModal.innerHTML = '<h2>Acesso negado</h2>';
	else {
		const html = await response.text();
		elementsModal.conteudoModal.innerHTML = new DOMParser().parseFromString(html, "text/html").getElementsByTagName('main')[0];


		/*
		ATRIBUINDO HTML ELEMENTS ATUALIZAR FOTO ATLETA
		*/
		elementsAtualizarFoto.form = document.forms.namedItem('form-upload');
		elementsAtualizarFoto.labelErroFoto = document.getElementById('label-erro-foto');
		elementsAtualizarFoto.botaoRemoverFoto = document.getElementById('botao-remover-foto');
		elementsAtualizarFoto.botaoCancelar = document.getElementById('botao-cancelar');
		elementsAtualizarFoto.botaoEnviar = document.getElementById('botao-enviar');
		elementsAtualizarFoto.progressBar = document.getElementById('progress');
		elementsAtualizarFoto.labelProgress = document.getElementById('label-progress');
		elementsAtualizarFoto.inputFoto = document.getElementById('input-foto');

		/*
		ADICIONANDO EVENTOS
		*/
		elementsAtualizarFoto.form.addEventListener('submit', enviarFoto);
		elementsAtualizarFoto.inputFoto.addEventListener('change', inputFotoChange)
		elementsAtualizarFoto.botaoCancelar.addEventListener('click', cancelarUpload)

		/*
		VERIFICANDO FOTO ATUAL
		*/
		if (elements.imgAtleta.src.indexOf('api/atletas') != -1) {
			elementsAtualizarFoto.botaoRemoverFoto.classList.remove('display-none');
			elementsAtualizarFoto.botaoRemoverFoto.addEventListener('click', removerFoto);
		}


	}

	elements.title.textContent = 'Circle ' + urls.atleta_atualizar_foto.title;

}

const elementsAtualizarAtleta = {
	labelErro: null, inputNome: null, textareaBiografia: null, inputNascimento: null, radioCategoria: null, selectUfs: null, selectLocalidades: null, botaoEnviar: null, form: null
}

async function atualizarAtleta() {

	/*
	ATRIBUINDO MODAL HTML DOCUMENT ELEMENTS
	*/
	elementsModal.bgModal = document.getElementById('bg-modal');
	elementsModal.conteudoModal = document.getElementById('conteudo-modal');
	elementsModal.labelTitulo = document.getElementById('label-titulo');


	elementsModal.bgModal.style.display = 'block';
	elementsModal.labelTitulo.textContent = "Atualizar Atleta";


	/*
	CARREGANDO HTML ATUALIZAR ATLETA
	*/
	const response = await get(urls.atleta_atualizar.path);


	if (response.status == 403)
		elementsModal.conteudoModal.innerHTML = '<h2>Acesso negado</h2>';
	else {
		const html = await response.text();

		elementsModal.conteudoModal.innerHTML = new DOMParser().parseFromString(html, "text/html").getElementsByTagName('main')[0].innerHTML;

		/*
		ATRIBUINDO DOCUMENT HTML ELEMENT
		*/
		elementsAtualizarAtleta.form = document.forms.namedItem('form-atualizar-atleta');
		elementsAtualizarAtleta.labelErro = document.getElementById('label-erro');
		elementsAtualizarAtleta.inputNome = document.getElementById('input-nome');
		elementsAtualizarAtleta.textareaBiografia = document.getElementById('textarea-biografia');
		elementsAtualizarAtleta.inputNascimento = document.getElementById('input-nascimento');
		elementsAtualizarAtleta.radioCategoria = document.getElementsByName('radio-categoria');
		elementsAtualizarAtleta.form.addEventListener('submit', enviarAtualizacao);

		elementsAtualizarAtleta.botaoEnviar = document.getElementById('botao-enviar');
		elementsAtualizarAtleta.selectUfs = document.getElementById('select-ufs');
		elementsAtualizarAtleta.selectLocalidades = document.getElementById('select-localidades');

		elementsAtualizarAtleta.selectUfs.addEventListener('change', carregaLocalidades)
		elementsAtualizarAtleta.selectLocalidades = document.getElementById('select-localidades');

		/*
		PREENCHENDO FORMULÁRIO COM ATLETA ATUAL
		*/
		if (atleta.nome)
			elementsAtualizarAtleta.inputNome.value = atleta.nome;
		if (atleta.biografia)
			elementsAtualizarAtleta.textareaBiografia.value = atleta.biografia;
		if (atleta.nascimento)
			elementsAtualizarAtleta.inputNascimento.value = atleta.nascimento;
		if (atleta.categoria)
			Array.from(elementsAtualizarAtleta.radioCategoria).find(radio => radio.value == atleta.categoria).checked = true;

		/*
		CONSULTANDO UFS
		*/
		elementsAtualizarAtleta.selectLocalidades.disabled = true;
		const responseUfs = await get('api/localizacao/estados');

		if (responseUfs.status == 200) {
			const ufs = await responseUfs.json();
			ufs.map(uf => {
				const element = document.createElement("option");
				element.value = uf.id;
				element.text = uf.sigla;
				element.title = uf.nome;
				elementsAtualizarAtleta.selectUfs.add(element, null)
			})

			if (atleta.localidade) {
				elementsAtualizarAtleta.selectUfs.value = atleta.localidade.idUf;
				carregaLocalidades();
			}
		}

	}

	elements.title.textContent = 'Circle ' + urls.atleta_atualizar.title;

}

async function carregaLocalidades(event) {

	const idUf = event ? event.target.value : atleta.localidade.idUf;

	/*
	LIMPANDO LOCALIDADES
	*/
	if (elementsAtualizarAtleta.selectLocalidades.length > 1) {
		const optionsLocalidades = document.querySelectorAll('#select-localidades option');
		optionsLocalidades.forEach(o => o.remove());
		const elementLocalidades = document.createElement("option");
		elementLocalidades.text = "Localidade:"
		elementLocalidades.value = "";
		elementsAtualizarAtleta.selectLocalidades.add(elementLocalidades, null);
	}

	/*
	CONSULTANDO LOCALIDADES
	*/
	if (idUf != "") {
		const responseLocalidades = await get(`api/localizacao/localidades/${idUf}`);

		if (responseLocalidades.status == 200) {
			const localidades = await responseLocalidades.json();


			localidades.map(localidade => {
				const element = document.createElement("option");
				element.value = localidade.id;
				element.text = localidade.nome;
				elementsAtualizarAtleta.selectLocalidades.add(element, null);
			})
		}
	}
	if (!event) elementsAtualizarAtleta.selectLocalidades.value = atleta.localidade.id;
	elementsAtualizarAtleta.selectLocalidades.disabled = false;
}

async function enviarAtualizacao(event) {
	event.preventDefault();
	const response = await put('api/atletas', {
		id: atleta.id,
		nome: elementsAtualizarAtleta.inputNome.value,
		biografia: elementsAtualizarAtleta.textareaBiografia.value,
		nascimento: elementsAtualizarAtleta.inputNascimento.value,
		categoria: Array.from(elementsAtualizarAtleta.radioCategoria).find(radio => radio.checked).value,
		localidade: {
			id: elementsAtualizarAtleta.selectLocalidades.value,
		}
	})
	switch (response.status) {
		case 202:
			const atleta = await response.json()
			setAtleta(atleta)
			fecharModal()
			break
		case 403:
			elementsAtualizarAtleta.labelErro.textContent = "Acesso negado"
			break
		case 500:
			response.json().then(value => elementsAtualizarAtleta.labelErro.textContent = value.mensagem)
			break
	}

}



function removerFoto() {
	deletar(`api/atletas/${atleta.id}/foto`).then(() => {
		confereFoto();
		fecharModal();
	});
}

function inputFotoChange() {
	const tamanhoMaximo = 4;

	if ((elementsAtualizarFoto.inputFoto.files[0].size / 1024 / 1024).toFixed(2) > tamanhoMaximo) {
		elementsAtualizarFoto.labelErroFoto.textContent = `Tamanho do arquivo ${(elementsAtualizarFoto.inputFoto.files[0].size / 1024 / 1024).toFixed(2)} excede ${tamanhoMaximo.toFixed(2)} (MB)`
		elementsAtualizarFoto.form.reset();
		elementsAtualizarFoto.botaoEnviar.classList.add('display-none');
		elementsAtualizarFoto.botaoRemoverFoto.classList.add('display-none');
	}
	else {
		elementsAtualizarFoto.botaoEnviar.classList.remove('display-none');
		elementsAtualizarFoto.labelErroFoto.textContent = '';
		elementsAtualizarFoto.botaoRemoverFoto.classList.add('display-none');
	}
	elementsAtualizarFoto.botaoCancelar.classList.remove('display-none');
}

function cancelarUpload() {
	if (xhr)
		xhr.abort();
	elementsAtualizarFoto.labelErroFoto.textContent = '';
	elementsAtualizarFoto.form.reset();
	enviando(false);
	if (elements.imgAtleta.src.indexOf('api/atletas') != -1) {
		elementsAtualizarFoto.botaoRemoverFoto.classList.remove('display-none');
	}
}

let xhr;
function enviarFoto(event) {

	event.preventDefault();

	if (elementsAtualizarFoto.labelErroFoto.textContent == '') {
		xhr = new XMLHttpRequest();

		xhr.open('PUT', `api/atletas/${atleta.id}/foto`);

		xhr.upload.addEventListener('load', () => {

		});

		xhr.upload.addEventListener('loadstart', () => enviando(true));

		xhr.upload.addEventListener('abort', () => {
			console.log('abort')
			xhr = null;
		});

		xhr.upload.addEventListener('error', enviando(false));

		xhr.upload.addEventListener('progress', e => {
			const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : '0';
			elementsAtualizarFoto.progressBar.value = percent;
			elementsAtualizarFoto.labelProgress.textContent = percent != 100 ? `Enviando... (${percent})` : "Processando imagem..."
		})

		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				switch (xhr.status) {
					case 500:
					case 429:
					case 400:
						elementsAtualizarFoto.labelErroFoto.textContent = JSON.parse(xhr.response).mensagem
						xhr = null
						break
					case 202:
						xhr = null
						confereFoto()
						fecharModal()
						break
					case 403:
						elementsAtualizarFoto.labelErroFoto.textContent = "Acesso negado"
						break
				}
			}

		}

		xhr.onerror = (e) => {
			console.log(e)
			elementsAtualizarFoto.labelErroFoto.textContent = "Ocorreu um erro no envio da imagem"
		}

		xhr.send(new FormData(event.target))
	}

}

function enviando(bool) {
	if (bool) {
		elementsAtualizarFoto.botaoCancelar.classList.remove('display-none');
		elementsAtualizarFoto.progressBar.classList.remove('display-none');
	}
	else {
		elementsAtualizarFoto.progressBar.classList.add('display-none')
		elementsAtualizarFoto.botaoCancelar.classList.add('display-none');
	}
	elementsAtualizarFoto.botaoEnviar.classList.add('display-none');
}

function fecharModal() {
	elementsModal.conteudoModal.innerHTML = '';
	elementsModal.bgModal.style.display = 'none';
	elements.title.textContent = 'Circle ' + urls.atleta.title;
}

