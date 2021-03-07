import { verificaLogin, logout } from "./controller/ContaController.js"
import { verificaURL, registrar, acessar, home, sobre, perfil } from './controller/NavegacaoController.js';

document.getElementById('botao-registrar').addEventListener('click', registrar);
document.getElementById('botao-acessar').addEventListener('click', acessar);
document.getElementById('botao-home').addEventListener('click', home);
document.getElementById('botao-perfil').addEventListener('click', perfil);
document.getElementById('botao-sobre').addEventListener('click', sobre);
document.getElementById('botao-logout').addEventListener('click', logout);

verificaLogin();

window.onpopstate = () => {
	verificaURL();
}

