package net.circle.service.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import net.circle.business.exception.interfaces.INegocioExcecao;

public class ErroModel {

	@JsonInclude(value = Include.NON_NULL)
	private String campo;
	private String mensagem;

	public ErroModel(String campo, String mensagem) {
		super();
		this.campo = campo;
		this.mensagem = mensagem;
	}
	
	public ErroModel(INegocioExcecao excecao) {
		super();
		this.campo = excecao.getCampo();
		this.mensagem = excecao.getMensagem();
	}

	public String getCampo() {
		return campo;
	}

	public void setCampo(String campo) {
		this.campo = campo;
	}

	public String getMensagem() {
		return mensagem;
	}

	public void setMensagem(String mensagem) {
		this.mensagem = mensagem;
	}

}
