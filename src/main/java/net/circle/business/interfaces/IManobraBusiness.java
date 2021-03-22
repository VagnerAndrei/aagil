package net.circle.business.interfaces;

import java.util.List;

import net.circle.business.core.IRead;
import net.circle.domain.entity.Manobra;
import net.circle.domain.entity.ManobraComplemento;
import net.circle.domain.entity.ManobraComplementoGrupo;
import net.circle.domain.entity.ManobraTipo;

public interface IManobraBusiness extends IRead<Manobra>{
	
	List<ManobraTipo> consultarTipos();
	List<ManobraComplemento> consultarComplementos();
	List<ManobraComplementoGrupo> consultarGruposComplementos();

}
