/**
 * 
 */
import { View } from '../components/View.js'
import { post } from '../fetch.js'
import { loginHandler } from '../sessao.js'

export class Registro extends View {

	constructor() {
		super('Registro')

		this._labelErroNome = document.querySelector('#label-erro-nome')
		this._labelErroEmail = document.querySelector('#label-erro-email')
		this._labelErroSenha = document.querySelector('#label-erro-senha')
		this._labelErroConfereSenha = document.querySelector('#label-erro-confere-senha')


		this._inputNome = document.querySelector('#input-nome')
		this._inputEmail = document.querySelector('#input-email')
		this._inputSenha = document.querySelector('#input-senha')
		this._inputConfereSenha = document.querySelector('#input-confere-senha')

		this._imgLoading = document.querySelector('#img-loading');
		this._buttonRegistrar = document.querySelector('#button-registrar')

		document.querySelector('form').addEventListener('submit', event => this.registrar(event));

	}

	template() {
		return `
		<div>
			<h1>Registre-se</h1>
			<div class="conta">
			<small>ou</small><small> acesse sua conta</small>
			</div>
	
			<form autocomplete="off">
				<div class="form-group">
					<label id="label-erro-nome" for="Nome" class="mensagem-erro"></label> <input
						id="input-nome" type="text" required="required" placeholder="Nome">
				</div>
				<div  class="form-group">
					<label id="label-erro-email" for="Email" class="mensagem-erro"></label> <input id="input-email"
						type="email" required="required" placeholder="Email">
				</div>
				<div class="form-group">
					<label id="label-erro-senha" for="Senha" class="mensagem-erro"></label> <input
						id="input-senha" type="password" required="required"
						placeholder="Senha">
				</div>
				<div class="form-group">
					<label id="label-erro-confere-senha" class="mensagem-erro"></label> <input id="input-confere-senha" type="password"
						required="required" placeholder="Confere Senha">
				</div>
				<button type="submit" id="button-registrar">Registrar</button>
			</form>
			<img id="img-loading" class="loading  display-none" src="assets/img/loading.gif">
		</div>
		`
	}

	registrar(event) {
		event.preventDefault();

		const messages = [this._labelErroNome, this._labelErroEmail, this._labelErroSenha, this._labelErroConfereSenha]

		messages.map(label => label.textContent = '')

		if (this._inputNome.value.length > 100) this._labelErroNome.textContent = 'Máximo de 100 caracteres';
		if (this._inputEmail.value.length > 100) this._labelErroEmail.textContent = 'Máximo de 100 caracteres';
		if (this._inputSenha.value.length > 20) this._labelErroSenha.textContent = 'Máximo de 20 caracteres';
		if (this._inputSenha.value !== this._inputConfereSenha.value) this._labelErroConfereSenha.textContent = 'Senha não confere';


		if (!messages.some(message => message.textContent !== '')) {
			this.disabled(true);

			post('api/usuarios', {
				nome: this._inputNome.value,
				usuario: {
					email: this._inputEmail.value,
					senha: this._inputSenha.value
				}
			}).then(response => {
				response.json().then(json => {
					switch (response.status) {
						case 201:
							loginHandler(json, 'registroEvent')
							break
						case 409:
						case 500:
							messages.find(message => message.htmlFor === json.campo).textContent = json.mensagem
							break
					}
					this.disabled(false);
				})

			}).catch(() => this.disabled(false))
		}
	}

	disabled(boolean) {
		[this._buttonRegistrar, this._inputNome, this._inputEmail, this._inputSenha, this._inputConfereSenha].map(item => item.disabled = boolean)
		if (boolean) this._imgLoading.classList.remove('display-none')
		else this._imgLoading.classList.add('display-none')
	}


}