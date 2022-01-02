package net.circle.business;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;

import net.circle.business.interfaces.IPostagemBusiness;
import net.circle.domain.dao.AtletaDAO;
import net.circle.domain.dao.FotoDAO;
import net.circle.domain.dao.PostagemDAO;
import net.circle.domain.dao.TagDAO;
import net.circle.domain.entity.Foto;
import net.circle.domain.entity.Postagem;
import net.circle.domain.entity.Tag;

@Named
public class PostagemBusiness implements IPostagemBusiness {

	@Inject
	private PostagemDAO dao;

	@Inject
	private TagDAO tagDAO;

	@Inject
	private FotoDAO fotoDAO;

	@Inject
	private AtletaDAO atletaDAO;

	@Override
	public void delete(Integer id) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public Postagem salvar(Postagem model) throws Exception {
		var entity = model.getId() != null ? dao.findById(model.getId()).get() : model;
		entity.setAtleta(atletaDAO.findById(model.getAtleta().getId()).get());

		entity.setTags(model.getTags());
		for (Tag tag : entity.getTags()) {
			var tagEntity = tagDAO.findByKey("nome", tag.getNome());
			if (tagEntity != null)
				tag.setId(tagEntity.getId());
		}

		entity.setFotos(model.getFotos());
		for (Foto foto : entity.getFotos())
			if (foto.getId() != null)
				entity.getFotos().set(entity.getFotos().indexOf(foto), fotoDAO.findById(foto.getId()).get());

		model.setData(LocalDateTime.now());
		return dao.merge(model);
	}

	@Override
	public List<Postagem> consultarLista() {
		return dao.consultarPagina("data DESC", 0, 10);
	}

	@Override
	public Optional<Postagem> consultar(Integer id) throws Exception {
		return dao.findById(id);
	}

}
