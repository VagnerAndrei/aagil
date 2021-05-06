package net.circle.business.interfaces;

import java.util.List;

import net.circle.business.core.IRead;
import net.circle.domain.entity.Pico;

public interface IPicoBusiness extends IRead<Pico>{
	
	List<Pico> consultarPagina(final int... rowStartIdxAndCount);
	
	int count();
}
