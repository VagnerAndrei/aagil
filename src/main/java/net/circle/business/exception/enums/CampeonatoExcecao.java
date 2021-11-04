package net.circle.business.exception.enums;

import java.util.Arrays;

import net.circle.business.exception.interfaces.INegocioExcecao;
import net.circle.service.util.InputPartUtil;

public enum CampeonatoExcecao implements INegocioExcecao {

	FORMATO_REGULAMENTO_INVALIDO("InputRegulamento",
			"Formato de regulamento inválido. Formato aceito: PDF"),
	VARIOS_REGULAMENTOS_ENVIADOS("InputRegulamento", "Este serviço aceita upload de uma regulamento apenas"),
	FORMATO_MIDIA_INVALIDO("InputMidiaDivugacao",
			"Formato de mídia de divulgação inválido. Formatos aceitos: " + Arrays.asList(InputPartUtil.fotoFormatos)),
	ATLETA_JA_INSCRITO("Atleta/Categoria",	"Atleta já inscrito nesta categoria"),
	FORMATO_FOTO_INVALIDO("InputFoto",
			"Formato de foto inválido. Formatos aceitos: " + Arrays.asList(InputPartUtil.fotoFormatos));

	private String campo;
	private String mensagem;

	private CampeonatoExcecao(String campo, String mensagem) {
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
