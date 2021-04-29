package net.circle.service.model;

public class PicoRegistroModel {
	
	private IDModel picoAtual;

	private PicoModel picoNovo;

	private IDModel atleta;

	private String observacoes;

	public IDModel getPicoAtual() {
		return picoAtual;
	}

	public void setPicoAtual(IDModel picoAtual) {
		this.picoAtual = picoAtual;
	}

	public PicoModel getPicoNovo() {
		return picoNovo;
	}

	public void setPicoNovo(PicoModel picoNovo) {
		this.picoNovo = picoNovo;
	}

	public IDModel getAtleta() {
		return atleta;
	}

	public void setAtleta(IDModel atleta) {
		this.atleta = atleta;
	}

	public String getObservacoes() {
		return observacoes;
	}

	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}
	
	

}
