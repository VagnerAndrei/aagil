package net.circle.business;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import net.circle.business.interfaces.ILocalizacaoBusiness;
import net.circle.domain.dao.EstadoDAO;
import net.circle.domain.dao.LocalidadeDAO;
import net.circle.domain.entity.Estado;
import net.circle.domain.entity.Localidade;

@Named
public class LocalizacaoBusiness implements ILocalizacaoBusiness {

	@Inject
	private EstadoDAO estadoDAO;

	@Inject
	private LocalidadeDAO localidadeDAO;

	@Override
	public List<Estado> listarEstados() {
		return estadoDAO.findAll();
	}

	@Override
	public List<Localidade> listarLocalidadesPorEstado(Integer idEstado) {
		return localidadeDAO.findByProperty("estado.id", idEstado, null);
	}

}
