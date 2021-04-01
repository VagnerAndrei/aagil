import { verificaURL, home } from './navegacao.js';
import { get } from './fetch.js';

// FIXME: export deve ser cons
export let usuarioLogado;

export function logout() {
	get('api/usuarios/sair').then(() => {
		loginHandler()
	}).catch(() => { })
}

export function verificaLogin() {
	get('api/usuarios/autenticacao').then(response => {
		switch (response.status) {
			case 302:
				response.json().then(value => loginHandler(value))
				break
			case 404:
				console.log("Não há um usuário logado")
				loginHandler()
				break
			case 500:
				console.log("Ocorreu um erro no servidor")
				break
		}
	})
}

export function loginHandler(value, redirect) {
	usuarioLogado = value;
	document.getElementById('label-usuario-logado').textContent = usuarioLogado ? usuarioLogado.nome : 'Bem-vindo';
	if (usuarioLogado) {
		document.getElementById('botao-acessar').classList.add('display-none');
		document.getElementById('botao-registrar').classList.add('display-none');
		document.getElementById('botao-perfil').classList.remove('display-none');
		document.getElementById('botao-logout').classList.remove('display-none');
	}
	else {
		document.getElementById('botao-perfil').classList.add('display-none');
		document.getElementById('botao-logout').classList.add('display-none');
		document.getElementById('botao-acessar').classList.remove('display-none');
		document.getElementById('botao-registrar').classList.remove('display-none');
	}
	if (redirect)
		home('event');
	else
		verificaURL();
}

export function setUsuarioLogado(usuario){
	usuarioLogado = usuario
	document.getElementById('label-usuario-logado').textContent = usuarioLogado ? usuarioLogado.nome : 'Bem-vindo';
}