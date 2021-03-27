package net.circle.service.model;

import java.util.List;

public class PaginacaoModel {

	private List<AbstractModel> pagina;
	private int total;

	public PaginacaoModel() {
	}

	public List<AbstractModel> getPagina() {
		return pagina;
	}

	public void setPagina(List<AbstractModel> pagina) {
		this.pagina = pagina;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

}
