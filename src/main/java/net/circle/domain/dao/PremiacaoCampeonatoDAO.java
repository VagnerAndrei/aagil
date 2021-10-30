package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.entity.PremiacaoCampeonato;

public class PremiacaoCampeonatoDAO extends AbstractDAO<PremiacaoCampeonato>{

	@Override
	public Class<PremiacaoCampeonato> getClassImplement() {
		return PremiacaoCampeonato.class;
	}

}
