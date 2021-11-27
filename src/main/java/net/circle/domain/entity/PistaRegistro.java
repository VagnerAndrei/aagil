package net.circle.domain.entity;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import net.circle.domain.entity.core.AbstractEntity;

@Entity
@Table(name = "pista_registro")
public class PistaRegistro extends AbstractEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "pista_atual_id")
	private Pista pistaAtual;

	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "pista_nova_id")
	private Pista pistaNova;

	private LocalDate data;

	@ManyToOne
	private Atleta atleta;

	@Enumerated(EnumType.STRING)
	private PistaRegistroStatus status;

	private String observacoes;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Pista getPistaAtual() {
		return pistaAtual;
	}

	public void setPistaAtual(Pista pistaAtual) {
		this.pistaAtual = pistaAtual;
	}

	public Pista getPistaNova() {
		return pistaNova;
	}

	public void setPistaNova(Pista pistaNovo) {
		this.pistaNova = pistaNovo;
	}

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	public Atleta getAtleta() {
		return atleta;
	}

	public void setAtleta(Atleta atleta) {
		this.atleta = atleta;
	}

	public PistaRegistroStatus getStatus() {
		return status;
	}

	public void setStatus(PistaRegistroStatus status) {
		this.status = status;
	}

	public String getObservacoes() {
		return observacoes;
	}

	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}

}
