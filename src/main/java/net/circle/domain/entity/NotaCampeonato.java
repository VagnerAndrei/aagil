package net.circle.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import net.circle.domain.entity.core.AbstractEntity;

@Entity(name = "nota_campeonato")
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"inscricao_id", "volta", "arbitro_id"}))
public class NotaCampeonato extends AbstractEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(nullable = false)
	private InscricaoCampeonato inscricao;
	
	@Column(nullable = false)
	private Integer volta;
	
	@ManyToOne
	@JoinColumn(nullable = false)
	private Atleta arbitro;
	
	@Column(nullable = false)
	private Float nota;

}
