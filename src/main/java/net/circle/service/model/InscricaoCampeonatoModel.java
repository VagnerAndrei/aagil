package net.circle.service.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

public class InscricaoCampeonatoModel {

	private Integer id;

	private AtletaModel atleta;

	@JsonInclude(value = Include.NON_EMPTY)
	private List<NotaCampeonatoModel> notas = new ArrayList<NotaCampeonatoModel>();
	
	@JsonFormat(shape = Shape.STRING, pattern = "MM/dd/yyyy HH:mm:ss")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime data;

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

	public LocalDateTime getData() {
		return data;
	}

	public void setData(LocalDateTime data) {
		this.data = data;
	}

}
