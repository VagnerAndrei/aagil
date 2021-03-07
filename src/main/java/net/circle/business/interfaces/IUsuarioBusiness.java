package net.circle.business.interfaces;

import net.circle.business.exception.BusinessException;
import net.circle.domain.entity.Usuario;

public interface IUsuarioBusiness {
	
	Usuario login(String email, String senha) throws BusinessException;
	Boolean exist(String email);
}
