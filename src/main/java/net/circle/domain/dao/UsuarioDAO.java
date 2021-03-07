package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.dao.core.IDAO;
import net.circle.domain.entity.Usuario;

public class UsuarioDAO extends AbstractDAO<Usuario> implements IDAO<Usuario>{

	@Override
	public Class<Usuario> getClassImplement() {
		return Usuario.class;
	}

}
