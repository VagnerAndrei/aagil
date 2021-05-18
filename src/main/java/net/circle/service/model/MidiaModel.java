package net.circle.service.model;

public class MidiaModel {

	private String codigo;

	private String tipo;
	
	public MidiaModel() {
	}

	public MidiaModel(String codigo, String tipo) {
		this.codigo = codigo;
		this.tipo = tipo;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

}
