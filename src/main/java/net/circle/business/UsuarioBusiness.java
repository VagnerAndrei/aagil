package net.circle.business;

import javax.inject.Inject;
import javax.inject.Named;

import net.circle.business.exception.BusinessException;
import net.circle.business.interfaces.IUsuarioBusiness;
import net.circle.domain.dao.UsuarioDAO;
import net.circle.domain.entity.Usuario;

@Named
public class UsuarioBusiness implements IUsuarioBusiness {

	@Inject
	private UsuarioDAO dao;

	@Override
	public Usuario login(String email, String senha) throws BusinessException {
		try {
			return dao.findById(email).get();
		} catch (Exception e) {
			throw (BusinessException) e;
		}
	}
	
	public Boolean exist(String email){
		return dao.exist(email);
	}

}
