package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.entity.Campeonato;

public class CampeonatoDAO extends AbstractDAO<Campeonato> {

	@Override
	public Class<Campeonato> getClassImplement() {
		return Campeonato.class;
	}

}
