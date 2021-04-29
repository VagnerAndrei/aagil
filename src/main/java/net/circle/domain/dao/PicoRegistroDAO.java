package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.entity.PicoRegistro;

public class PicoRegistroDAO extends AbstractDAO<PicoRegistro>{

	@Override
	public Class<PicoRegistro> getClassImplement() {
		return PicoRegistro.class;
	}

}
