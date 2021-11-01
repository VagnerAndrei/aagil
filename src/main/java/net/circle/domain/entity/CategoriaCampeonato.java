package net.circle.domain.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import net.circle.domain.entity.core.AbstractEntity;

@Entity(name = "categoria_campeonato")
public class CategoriaCampeonato extends AbstractEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(length = 100, nullable = false)
	private String nome;

	@Column(length = 255)
	private String descricao;

	@Column(nullable = false)
	private Integer voltas;

	@Column(nullable = false)
	private Integer podium;

	@Column(name = "valor_inscricao")
	private Float valorInscricao;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name="categoria_campeonato_id", referencedColumnName = "id", nullable = false)
	private List<PremiacaoCampeonato> premiacoes = new ArrayList<PremiacaoCampeonato>();

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name="categoria_campeonato_id", referencedColumnName = "id", nullable = false)
	private List<InscricaoCampeonato> inscricoes = new ArrayList<InscricaoCampeonato>();

	@Column(name = "permitir_inscricoes")
	private Boolean permitirInscricoes;

	@Column(name = "exibir_inscricoes")
	private Boolean exibirInscricoes;

	@Column(name = "exibir_classificacao")
	private Boolean exibirClassificacao;

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

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Integer getVoltas() {
		return voltas;
	}

	public void setVoltas(Integer voltas) {
		this.voltas = voltas;
	}

	public Integer getPodium() {
		return podium;
	}

	public void setPodium(Integer podium) {
		this.podium = podium;
	}

	public List<PremiacaoCampeonato> getPremiacoes() {
		return premiacoes;
	}

	public void setPremiacoes(List<PremiacaoCampeonato> premiacoes) {
		this.premiacoes = premiacoes;
	}

	public Float getValorInscricao() {
		return valorInscricao;
	}

	public void setValorInscricao(Float valorInscricao) {
		this.valorInscricao = valorInscricao;
	}

	public List<InscricaoCampeonato> getInscricoes() {
		return inscricoes;
	}

	public void setInscricoes(List<InscricaoCampeonato> inscricoes) {
		this.inscricoes = inscricoes;
	}

	public Boolean getPermitirInscricoes() {
		return permitirInscricoes;
	}

	public void setPermitirInscricoes(Boolean permitirInscricoes) {
		this.permitirInscricoes = permitirInscricoes;
	}

	public Boolean getExibirInscricoes() {
		return exibirInscricoes;
	}

	public void setExibirInscricoes(Boolean exibirInscricoes) {
		this.exibirInscricoes = exibirInscricoes;
	}

	public Boolean getExibirClassificacao() {
		return exibirClassificacao;
	}

	public void setExibirClassificacao(Boolean exibirClassificacao) {
		this.exibirClassificacao = exibirClassificacao;
	}

}
