package net.circle.business.interfaces;

import java.util.List;

import net.circle.business.core.IRead;
import net.circle.domain.entity.Pista;

public interface IPistaBusiness extends IRead<Pista>{
	
	List<Pista> consultarPagina(final int... rowStartIdxAndCount);
	
	int count();
}
