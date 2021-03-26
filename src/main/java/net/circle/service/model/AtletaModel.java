package net.circle.service.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

@JsonInclude(value = Include.NON_NULL)
public class AtletaModel extends AbstractModel{

	private Integer id;
	private String nome;
	private String biografia;

	@JsonFormat(shape = Shape.STRING, pattern = "yyyy-MM-dd")
	@JsonSerialize(using = LocalDateSerializer.class)
	private LocalDate nascimento;

	private LocalidadeModel localidade;
	private String categoria;

	public AtletaModel(Integer id, String nome) {
		super();
		this.id = id;
		this.nome = nome;
	}

	public AtletaModel(Integer id, String nome, String biografia,LocalDate nascimento, LocalidadeModel localidade, String categoria) {
		super();
		this.id = id;
		this.nome = nome;
		this.biografia = biografia;
		this.nascimento = nascimento;
		this.localidade = localidade;
		this.categoria = categoria;
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
	
	public String getBiografia() {
		return biografia;
	}

	public void setBiografia(String biografia) {
		this.biografia = biografia;
	}

	public LocalDate getNascimento() {
		return nascimento;
	}

	public void setNascimento(LocalDate nascimento) {
		this.nascimento = nascimento;
	}

	public LocalidadeModel getLocalidade() {
		return localidade;
	}

	public void setLocalidade(LocalidadeModel localidade) {
		this.localidade = localidade;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

}
