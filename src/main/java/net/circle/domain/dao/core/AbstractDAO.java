package net.circle.domain.dao.core;

import java.util.List;
import java.util.Optional;

import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import net.circle.domain.entity.core.AbstractEntity;

@Named
public abstract class AbstractDAO<T extends AbstractEntity> implements IDAO<T> {

	@PersistenceContext
	private EntityManager em;

	public abstract Class<T> getClassImplement();

	public String getName() {
		return getClassImplement().getName();
	}

	@Transactional
	public Optional<T> findById(Object id) {
		return Optional.ofNullable(em.find(getClassImplement(), id));
	}

	@SuppressWarnings("unchecked")
	public T findByKey(String nomeIdFK, Number idFK) throws Exception {
		try {
			return (T) em.createQuery("FROM " + getName() + " model where model." + nomeIdFK + " = " + idFK)
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	public T findByKey(String nomeIdFK, String idFK) throws Exception {
		try {
			return (T) em.createQuery("FROM " + getName() + " model where model." + nomeIdFK + " = '" + idFK + "'")
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	public List<T> consultarPagina(String orderBy, final int... rowStartIdxAndCount) {
		String queryString = "select model from " + getClassImplement().getName() + " model";

		if (orderBy != null)
			queryString += " ORDER BY " + orderBy;

		Query query = em.createQuery(queryString);

		if (rowStartIdxAndCount != null && rowStartIdxAndCount.length > 0) {
			int rowStartIdx = Math.max(0, rowStartIdxAndCount[0]);
			if (rowStartIdx > 0) {
				query.setFirstResult(rowStartIdx);
			}

			if (rowStartIdxAndCount.length > 1) {
				int rowCount = Math.max(0, rowStartIdxAndCount[1]);
				if (rowCount > 0) {
					query.setMaxResults(rowCount);
				}
			}
		}

		return query.getResultList();
	}

	/*
	 * @SuppressWarnings("unchecked") public List<T>
	 * findByParameterDTO(AbstractParam parametro) throws Exception { String
	 * queryString = "select model from " + getClassImplement().getName() +
	 * " model where "; queryString += parametro.getSQL();
	 * 
	 * Query query = em.createQuery(queryString);
	 * 
	 * return query.getResultList(); }
	 */

	@SuppressWarnings("unchecked")
	public List<T> findByProperty(String propertyName, final Object value, final int... rowStartIdxAndCount) {
		final String queryString = "select model from " + getName() + " model where model." + propertyName
				+ "= :propertyValue";
		Query query = em.createQuery(queryString);
		query.setParameter("propertyValue", value);
		if (rowStartIdxAndCount != null && rowStartIdxAndCount.length > 0) {
			int rowStartIdx = Math.max(0, rowStartIdxAndCount[0]);
			if (rowStartIdx > 0) {
				query.setFirstResult(rowStartIdx);
			}

			if (rowStartIdxAndCount.length > 1) {
				int rowCount = Math.max(0, rowStartIdxAndCount[1]);
				if (rowCount > 0) {
					query.setMaxResults(rowCount);
				}
			}
		}
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<T> findByPropertys(List<String> propertyNames, final List<Object> values,
			final int... rowStartIdxAndCount) {
		String queryString = "select model from " + getName() + " model";

		if (propertyNames.size() > 0)
			queryString += " where ";

		for (String string : propertyNames) {
			if (propertyNames.indexOf(string) > 0)
				queryString += " AND ";
			queryString += "model." + string + "= ";
			if (values.get(propertyNames.indexOf(string)) instanceof String)
				queryString += "'" + values.get(propertyNames.indexOf(string)) + "'";
			else
				queryString += values.get(propertyNames.indexOf(string));
		}

		Query query = em.createQuery(queryString);

		if (rowStartIdxAndCount != null && rowStartIdxAndCount.length > 0) {
			int rowStartIdx = Math.max(0, rowStartIdxAndCount[0]);
			if (rowStartIdx > 0) {
				query.setFirstResult(rowStartIdx);
			}

			if (rowStartIdxAndCount.length > 1) {
				int rowCount = Math.max(0, rowStartIdxAndCount[1]);
				if (rowCount > 0) {
					query.setMaxResults(rowCount);
				}
			}
		}
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<T> findAll() {
		return em.createQuery("FROM " + getName()).getResultList();
	}

	@Transactional
	public void persist(T obj) throws Exception {
		em.persist(obj);
	}

	@Transactional
	public T merge(T obj) throws Exception {
		return em.merge(obj);
	}

	public void remove(T obj) throws Exception {
		em.remove(obj);
	}

	public boolean exist(Object id) {
		return em.find(getClassImplement(), id) == null ? false : true;
	}

	public int consultarCount() {
		return ((Long) (em.createQuery("select count(model) from " + getClassImplement().getName() + " model")
				.getSingleResult())).intValue();

	}

}
