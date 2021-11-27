package net.circle.business;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;

import net.circle.business.interfaces.IPistaRegistroBusiness;
import net.circle.domain.dao.AtletaDAO;
import net.circle.domain.dao.PistaDAO;
import net.circle.domain.dao.PistaRegistroDAO;
import net.circle.domain.dao.TagDAO;
import net.circle.domain.entity.Perfil;
import net.circle.domain.entity.PistaRegistro;
import net.circle.domain.entity.PistaRegistroStatus;
import net.circle.domain.entity.Tag;

@Named
public class PistaRegistroBusiness implements IPistaRegistroBusiness {

	@Inject
	private PistaDAO pistaDAO;
	
	@Inject
	private PistaRegistroDAO pistaRegistroDAO;
	
	@Inject
	private TagDAO tagDAO;

	@Inject
	private AtletaDAO atletaDAO;

	public void delete(Integer id) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public PistaRegistro salvar(PistaRegistro pistaRegistro) throws Exception {
		pistaRegistro.setAtleta(atletaDAO.findById(pistaRegistro.getAtleta().getId()).get());

		if (pistaRegistro.getPistaAtual() != null)
			pistaRegistro.setPistaAtual(pistaDAO.findById(pistaRegistro.getPistaAtual().getId()).get());

		pistaRegistro.setData(LocalDate.now());

		if (pistaRegistro.getAtleta().getUsuario().getPerfis().contains(Perfil.ADMIN)) {
			pistaRegistro.setStatus(PistaRegistroStatus.CRIADO);
			pistaRegistro.getPistaNova().setAtivo(true);
		} else {
			pistaRegistro.setStatus(PistaRegistroStatus.PENDENTE);
			pistaRegistro.getPistaNova().setAtivo(false);
		}
		
		for (Tag tag : pistaRegistro.getPistaNova().getTags()) {
			var tagEntity = tagDAO.findByKey("nome", tag.getNome());
			if (tagEntity != null)
				tag.setId(tagEntity.getId());
		}
		
		return pistaRegistroDAO.merge(pistaRegistro);
		
	}

	@Override
	public List<PistaRegistro> consultarLista() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<PistaRegistro> consultar(Integer id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
