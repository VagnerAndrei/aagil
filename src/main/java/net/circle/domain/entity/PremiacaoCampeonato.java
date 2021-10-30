package net.circle.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import net.circle.domain.entity.core.AbstractEntity;

@Entity(name = "premiacao_campeonato")
public class PremiacaoCampeonato extends AbstractEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private Integer colocacao;

	@Column(length = 255, nullable = false)
	private String premiacao;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getColocacao() {
		return colocacao;
	}

	public void setColocacao(Integer colocacao) {
		this.colocacao = colocacao;
	}

	public String getPremiacao() {
		return premiacao;
	}

	public void setPremiacao(String premiacao) {
		this.premiacao = premiacao;
	}

}
