package net.circle.business;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;

import net.circle.business.interfaces.IPicoBusiness;
import net.circle.domain.dao.PicoDAO;
import net.circle.domain.entity.Pico;

@Named
public class PicoBusiness implements IPicoBusiness {

	@Inject
	private PicoDAO picoDAO;

	@Override
	public List<Pico> consultarLista() {
		return picoDAO.findByProperty("ativo", true);
	}

	@Override
	public Optional<Pico> consultar(Integer id) throws Exception {
		return null;
	}

}
