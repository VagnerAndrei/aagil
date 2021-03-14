package net.circle.service.model;

import java.util.List;

public class ManobrasModel {

	private List<ManobraTipoModel> tipos;

	private List<ManobraComplementoModel> complementos;

	private List<ManobraModel> manobras;

	public List<ManobraTipoModel> getTipos() {
		return tipos;
	}

	public void setTipos(List<ManobraTipoModel> tipos) {
		this.tipos = tipos;
	}

	public List<ManobraModel> getManobras() {
		return manobras;
	}

	public void setManobras(List<ManobraModel> manobras) {
		this.manobras = manobras;
	}

	public List<ManobraComplementoModel> getComplementos() {
		return complementos;
	}

	public void setComplementos(List<ManobraComplementoModel> complementos) {
		this.complementos = complementos;
	}

}
