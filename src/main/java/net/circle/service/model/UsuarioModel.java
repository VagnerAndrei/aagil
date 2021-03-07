package net.circle.service.model;

public class UsuarioModel {

	private String email;
	private String perfil;
	
	public UsuarioModel(String email, String perfil) {
		super();
		this.email = email;
		this.perfil = perfil;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPerfil() {
		return perfil;
	}

	public void setPerfil(String perfil) {
		this.perfil = perfil;
	}

}
