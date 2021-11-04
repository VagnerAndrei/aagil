package net.circle.service.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(value = Include.NON_NULL)
public class UsuarioModel {

	private String email;
	private Set<String> perfis;

	public UsuarioModel() {
	}

	public UsuarioModel(String email, Set<String> perfis) {
		this.email = email;
		this.perfis = perfis;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<String> getPerfis() {
		return perfis;
	}

	public void setPerfis(Set<String> perfis) {
		this.perfis = perfis;
	}

}
