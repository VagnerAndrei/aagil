package net.circle.service.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

@JsonInclude(value = Include.NON_EMPTY)
public class PostagemModel {

	private Integer id;

	private String titulo;

	private String conteudo;

	private MidiaModel midia;

	private List<IDModel> fotos = new ArrayList<IDModel>();

	private List<String> tags = new ArrayList<String>();
	
	@JsonFormat(shape = Shape.STRING, pattern = "dd/MM/yyyy HH:mm")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime data;
	
	private IDModel atleta;

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

	public String getConteudo() {
		return conteudo;
	}

	public void setConteudo(String conteudo) {
		this.conteudo = conteudo;
	}

	public MidiaModel getMidia() {
		return midia;
	}

	public void setMidia(MidiaModel midia) {
		this.midia = midia;
	}

	public List<IDModel> getFotos() {
		return fotos;
	}

	public void setFotos(List<IDModel> fotos) {
		this.fotos = fotos;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}
	
	public LocalDateTime getData() {
		return data;
	}

	public void setData(LocalDateTime data) {
		this.data = data;
	}

	public IDModel getAtleta() {
		return atleta;
	}

	public void setAtleta(IDModel atleta) {
		this.atleta = atleta;
	}
	
}