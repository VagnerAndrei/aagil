package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.entity.PistaRegistro;

public class PistaRegistroDAO extends AbstractDAO<PistaRegistro>{

	@Override
	public Class<PistaRegistro> getClassImplement() {
		return PistaRegistro.class;
	}

}
