package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.entity.Postagem;

public class PostagemDAO extends AbstractDAO<Postagem> {

	@Override
	public Class<Postagem> getClassImplement() {
		return Postagem.class;
	}

}
