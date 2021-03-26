package net.circle.service.model;

import java.util.List;

public class PaginacaoModel {

	private List<AbstractModel> pagina;
	private int contador;

	public PaginacaoModel() {
	}

	public List<AbstractModel> getPagina() {
		return pagina;
	}

	public void setPagina(List<AbstractModel> pagina) {
		this.pagina = pagina;
	}

	public int getContador() {
		return contador;
	}

	public void setContador(int contador) {
		this.contador = contador;
	}

}
