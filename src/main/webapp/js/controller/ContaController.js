import { post, get, verificaURL, home } from './NavegacaoController.js';

export let usuarioLogado;

export function registro() {
	const messages = [
		document.getElementById('erro-nome'),
		document.getElementById('erro-email'),
		document.getElementById('erro-senha'),
		document.getElementById('erro-confere-senha'),
	]

	const inputs = [
		document.getElementById('input-nome'),
		document.getElementById('input-email'),
		document.getElementById('input-senha'),
		document.getElementById('input-confere-senha')
	]
	const loading = document.getElementById('loading');
	const botao = document.getElementById('botao-form-registrar')

	const disableds = [
		botao, inputs[0], inputs[1], inputs[2], inputs[3]
	];

	function disabled(boolean) {
		disableds.map(item => item.disabled = boolean)
		if (boolean) {
			loading.classList.remove('display-none')
		} else {
			loading.classList.add('display-none')
		}
	}

	document.querySelector('form').addEventListener('submit', (event) => {
		event.preventDefault();
		messages.map(campo => campo.textContent = '');

		if (inputs[0].value.length > 100)
			messages[0].textContent = 'Máximo de 100 caracteres';
		if (inputs[1].value.length > 100)
			messages[1].textContent = 'Máximo de 100 caracteres';
		if (inputs[2].value.length > 20)
			messages[2].textContent = 'Máximo de 20 caracteres';
		if (inputs[2].value !== inputs[3].value)
			messages[3].textContent = 'Senha não confere';


		if (!messages.some(message => message.textContent !== '')) {
			disabled(true);

			post('api/usuarios', {
				nome: inputs[0].value,
				usuario: {
					email: inputs[1].value,
					senha: inputs[2].value
				}
			}
			).then((response) => {
				response.json().then(value => {
					if (response.ok) {
						loginHandler(value, true)
					} else
						messages.find(message => message.htmlFor == value.campo).textContent = value.mensagem
				})
				disabled(false);
			}).catch(() => {
				disabled(false);
			});
		}

	});

}

export function logout() {
	get('api/usuarios/sair').then(() => {
		loginHandler()
	}).catch(() => { })
}

export function verificaLogin() {
	get('api/usuarios/autenticacao').then((response) => {
		if (response.status == 302)
			response.json().then(value => loginHandler(value))
		else if (response.status == 404 || response.status == 500)
			loginHandler()
	})
}


export function acesso() {
	const messages = [
		document.getElementById('erro-email'),
		document.getElementById('erro-senha'),
	]

	const inputs = [
		document.getElementById('input-email'),
		document.getElementById('input-senha'),
		document.getElementById('check-manter-dados'),
	]

	const loading = document.getElementById('loading');
	const botao = document.getElementById('botao-form-acessar')

	const disableds = [
		botao, inputs[0], inputs[1], inputs[2]
	];

	if (localStorage.getItem('email') != null) {
		inputs[0].value = localStorage.getItem('email');
		inputs[1].value = localStorage.getItem('senha');
	}

	function disabled(boolean) {
		disableds.map(item => item.disabled = boolean)
		if (boolean) {
			loading.classList.remove('display-none')
		} else {
			loading.classList.add('display-none')
		}
	}

	document.querySelector('form').addEventListener('submit', (event) => {
		event.preventDefault();
		messages.map(campo => campo.textContent = '');

		if (inputs[0].value.length > 100)
			messages[0].textContent = 'Máximo de 100 caracteres';
		if (inputs[1].value.length > 20)
			messages[1].textContent = 'Máximo de 20 caracteres';


		if (!messages.some(message => message.textContent !== '')) {
			disabled(true);

			post('api/usuarios/autenticacao', {
				email: inputs[0].value,
				senha: inputs[1].value
			})
				.then((response) => {
					console.log(response)
					response.json().then(value => {
						if (response.status == 202) {
							loginHandler(value, true)
						}
						else
							messages.find(message => message.htmlFor == value.campo ? value.campo : "Email").textContent = value.mensagem
					})
					disabled(false);
					if (inputs[2].checked) {
						localStorage.setItem('email', inputs[0].value)
						localStorage.setItem('senha', inputs[1].value)
					} else {
						localStorage.clear()
					}
				})
				.catch((erro) => {
					disabled(false);
				});
		}

	});

}

function loginHandler(value, redirect) {
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