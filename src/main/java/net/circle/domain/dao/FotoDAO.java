package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.entity.Foto;

public class FotoDAO extends AbstractDAO<Foto> {

	@Override
	public Class<Foto> getClassImplement() {
		return Foto.class;
	}

	public byte[] getThumb(Integer id) {
		return (byte[]) em.createNativeQuery("select lo_get(thumbnail) from foto where id = " + id).getSingleResult();
	}
	
	public byte[] getFoto(Integer id) {
		return (byte[]) em.createNativeQuery("select lo_get(arquivo) from foto where id = " + id).getSingleResult();
	}

}
