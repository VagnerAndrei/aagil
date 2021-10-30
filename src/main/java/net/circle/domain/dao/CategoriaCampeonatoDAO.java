package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.entity.CategoriaCampeonato;

public class CategoriaCampeonatoDAO extends AbstractDAO<CategoriaCampeonato> {

	@Override
	public Class<CategoriaCampeonato> getClassImplement() {
		return CategoriaCampeonato.class;
	}

}
