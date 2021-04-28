package net.circle.domain.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import net.circle.domain.entity.core.AbstractEntity;

@Entity
public class PicoRegistro extends AbstractEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "pico_atual_id")
	private Pico picoAtual;

	@ManyToOne
	@JoinColumn(name = "pico_novo_id")
	private Pico picoNovo;

	private LocalDate dataRegistro;

	@ManyToOne
	private Atleta atleta;

	@Enumerated(EnumType.STRING)
	private PicoRegistroStatus status;

	private String observacoes;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Pico getPicoAtual() {
		return picoAtual;
	}

	public void setPicoAtual(Pico picoAtual) {
		this.picoAtual = picoAtual;
	}

	public Pico getPicoNovo() {
		return picoNovo;
	}

	public void setPicoNovo(Pico picoNovo) {
		this.picoNovo = picoNovo;
	}

	public LocalDate getDataRegistro() {
		return dataRegistro;
	}

	public void setDataRegistro(LocalDate dataRegistro) {
		this.dataRegistro = dataRegistro;
	}

	public Atleta getAtleta() {
		return atleta;
	}

	public void setAtleta(Atleta atleta) {
		this.atleta = atleta;
	}

	public PicoRegistroStatus getStatus() {
		return status;
	}

	public void setStatus(PicoRegistroStatus status) {
		this.status = status;
	}

	public String getObservacoes() {
		return observacoes;
	}

	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}

}