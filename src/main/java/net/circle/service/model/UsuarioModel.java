package net.circle.service.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(value = Include.NON_NULL)
public class UsuarioModel {

	private String email;
	private String perfil;
	
	public UsuarioModel(String email) {
		super();
		this.email = email;
	}
	
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
