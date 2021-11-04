package net.circle.service.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

@JsonInclude(value = Include.NON_NULL)
public class CampeonatoModel {

	public CampeonatoModel() {
	}

	public CampeonatoModel(Integer id, String titulo) {
		super();
		this.id = id;
		this.titulo = titulo;
	}

	private Integer id;

	private String titulo;

	private String descricao;

	private PicoModel pico;

	@JsonFormat(shape = Shape.STRING, pattern = "MM/dd/yyyy HH:mm:ss")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	private LocalDateTime data;

	@JsonInclude(value = Include.NON_EMPTY)
	private List<CategoriaCampeonatoModel> categorias = new ArrayList<CategoriaCampeonatoModel>();

	@JsonInclude(value = Include.NON_EMPTY)
	private List<AtletaModel> arbitros = new ArrayList<AtletaModel>();

	@JsonInclude(value = Include.NON_EMPTY)
	private List<IDModel> midiasDivulgacao = new ArrayList<IDModel>();

	@JsonInclude(value = Include.NON_EMPTY)
	private List<IDModel> fotos = new ArrayList<IDModel>();

	@JsonInclude(value = Include.NON_NULL)
	private Boolean regulamento;

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

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public PicoModel getPico() {
		return pico;
	}

	public void setPico(PicoModel pico) {
		this.pico = pico;
	}

	public LocalDateTime getData() {
		return data;
	}

	public void setData(LocalDateTime data) {
		this.data = data;
	}

	public List<CategoriaCampeonatoModel> getCategorias() {
		return categorias;
	}

	public void setCategorias(List<CategoriaCampeonatoModel> categorias) {
		this.categorias = categorias;
	}

	public List<AtletaModel> getArbitros() {
		return arbitros;
	}

	public void setArbitros(List<AtletaModel> arbitros) {
		this.arbitros = arbitros;
	}

	public List<IDModel> getMidiasDivulgacao() {
		return midiasDivulgacao;
	}

	public void setMidiasDivulgacao(List<IDModel> midiasDivulgacao) {
		this.midiasDivulgacao = midiasDivulgacao;
	}

	public List<IDModel> getFotos() {
		return fotos;
	}

	public void setFotos(List<IDModel> fotos) {
		this.fotos = fotos;
	}

	public Boolean getRegulamento() {
		return regulamento;
	}

	public void setRegulamento(Boolean regulamento) {
		this.regulamento = regulamento;
	}

}
