package net.circle.service.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class ManobraFullModel {

	@JsonInclude(value = Include.NON_NULL)
	private Integer id;
	private String nome;
	@JsonInclude(value = Include.NON_EMPTY)
	private String descricao;
	private ManobraTipoModel tipo;
	@JsonInclude(value = Include.NON_EMPTY)
	private List<ManobraComplementoModel> complementos;

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

	public ManobraTipoModel getTipo() {
		return tipo;
	}

	public void setTipo(ManobraTipoModel tipo) {
		this.tipo = tipo;
	}

	public List<ManobraComplementoModel> getComplementos() {
		return complementos;
	}

	public void setComplementos(List<ManobraComplementoModel> complementos) {
		this.complementos = complementos;
	}

}
