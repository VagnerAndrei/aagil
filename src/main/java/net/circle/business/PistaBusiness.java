package net.circle.business;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;

import net.circle.business.interfaces.IPistaBusiness;
import net.circle.domain.dao.PistaDAO;
import net.circle.domain.entity.Pista;

@Named
public class PistaBusiness implements IPistaBusiness {

	@Inject
	private PistaDAO pistaDAO;

	@Override
	public List<Pista> consultarLista() {
		return pistaDAO.findByProperty("ativo", true, "titulo");
	}

	@Override
	public Optional<Pista> consultar(Integer id) throws Exception {
		return null;
	}

	@Override
	public List<Pista> consultarPagina(int... rowStartIdxAndCount) {
		return pistaDAO.findByProperty("ativo", true, "titulo", rowStartIdxAndCount);
	}

	@Override
	public int count() {
		return pistaDAO.consultarCount("ativo", true);
	}

}
