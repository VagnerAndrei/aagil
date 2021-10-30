package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.entity.InscricaoCampeonato;

public class InscricaoCampeonatoDAO extends AbstractDAO<InscricaoCampeonato> {

	@Override
	public Class<InscricaoCampeonato> getClassImplement() {
		return InscricaoCampeonato.class;
	}

}
