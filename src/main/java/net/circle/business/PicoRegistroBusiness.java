package net.circle.business;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;

import net.circle.business.interfaces.IPicoRegistroBusiness;
import net.circle.domain.dao.AtletaDAO;
import net.circle.domain.dao.PicoDAO;
import net.circle.domain.dao.PicoRegistroDAO;
import net.circle.domain.dao.TagDAO;
import net.circle.domain.entity.Perfil;
import net.circle.domain.entity.PicoRegistro;
import net.circle.domain.entity.PicoRegistroStatus;
import net.circle.domain.entity.Tag;

@Named
public class PicoRegistroBusiness implements IPicoRegistroBusiness {

	@Inject
	private PicoDAO picoDAO;
	
	@Inject
	private PicoRegistroDAO picoRegistroDAO;
	
	@Inject
	private TagDAO tagDAO;

	@Inject
	private AtletaDAO atletaDAO;

	public void delete(Integer id) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public PicoRegistro salvar(PicoRegistro picoRegistro) throws Exception {
		picoRegistro.setAtleta(atletaDAO.findById(picoRegistro.getAtleta().getId()).get());

		if (picoRegistro.getPicoAtual() != null)
			picoRegistro.setPicoAtual(picoDAO.findById(picoRegistro.getPicoAtual().getId()).get());

		picoRegistro.setData(LocalDate.now());

		if (picoRegistro.getAtleta().getUsuario().getPerfis().contains(Perfil.ADMIN)) {
			picoRegistro.setStatus(PicoRegistroStatus.CRIADO);
			picoRegistro.getPicoNovo().setAtivo(true);
		} else {
			picoRegistro.setStatus(PicoRegistroStatus.PENDENTE);
			picoRegistro.getPicoNovo().setAtivo(false);
		}
		
		for (Tag tag : picoRegistro.getPicoNovo().getTags()) {
			var tagEntity = tagDAO.findByKey("nome", tag.getNome());
			if (tagEntity != null)
				tag.setId(tagEntity.getId());
		}
		
		return picoRegistroDAO.merge(picoRegistro);
		
	}

	@Override
	public List<PicoRegistro> consultarLista() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<PicoRegistro> consultar(Integer id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
