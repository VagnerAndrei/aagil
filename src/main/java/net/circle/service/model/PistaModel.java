package net.circle.service.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class PistaModel extends AbstractModel {
	
	private Integer id;

	private String titulo;

	@JsonInclude(value = Include.NON_NULL)
	private EnderecoModel endereco;

	@JsonInclude(value = Include.NON_EMPTY)
	private List<String> tags = new ArrayList<String>();
	
	@JsonInclude(value = Include.NON_EMPTY)
	private List<IDModel> fotos = new ArrayList<IDModel>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public EnderecoModel getEndereco() {
		return endereco;
	}

	public void setEndereco(EnderecoModel endereco) {
		this.endereco = endereco;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	public List<IDModel> getFotos() {
		return fotos;
	}

	public void setFotos(List<IDModel> fotos) {
		this.fotos = fotos;
	}

}
