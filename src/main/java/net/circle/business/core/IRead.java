package net.circle.business.core;

import java.util.List;
import java.util.Optional;

public interface IRead<T> {

	List<T> consultarLista();

	Optional<T> consultar(Integer id) throws Exception;
	
}
