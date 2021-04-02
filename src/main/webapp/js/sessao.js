import { verificaURL, home } from './navegacao.js';
import { get } from './fetch.js';

// FIXME: export deve ser cons
export let usuarioLogado;

export function logout() {
	get('api/usuarios/sair').then(() => {
		loginHandler(undefined, false, 'logoutEvent')
	}).catch(() => { })
}

export function getLogin(event) {
	get('api/usuarios/autenticacao').then(response => {
		switch (response.status) {
			case 202:
				response.json().then(value => loginHandler(value, false, event))
				break
			case 401:
				loginHandler(undefined, false, event)
				break
			case 500:
				console.log("Ocorreu um erro no servidor")
				break
		}
	})
}

export async function isLogged(onLoadEvent) {
	const response = await get('api/usuarios/autenticacao/boolean')
	const value = await response.json()
	if (value) getLogin(onLoadEvent ? undefined : 'onChangeNavigationEvent')
	else loginHandler(undefined, false, onLoadEvent ? undefined : 'onChangeNavigationEvent')
	return value
}

export function loginHandler(value, redirect, event) {
	usuarioLogado = value;
	document.getElementById('label-usuario-logado').textContent = usuarioLogado ? `Bem-vindo, ${usuarioLogado.nome}` : 'Bem-vindo.';
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
		home('onLoginEvent');
	else if (!event)
		verificaURL();
}

