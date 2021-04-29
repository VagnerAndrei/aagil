package net.circle.business.interfaces;

import java.util.List;

import net.circle.business.core.IReadSaveDelete;
import net.circle.domain.entity.Atleta;

public interface IAtletaBusiness extends IReadSaveDelete<Atleta> {

	Atleta findByKey(String key, String valor) throws Exception;
	
	Atleta findByKey(String key, Number valor) throws Exception;

	Atleta atualizar(Atleta atleta) throws Exception;

	String consultarUsuario(Integer idAtleta) throws Exception;

	Atleta foto(Integer idAtleta, byte[] foto, String extensao) throws Exception;

	void apagarFoto(Integer idAtleta) throws Exception;

	List<Atleta> consultarPagina(final int... rowStartIdxAndCount);
	
	int count();
}
