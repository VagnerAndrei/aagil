package net.circle.business.exception.enums;

import net.circle.business.exception.interfaces.INegocioExcecao;

public enum NegocioExcecao implements INegocioExcecao {
	
	OCORREU_UM_ERRO_NO_SERVIDOR("Ocorreu um erro no servidor, contate um administrador.");
	
	private String mensagem;
	private String campo;

	private NegocioExcecao(String mensagem) {
		this.mensagem = mensagem;
	}
	
	private NegocioExcecao(String campo, String mensagem) {
		this.mensagem = mensagem;
		this.campo = campo;
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
