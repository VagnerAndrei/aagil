package net.circle.business;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;

import net.circle.business.interfaces.IPostagemBusiness;
import net.circle.domain.dao.AtletaDAO;
import net.circle.domain.dao.PostagemDAO;
import net.circle.domain.dao.TagDAO;
import net.circle.domain.entity.Postagem;
import net.circle.domain.entity.Tag;

@Named
public class PostagemBusiness implements IPostagemBusiness {

	@Inject
	private PostagemDAO dao;

	@Inject
	private TagDAO tagDAO;

	@Inject
	private AtletaDAO atletaDAO;

	@Override
	public void delete(Integer id) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public Postagem salvar(Postagem postagem) throws Exception {
		postagem.setAtleta(atletaDAO.findById(postagem.getAtleta().getId()).get());
		for (Tag tag : postagem.getTags()) {
			var tagEntity = tagDAO.findByKey("nome", tag.getNome());
			if (tagEntity != null)
				tag.setId(tagEntity.getId());
		}
		postagem.setData(LocalDateTime.now());
		return dao.merge(postagem);
	}

	@Override
	public List<Postagem> consultarLista() {
		return dao.findAll();
	}

	@Override
	public Optional<Postagem> consultar(Integer id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
