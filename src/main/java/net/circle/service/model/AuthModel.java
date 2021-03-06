package net.circle.service.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class AuthModel {

	@NotBlank
	@Email
	private String email;

	@NotBlank
	private String senha;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

}
