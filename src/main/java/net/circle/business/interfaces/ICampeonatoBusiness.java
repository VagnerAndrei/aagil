package net.circle.business.interfaces;

import net.circle.business.core.IReadSave;
import net.circle.domain.entity.Campeonato;
import net.circle.domain.entity.NotaCampeonato;

public interface ICampeonatoBusiness extends IReadSave<Campeonato>{
	
	void setPermitirInscricoes(Boolean permitir, Integer categoriaId) throws Exception ;
	void setExibirInscricoes(Boolean exibir, Integer categoriaId) throws Exception ;
	void setExibirClassificacao(Boolean exibir, Integer categoriaId) throws Exception ;
	NotaCampeonato setNota(NotaCampeonato nota, Integer idInscricao) throws Exception;
	void setInscricao(Integer idCategoria, Integer idAtleta) throws Exception;
	void deleteInscricao(Integer idInscricao)throws Exception;
	
}
