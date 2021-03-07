package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.dao.core.IDAO;
import net.circle.domain.entity.Manobra;

public class ManobraDAO extends AbstractDAO<Manobra> implements IDAO<Manobra> {

	@Override
	public Class<Manobra> getClassImplement() {
		return Manobra.class;
	}

}
