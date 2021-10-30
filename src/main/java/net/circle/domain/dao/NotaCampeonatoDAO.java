package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.entity.NotaCampeonato;

public class NotaCampeonatoDAO extends AbstractDAO<NotaCampeonato> {

	@Override
	public Class<NotaCampeonato> getClassImplement() {
		return NotaCampeonato.class;
	}

}
