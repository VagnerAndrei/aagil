/**
 * 
 */
import { Modal } from './../components/Modal.js'
import { urls } from './../controller/navegacao.js'
import { get, put } from './../controller/fetch.js'


export class AtletaForm extends Modal {

	constructor(atleta, callbackHandler) {
		super(urls.atleta_form.path, 'Atualizar Atleta')

		this._atleta = atleta
		this._callbackHandler = callbackHandler
	}

	init() {
		this._form = document.forms.namedItem('form-atualizar-atleta');
		this._labelErro = document.querySelector('#label-erro');
		this._inputNome = document.querySelector('#input-nome');
		this._textareaBiografia = document.querySelector('#textarea-biografia');
		this._inputNascimento = document.querySelector('#input-nascimento');
		this._radioCategoria = document.getElementsByName('radio-categoria');
		this._form.addEventListener('submit', event => this.enviarAtualizacao(event));

		this._botaoEnviar = document.querySelector('#botao-enviar');
		this._selectUfs = document.querySelector('#select-ufs');
		this._selectLocalidades = document.querySelector('#select-localidades');

		this._selectUfs.addEventListener('change', event => this.carregarLocalidades(event))
		this._selectLocalidades = document.querySelector('#select-localidades');

		this.setAtleta()
		this.carregarUFs()
	}

	setAtleta() {
		if (this._atleta.nome) this._inputNome.value = this._atleta.nome;
		if (this._atleta.biografia) this._textareaBiografia.value = this._atleta.biografia;
		if (this._atleta.nascimento) this._inputNascimento.value = this._atleta.nascimento;
		if (this._atleta.categoria) Array.from(this._radioCategoria).find(radio => radio.value == this._atleta.categoria).checked = true;
	}

	async carregarUFs() {
		this._selectLocalidades.disabled = true;

		const responseUfs = await get('api/localizacao/estados');

		if (responseUfs.status == 200) {
			const ufs = await responseUfs.json();
			ufs.map(uf => {
				const element = document.createElement("option");
				element.value = uf.id;
				element.text = uf.sigla;
				element.title = uf.nome;
				this._selectUfs.add(element, null)
			})

			if (this._atleta.localidade) {
				this._selectUfs.value = this._atleta.localidade.idUf;
				this.carregarLocalidades();
			}
		}
	}

	async carregarLocalidades(event) {

		const idUf = event ? event.target.value : this._atleta.localidade.idUf;

		/*
		LIMPANDO LOCALIDADES
		*/
		if (this._selectLocalidades.length > 1) {
			const optionsLocalidades = document.querySelectorAll('#select-localidades option');
			optionsLocalidades.forEach(o => o.remove());
			const elementLocalidades = document.createElement("option");
			elementLocalidades.text = "Localidade:"
			elementLocalidades.value = "";
			this._selectLocalidades.add(elementLocalidades, null);
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
					this._selectLocalidades.add(element, null);
				})
			}
		}
		if (!event) this._selectLocalidades.value = this._atleta.localidade.id;
		this._selectLocalidades.disabled = false;
	}

	async enviarAtualizacao(event) {
		event.preventDefault();
		const response = await put('api/atletas', {
			id: this._atleta.id,
			nome: this._inputNome.value,
			biografia: this._textareaBiografia.value,
			nascimento: this._inputNascimento.value,
			categoria: Array.from(this._radioCategoria).find(radio => radio.checked).value,
			localidade: {
				id: this._selectLocalidades.value,
			}
		})
		switch (response.status) {
			case 202:
				const atleta = await response.json()
				this._callbackHandler(atleta)
				this.fecharModal()
				break
			case 403:
				this._labelErro.textContent = "Acesso negado"
				break
			case 500:
				response.json().then(value => this._labelErro.textContent = value.mensagem)
				break
		}

	}


}