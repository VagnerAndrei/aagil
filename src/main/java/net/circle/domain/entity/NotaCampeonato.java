package net.circle.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import net.circle.domain.entity.core.AbstractEntity;

@Entity(name = "nota_campeonato")
public class NotaCampeonato extends AbstractEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private Integer volta;

	@ManyToOne
	@JoinColumn(nullable = false)
	private Atleta arbitro;

	@Column(nullable = false)
	private Float nota;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(nullable = false, name = "inscricao_campeonato_id")
	private InscricaoCampeonato inscricao;

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

	public Atleta getArbitro() {
		return arbitro;
	}

	public void setArbitro(Atleta arbitro) {
		this.arbitro = arbitro;
	}

	public Float getNota() {
		return nota;
	}

	public void setNota(Float nota) {
		this.nota = nota;
	}

	public InscricaoCampeonato getInscricao() {
		return inscricao;
	}

	public void setInscricao(InscricaoCampeonato inscricao) {
		this.inscricao = inscricao;
	}
	
}
