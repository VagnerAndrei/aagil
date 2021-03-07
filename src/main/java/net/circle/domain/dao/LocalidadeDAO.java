package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.dao.core.IDAO;
import net.circle.domain.entity.Localidade;

public class LocalidadeDAO extends AbstractDAO<Localidade> implements IDAO<Localidade> {

	@Override
	public Class<Localidade> getClassImplement() {
		return Localidade.class;
	}

}
