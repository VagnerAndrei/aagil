package net.circle.service.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class InscricaoCampeonatoModel {

	private Integer id;

	private AtletaModel atleta;

	@JsonInclude(value = Include.NON_EMPTY)
	private List<NotaCampeonatoModel> notas = new ArrayList<NotaCampeonatoModel>();

	private String statusPagamento;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public AtletaModel getAtleta() {
		return atleta;
	}

	public void setAtleta(AtletaModel atleta) {
		this.atleta = atleta;
	}

	public List<NotaCampeonatoModel> getNotas() {
		return notas;
	}

	public void setNotas(List<NotaCampeonatoModel> notas) {
		this.notas = notas;
	}

	public String getStatusPagamento() {
		return statusPagamento;
	}

	public void setStatusPagamento(String statusPagamento) {
		this.statusPagamento = statusPagamento;
	}

}
