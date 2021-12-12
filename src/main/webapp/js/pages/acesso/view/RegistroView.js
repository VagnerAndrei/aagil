/**
 * 
 */
import { View2 } from '../../../components/View2.js'
import { acessar } from '../../../navegacao.js'

export class RegistroView extends View2 {

    constructor() {
        super({ titulo: 'Registro' })

        this._registrarFn = {}
    }

    _init() {
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

        this._linkAcesso = document.querySelector('#link-acesso')
        this._messages = [this._labelErroNome, this._labelErroEmail, this._labelErroSenha, this._labelErroConfereSenha]
        this._scroll(350)
        this._configureForm()
        this._configureLinkAcesso()
    }

    _update() {
        super._update({ html: this._template() })
    }

    _template() {
        return `
		<div>
			<h1>Registre-se</h1>
			<div class="conta">
			<small>ou </small><small id="link-acesso" class="link">acesse sua conta</small>
			</div>
	
			<form class="form-acesso" autocomplete="off">
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

    configureRegistrar(command) {
        this._registrarFn = command
    }

    _configureForm() {
        document.querySelector('form').addEventListener('submit', event => this._registrar(event));
    }

    _configureLinkAcesso() {
        this._linkAcesso.addEventListener('click', event => acessar(event))
    }

    _registrar(event) {
        event.preventDefault();

        this._messages.forEach(label => label.textContent = '')

        if (this._inputNome.value.length > 100) this._labelErroNome.textContent = 'Máximo de 100 caracteres';
        if (this._inputEmail.value.length > 100) this._labelErroEmail.textContent = 'Máximo de 100 caracteres';
        if (this._inputSenha.value.length > 20) this._labelErroSenha.textContent = 'Máximo de 20 caracteres';
        if (this._inputSenha.value !== this._inputConfereSenha.value) this._labelErroConfereSenha.textContent = 'Senha não confere';

        if (!this._messages.some(message => message.textContent !== '')) {
            this._disabled(true);

            this._registrarFn({
                nome: this._inputNome.value,
                usuario: {
                    email: this._inputEmail.value,
                    senha: this._inputSenha.value
                }
            })
        }
    }

    setErroRegistro(json) {
        this._messages.find(message => message.htmlFor == (json.campo ? json.campo : 'Email')).textContent = json.mensagem
        this._disabled(false);
    }

    _disabled(boolean) {
        [this._buttonRegistrar, this._inputNome, this._inputEmail, this._inputSenha, this._inputConfereSenha].map(item => item.disabled = boolean)
        if (boolean) this._imgLoading.classList.remove('display-none')
        else this._imgLoading.classList.add('display-none')
    }


}