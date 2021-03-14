package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.dao.core.IDAO;
import net.circle.domain.entity.ManobraComplemento;

public class ManobraComplementoDAO extends AbstractDAO<ManobraComplemento> implements IDAO<ManobraComplemento> {

	@Override
	public Class<ManobraComplemento> getClassImplement() {
		return ManobraComplemento.class;
	}

}
