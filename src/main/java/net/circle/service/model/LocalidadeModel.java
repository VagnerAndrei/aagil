package net.circle.service.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(value = Include.NON_NULL)
public class LocalidadeModel {

	private Integer id;
	private String nome;
	private Integer idUf;
	private String uf;

	public LocalidadeModel(Integer id, String nome) {
		super();
		this.id = id;
		this.nome = nome;
	}

	public LocalidadeModel(Integer id, String nome, Integer idUf, String uf) {
		super();
		this.id = id;
		this.nome = nome;
		this.idUf = idUf;
		this.uf = uf;
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

	public Integer getIdUf() {
		return idUf;
	}

	public void setIdUf(Integer idUf) {
		this.idUf = idUf;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

}
