package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.entity.Pista;

public class PistaDAO extends AbstractDAO<Pista>{

	@Override
	public Class<Pista> getClassImplement() {
		return Pista.class;
	}

}
