package net.circle.business;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;

import net.circle.business.interfaces.IManobraBusiness;
import net.circle.domain.dao.ManobraComplementoDAO;
import net.circle.domain.dao.ManobraDAO;
import net.circle.domain.dao.ManobraTipoDAO;
import net.circle.domain.entity.Manobra;
import net.circle.domain.entity.ManobraComplemento;
import net.circle.domain.entity.ManobraTipo;

@Named
public class ManobraBusiness implements IManobraBusiness {

	@Inject
	private ManobraDAO dao;

	@Inject
	private ManobraTipoDAO daoManobraTipo;

	@Inject
	private ManobraComplementoDAO daoManobraComplemento;

	@Override
	public List<Manobra> consultarLista() {
		return dao.findAll();
	}

	@Override
	public List<ManobraTipo> consultarTipos() {
		return daoManobraTipo.findAll();
	}

	@Override
	public List<ManobraComplemento> consultarComplementos() {
		return daoManobraComplemento.findAll();
	}

	@Override
	public Optional<Manobra> consultar(Integer id) throws Exception {
		return null;
	}

}
