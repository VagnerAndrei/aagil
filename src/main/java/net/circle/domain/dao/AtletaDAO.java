package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.entity.Atleta;

public class AtletaDAO extends AbstractDAO<Atleta>  {

	@Override
	public Class<Atleta> getClassImplement() {
		return Atleta.class;
	}

}
