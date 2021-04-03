/**
 * 
 */
import { View } from '../components/View.js'
import { post } from '../fetch.js'
import { loginHandler } from '../sessao.js'

export class Acesso extends View {

	constructor() {
		super('Acesso')
		this._labelErroEmail = document.querySelector('#label-erro-email')
		this._labelErroSenha = document.querySelector('#label-erro-senha')

		this._inputEmail = document.querySelector('#input-email')
		this._inputSenha = document.querySelector('#input-senha')
		this._checkManterDados = document.querySelector('#check-manter-dados')

		this._imgLoading = document.querySelector('#img-loading');
		this._buttonAcessar = document.querySelector('#button-acessar')

		if (localStorage.getItem('email') != null) {
			this._inputEmail.value = localStorage.getItem('email');
			this._inputSenha.value = localStorage.getItem('senha');
		}

		document.querySelector('form').addEventListener('submit', event => this.acessar(event));
	}
	
	template(){
		return `
			<div>
				<h1>Acesso</h1>
				<div class="conta">
					<small>ou</small><small> crie sua conta</small>
				</div>
		
				<form>
					<div class="form-group">
						<label id="label-erro-email" for="Email" class="mensagem-erro"></label> <input
							id="input-email" type="email" required="required"
							placeholder="Email">
					</div>
					<div class="form-group">
						<label id="label-erro-senha" for="Senha"  class="mensagem-erro"></label> <input
							id="input-senha" type="password" required="required"
							placeholder="Senha">
					</div>
					<label class="checkbox-inline"><input type="checkbox" checked="checked"
						id="check-manter-dados">Lembrar meus dados</label>
					<button type="submit" id="button-acessar">Acessar</button>
				</form>
				<img id="img-loading" class="loading display-none" src="assets/img/loading.gif">
			</div>		
		`
	}

	disabled(boolean) {
		[this._buttonAcessar, this._inputEmail, this._inputSenha, this._checkManterDados].map(item => item.disabled = boolean)
		if (boolean) this._imgLoading.classList.remove('display-none')
		else this._imgLoading.classList.add('display-none')
	}

	acessar(event) {
		event.preventDefault();
		const messages = [this._labelErroEmail, this._labelErroSenha]
		messages.map(campo => campo.textContent = '')

		if (!messages.some(message => message.textContent !== '')) {
			this.disabled(true);

			post('api/usuarios/autenticacao', {
				email: this._inputEmail.value,
				senha: this._inputSenha.value
			})
				.then((response) => {
					response.json().then(value => {
						if (response.status == 202) {
							loginHandler(value, 'authEvent')
						}
						else
							messages.find(message => message.htmlFor == value.campo ? value.campo : "Email").textContent = value.mensagem
					})
					this.disabled(false);
					if (this._checkManterDados.checked) {
						localStorage.setItem('email', this._inputEmail.value)
						localStorage.setItem('senha', this._inputSenha.value)
					} else {
						localStorage.clear()
					}
				})
				.catch(() => this.disabled(false)
				);
		}


	}
}