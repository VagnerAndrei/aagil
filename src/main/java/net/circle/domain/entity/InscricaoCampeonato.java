package net.circle.domain.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import net.circle.domain.entity.core.AbstractEntity;

@Entity(name = "inscricao_campeonato")
public class InscricaoCampeonato extends AbstractEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(nullable = false)
	private Atleta atleta;
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "inscricao", fetch = FetchType.LAZY)
	private List<NotaCampeonato> notas = new ArrayList<NotaCampeonato>();
	
	@Enumerated(EnumType.STRING)
	@Column(name = "status_pagamento")
	private StatusPagamento statusPagamento;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(nullable = false, name = "categoria_campeonato_id")
	private CategoriaCampeonato categoria;
	
	private LocalDateTime data; 

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Atleta getAtleta() {
		return atleta;
	}

	public void setAtleta(Atleta atleta) {
		this.atleta = atleta;
	}

	public List<NotaCampeonato> getNotas() {
		return notas;
	}

	public void setNotas(List<NotaCampeonato> notas) {
		this.notas = notas;
	}

	public StatusPagamento getStatusPagamento() {
		return statusPagamento;
	}

	public void setStatusPagamento(StatusPagamento statusPagamento) {
		this.statusPagamento = statusPagamento;
	}

	public CategoriaCampeonato getCategoria() {
		return categoria;
	}

	public void setCategoria(CategoriaCampeonato categoria) {
		this.categoria = categoria;
	}

	public LocalDateTime getData() {
		return data;
	}

	public void setData(LocalDateTime data) {
		this.data = data;
	}
	
}
