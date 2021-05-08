package net.circle.business;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;

import net.circle.business.interfaces.IFotoBusiness;
import net.circle.domain.dao.FotoDAO;
import net.circle.domain.entity.Foto;

@Named
public class FotoBusiness implements IFotoBusiness{
	
	@Inject
	private FotoDAO fotoDAO;



	@Override
	public List<Foto> consultarLista() {
		return null;
	}


	@Override
	public Optional<Foto> consultar(Integer id) throws Exception {
		return fotoDAO.findById(id);
	}
	
	 public  byte[] getThumb(Integer id) {
		 return fotoDAO.getThumb(id);
	 }


	public byte[] getFoto(Integer id) {
		return fotoDAO.getFoto(id);
	}


	
}
