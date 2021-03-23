package net.circle.service.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class EstadoModel {

	private Integer id;

	@JsonInclude(value = Include.NON_EMPTY)
	private String nome;

	@JsonInclude(value = Include.NON_EMPTY)
	private String sigla;
	
	public EstadoModel(Integer id, String sigla) {
		super();
		this.id = id;
		this.sigla = sigla;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSigla() {
		return sigla;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

}
