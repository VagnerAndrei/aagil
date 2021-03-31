import { verificaLogin, logout } from "./sessao.js"
import { verificaURL, registrar, acessar, home, manobras, sobre, perfil, atletas } from './navegacao.js';

document.getElementById('botao-registrar').addEventListener('click', registrar);
document.getElementById('botao-acessar').addEventListener('click', acessar);
document.getElementById('botao-home').addEventListener('click', home);
document.getElementById('botao-manobras').addEventListener('click', manobras);
document.getElementById('botao-perfil').addEventListener('click', perfil);
document.getElementById('botao-atletas').addEventListener('click', atletas);
document.getElementById('botao-sobre').addEventListener('click', sobre);
document.getElementById('botao-logout').addEventListener('click', logout);

verificaLogin();

window.onpopstate = () => {
	verificaURL();
}

