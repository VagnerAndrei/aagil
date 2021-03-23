package net.circle.business.exception.enums;

import net.circle.business.exception.interfaces.INegocioExcecao;

public enum UsuarioExcecao implements INegocioExcecao {

	EMAIL_JA_CADASTRADO("Email", "Email já cadastrado"), EMAIL_NAO_ENCONTRADO("Email", "Email não encontrado"),
	SENHA_INVALIDA("Senha", "Senha inválida"), EXISTE_UM_EMAIL_AUTENTICADO("Email", "Já existe um email autenticado")
	;

	private String campo;
	private String mensagem;

	private UsuarioExcecao(String campo, String mensagem) {
		this.campo = campo;
		this.mensagem = mensagem;
	}

	public String toString() {
		return campo != null ? campo + " : " + mensagem : mensagem;
	}

	public String getCampo() {
		return this.campo;
	}

	public String getMensagem() {
		return this.mensagem;
	}

}
