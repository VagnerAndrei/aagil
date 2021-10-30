package net.circle.domain.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import net.circle.domain.entity.core.AbstractEntity;

@Entity(name = "inscricao_campeonato")
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"categoria_id", "atleta_id"}))
public class InscricaoCampeonato extends AbstractEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(nullable = false)
	private Atleta atleta;
	
	@ManyToOne
	@JoinColumn(nullable = false)
	private CategoriaCampeonato categoria;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<NotaCampeonato> notas = new ArrayList<NotaCampeonato>();
	
	@Enumerated(EnumType.STRING)
	@Column(name = "status_pagamento")
	private StatusPagamento statusPagamento;
	

}
