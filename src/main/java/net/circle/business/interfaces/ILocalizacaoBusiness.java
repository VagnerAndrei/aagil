package net.circle.business.interfaces;

import java.util.List;

import net.circle.domain.entity.Estado;
import net.circle.domain.entity.Localidade;

public interface ILocalizacaoBusiness  {

	List<Estado> listarEstados();
	List<Localidade> listarLocalidadesPorEstado(Integer idEstado);
	
}
