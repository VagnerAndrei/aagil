package net.circle.business;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;

import net.circle.business.interfaces.IManobraBusiness;
import net.circle.domain.dao.ManobraDAO;
import net.circle.domain.entity.Manobra;

@Named
public class ManobraBusiness implements IManobraBusiness {

	@Inject
	private ManobraDAO dao;

	@Override
	public List<Manobra> consultarLista() {
		return dao.findAll();
	}

	@Override
	public Optional<Manobra> consultar(Integer id) throws Exception {
		return null;
	}

}
