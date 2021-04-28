package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.entity.Pico;

public class PicoDAO extends AbstractDAO<Pico>{

	@Override
	public Class<Pico> getClassImplement() {
		return Pico.class;
	}

}
