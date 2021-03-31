/**
 * 
 */
import { View } from '../components/View.js'
import { post } from '../fetch.js'
import { loginHandler } from '../sessao.js'

export class Acesso extends View {

	constructor() {
		super()
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
							loginHandler(value, true)
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