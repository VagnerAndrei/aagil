/**
 * 
 */
import { View } from './../../../components/custom/View.js'
import { registrar } from './../../../navegacao.js'

export class AcessoView extends View {

	constructor({ onViewCreatedFn }) {
		super({ titulo: 'Acesso', onViewCreatedFn })
		this._acessarFn = {}
	}

	_init() {
		this._labelErroEmail = document.querySelector('#label-erro-email')
		this._labelErroSenha = document.querySelector('#label-erro-senha')

		this._inputEmail = document.querySelector('#input-email')
		this._inputSenha = document.querySelector('#input-senha')
		this._checkManterDados = document.querySelector('#check-manter-dados')

		this._imgLoading = document.querySelector('#img-loading');
		this._buttonAcessar = document.querySelector('#button-acessar')
		this._linkRegistro = document.querySelector('#link-registro')

		this._messages = [this._labelErroEmail, this._labelErroSenha]
		this._scroll(350)
		this._configureForm()
		this._configureLinkRegistro()
	}

	async _update() {
		super._update({ html: await this._template() })
	}

	async _template() {
		return `
             <div>
                 <h1>Acesso</h1>
                 <div class="conta">
                     <small>ou </small><small id="link-registro" class="link">crie sua conta</small>
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

	setUsuarioLocalStorage({ email, senha }) {
		this._inputEmail.value = email
		this._inputSenha.value = senha
	}

	setErroAcesso(erro) {
		this._messages.find(message => message.htmlFor == (erro.campo ? erro.campo : "Email")).textContent = erro.mensagem
		this._disabled(false);
	}

	configureAcessar(command) {
		this._acessarFn = command
	}

	_configureForm() {
		document.querySelector('form').addEventListener('submit', event => this._acessar(event));

	}

	_configureLinkRegistro() {
		this._linkRegistro.addEventListener('click', event => registrar(event))
	}

	_disabled(boolean) {
		[this._buttonAcessar, this._inputEmail, this._inputSenha, this._checkManterDados].map(item => item.disabled = boolean)
		if (boolean) this._imgLoading.classList.remove('display-none')
		else this._imgLoading.classList.add('display-none')
	}

	_acessar(event) {
		event.preventDefault();

		this._messages.forEach(campo => campo.textContent = '')

		this._disabled(true);

		this._acessarFn({
			email: this._inputEmail.value,
			senha: this._inputSenha.value
		}, this._checkManterDados.checked)
	}

}