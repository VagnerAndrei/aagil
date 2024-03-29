package net.circle.service.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class ManobraModel {

	@JsonInclude(value = Include.NON_NULL)
	private Integer id;
	private String nome;
	@JsonInclude(value = Include.NON_EMPTY)
	private String descricao;
	@JsonInclude(value = Include.NON_NULL)
	private IDModel tipo;
	@JsonInclude(value = Include.NON_EMPTY)
	private List<IDModel> complementos = new ArrayList<IDModel>();

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

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public IDModel getTipo() {
		return tipo;
	}

	public void setTipo(IDModel tipo) {
		this.tipo = tipo;
	}

	public List<IDModel> getComplementos() {
		return complementos;
	}

	public void setComplementos(List<IDModel> complementos) {
		this.complementos = complementos;
	}

}
