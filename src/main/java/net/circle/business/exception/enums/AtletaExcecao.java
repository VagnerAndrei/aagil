package net.circle.business.exception.enums;

import java.util.Arrays;

import net.circle.business.exception.interfaces.INegocioExcecao;
import net.circle.service.api.AtletaRest;

public enum AtletaExcecao implements INegocioExcecao {

	VARIOS_ARQUIVOS_ENVIADOS("InputFoto", "Este serviço aceita upload de uma imagem apenas"),
	FORMATO_INVALIDO("InputFoto", "Formato inválido. Formatos aceitos: " + Arrays.asList(AtletaRest.fotoFormatos)),
	FOTO_NAO_ENCONTRADA_NO_FORMULARIO("InputFoto", "Não foi encontrado uma foto no formulário"),
	FOTO_NAO_EXISTE("Foto", "Este usuário não possui foto");

	private String campo;
	private String mensagem;

	private AtletaExcecao(String campo, String mensagem) {
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
