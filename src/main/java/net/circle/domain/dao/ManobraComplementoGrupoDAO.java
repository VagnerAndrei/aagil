package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.dao.core.IDAO;
import net.circle.domain.entity.ManobraComplementoGrupo;

public class ManobraComplementoGrupoDAO extends AbstractDAO<ManobraComplementoGrupo> implements IDAO<ManobraComplementoGrupo> {

	@Override
	public Class<ManobraComplementoGrupo> getClassImplement() {
		return ManobraComplementoGrupo.class;
	}

}