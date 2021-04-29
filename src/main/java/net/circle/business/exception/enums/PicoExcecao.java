package net.circle.business.exception.enums;

import java.util.Arrays;

import net.circle.business.exception.interfaces.INegocioExcecao;
import net.circle.service.api.PicoRest;

public enum PicoExcecao implements INegocioExcecao {

	FORMATO_INVALIDO("InputFoto", "Formato inválido. Formatos aceitos: " + Arrays.asList(PicoRest.fotoFormatos));

	private String campo;
	private String mensagem;

	private PicoExcecao(String campo, String mensagem) {
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
