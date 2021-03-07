package net.circle.business.interfaces;

import net.circle.business.core.IReadSaveDelete;
import net.circle.domain.entity.Atleta;

public interface IAtletaBusiness extends IReadSaveDelete<Atleta> {
	
	Atleta findByKey(String key, String valor) throws Exception;
	Atleta atualizar(Atleta atleta) throws Exception;
	String consultarUsuario(Integer idAtleta) throws Exception;
	void foto(Integer idAtleta, byte[] foto, String extensao) throws Exception;

}
