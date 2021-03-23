package net.circle.business;

import javax.inject.Inject;
import javax.inject.Named;

import net.circle.business.interfaces.IUsuarioBusiness;
import net.circle.domain.dao.UsuarioDAO;

@Named
public class UsuarioBusiness implements IUsuarioBusiness {

	@Inject
	private UsuarioDAO dao;

	public Boolean exist(String email){
		return dao.exist(email);
	}

}
