package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.dao.core.IDAO;
import net.circle.domain.entity.Estado;

public class EstadoDAO extends AbstractDAO<Estado> implements IDAO<Estado> {

	@Override
	public Class<Estado> getClassImplement() {
		return Estado.class;
	}

}
