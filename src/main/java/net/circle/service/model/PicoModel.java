package net.circle.service.model;

import java.util.ArrayList;
import java.util.List;

public class PicoModel {

	private String titulo;

	private EnderecoModel endereco;

	private List<String> tags = new ArrayList<String>();
	
	private List<IDModel> fotos = new ArrayList<IDModel>();

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
