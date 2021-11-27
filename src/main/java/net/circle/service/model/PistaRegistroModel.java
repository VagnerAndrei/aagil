package net.circle.service.model;

public class PistaRegistroModel {
	
	private IDModel pistaAtual;

	private PistaModel pistaNovo;

	private IDModel atleta;

	private String observacoes;

	public IDModel getPistaAtual() {
		return pistaAtual;
	}

	public void setPistaAtual(IDModel pistaAtual) {
		this.pistaAtual = pistaAtual;
	}

	public PistaModel getPistaNovo() {
		return pistaNovo;
	}

	public void setPistaNovo(PistaModel pistaNovo) {
		this.pistaNovo = pistaNovo;
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
