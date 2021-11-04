package net.circle.service.model;

public class NotaCampeonatoModel {

	private Integer id;

	private Integer volta;

	private AtletaModel arbitro;

	private Float nota;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getVolta() {
		return volta;
	}

	public void setVolta(Integer volta) {
		this.volta = volta;
	}

	public AtletaModel getArbitro() {
		return arbitro;
	}

	public void setArbitro(AtletaModel arbitro) {
		this.arbitro = arbitro;
	}

	public Float getNota() {
		return nota;
	}

	public void setNota(Float nota) {
		this.nota = nota;
	}

}