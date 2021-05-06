package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.entity.Foto;

public class FotoDAO extends AbstractDAO<Foto>{

	@Override
	public Class<Foto> getClassImplement() {
		return Foto.class;
	}

}
