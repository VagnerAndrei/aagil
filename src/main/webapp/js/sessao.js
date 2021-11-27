import { verificaURL, applyRole, perfil } from './navegacao.js';
import { get } from './fetch.js';

// FIXME: export deve ser cons
export let atletaLogado;

export function logout() {
	get('api/usuarios/sair').then(() => {
		loginHandler(undefined, 'logoutEvent')
	}).catch(() => { })
}

export function getUser(event) {
	get('api/usuarios/autenticacao').then(response => {
		switch (response.status) {
			case 302:
				response.json().then(value => loginHandler(value, event))
				break
			case 404:
				loginHandler(undefined, event)
				break
			case 500:
				console.log("Ocorreu um erro no servidor")
				break
		}
	})
}

export async function isLogged(event) {
//	console.log('isLogged()')
	const response = await get('api/usuarios/autenticado')
	const value = await response.text()
	if (value !== 'false') {
		if (!atletaLogado) {
			getUser(event)
			return true
		}
		if (atletaLogado.usuario.email !== value) {
			getUser(event)
			return false
		}
		return true
	}
	else if (atletaLogado || event === 'onLoadEvent')
		loginHandler(undefined, event)
	return false
}

export function loginHandler(value, event) {
//	console.log('loginHandler', value, event)
	atletaLogado = value;

	document.getElementById('label-usuario-logado').textContent = atletaLogado ? `Bem-vindo, ${atletaLogado.nome}` : 'Bem-vindo.';

	if (atletaLogado) {
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

	switch (event) {
		case 'authEvent':
			perfil(event, atletaLogado.id)
			break
		case 'onLoadEvent':
			verificaURL()
			break
		case 'navigationEvent':
		case 'logoutEvent':
		case 'linkVerificationEvent':
			applyRole(atletaLogado ? 'User' : undefined)
	}
}

export function isAdmin() {
	return atletaLogado ? atletaLogado.usuario.perfis.includes('ADMIN') : false
}

export function isUser(){
	return atletaLogado ? atletaLogado.usuario.perfis.includes('USER') : false
}

export function userRoles(){
	return atletaLogado ? atletaLogado.usuario.perfis : [] 
}

export function getIdUser(){
	return atletaLogado ? atletaLogado.id : undefined
}

export const ROLES = { ADMIN : 'ADMIN' , USER: 'USER'}