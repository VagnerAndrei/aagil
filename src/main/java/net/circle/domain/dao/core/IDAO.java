package net.circle.domain.dao.core;

import java.util.List;
import java.util.Optional;

import net.circle.domain.entity.core.AbstractEntity;

public interface IDAO<T extends AbstractEntity> {

	Optional<T> findById(Object id) throws Exception;

	List<T> findAll() throws Exception;

	List<T> findByProperty(String propertyName, final Object value, final int... rowStartIdxAndCount);

	List<T> findByPropertys(List<String> propertyNames, final List<Object> values, final int... rowStartIdxAndCount);
	
	T findByKey(String nome, String valor) throws Exception;

	T findByKey(String nome, Number valor) throws Exception;

	T merge(T obj) throws Exception;

	void persist(T obj) throws Exception;

	void remove(T obj) throws Exception;

}
