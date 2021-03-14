package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.dao.core.IDAO;
import net.circle.domain.entity.ManobraTipo;

public class ManobraTipoDAO extends AbstractDAO<ManobraTipo> implements IDAO<ManobraTipo> {

	@Override
	public Class<ManobraTipo> getClassImplement() {
		return ManobraTipo.class;
	}

}
