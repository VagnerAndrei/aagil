package net.circle.service.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class CategoriaCampeonatoModel {

	private Integer id;

	private String nome;

	private String descricao;

	private Integer voltas;

	private Integer podium;

	private Float valorInscricao;

	@JsonInclude(value = Include.NON_EMPTY)
	private List<PremiacaoCampeonatoModel> premiacoes = new ArrayList<PremiacaoCampeonatoModel>();

	@JsonInclude(value = Include.NON_EMPTY)
	private List<InscricaoCampeonatoModel> inscricoes = new ArrayList<InscricaoCampeonatoModel>();

	private Boolean permitirInscricoes;

	private Boolean exibirInscricoes;

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

	public List<PremiacaoCampeonatoModel> getPremiacoes() {
		return premiacoes;
	}

	public void setPremiacoes(List<PremiacaoCampeonatoModel> premiacoes) {
		this.premiacoes = premiacoes;
	}

	public Float getValorInscricao() {
		return valorInscricao;
	}

	public void setValorInscricao(Float valorInscricao) {
		this.valorInscricao = valorInscricao;
	}

	public List<InscricaoCampeonatoModel> getInscricoes() {
		return inscricoes;
	}

	public void setInscricoes(List<InscricaoCampeonatoModel> inscricoes) {
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
