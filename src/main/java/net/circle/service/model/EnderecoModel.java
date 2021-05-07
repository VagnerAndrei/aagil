package net.circle.service.model;

public class EnderecoModel {

	private String cep;

	private String uf;

	private String localidade;

	private String bairro;

	private String logradouro;

	private String complemento;

	private String perimetro;

	private String referencia;

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getUF() {
		return uf;
	}

	public void setUF(String uf) {
		this.uf = uf;
	}

	public String getLocalidade() {
		return localidade;
	}

	public void setLocalidade(String localidade) {
		this.localidade = localidade;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public String getPerimetro() {
		return perimetro;
	}

	public void setPerimetro(String perimetro) {
		this.perimetro = perimetro;
	}

	public String getReferencia() {
		return referencia;
	}

	public void setReferencia(String referencia) {
		this.referencia = referencia;
	}

}
