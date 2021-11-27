package net.circle.business.exception.enums;

import java.util.Arrays;

import net.circle.business.exception.interfaces.INegocioExcecao;
import net.circle.service.api.PistaRest;

public enum PistaExcecao implements INegocioExcecao {

	LIMITE_DE_FOTOS_EXCEDIDO("InputFoto", "Este serviço tem limite de 10 fotos por pista"),
	FORMATO_INVALIDO("InputFoto", "Formato inválido. Formatos aceitos: " + Arrays.asList(PistaRest.fotoFormatos));

	private String campo;
	private String mensagem;

	private PistaExcecao(String campo, String mensagem) {
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
