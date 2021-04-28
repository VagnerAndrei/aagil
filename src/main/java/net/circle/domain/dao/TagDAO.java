package net.circle.domain.dao;

import net.circle.domain.dao.core.AbstractDAO;
import net.circle.domain.entity.Tag;

public class TagDAO extends AbstractDAO<Tag> {

	@Override
	public Class<Tag> getClassImplement() {
		return Tag.class;
	}

}
