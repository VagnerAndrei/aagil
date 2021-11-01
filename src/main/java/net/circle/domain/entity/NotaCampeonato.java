package net.circle.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
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

	public Integer getId() {
		return id;
	}

	public Integer getVolta() {
		return volta;
	}

	public Atleta getArbitro() {
		return arbitro;
	}

	public Float getNota() {
		return nota;
	}

}
