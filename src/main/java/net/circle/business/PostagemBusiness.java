package net.circle.business;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;

import net.circle.business.interfaces.IPostagemBusiness;
import net.circle.domain.dao.PostagemDAO;
import net.circle.domain.entity.Postagem;
import net.circle.domain.entity.Tag;

@Named
public class PostagemBusiness implements IPostagemBusiness{
	
	@Inject
	private PostagemDAO dao;

	@Override
	public void delete(Integer id) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Postagem salvar(Postagem model) throws Exception {
		Postagem postagem= new Postagem();
		Tag t = new Tag();
		t.setNome("tag");
		Tag t2 = new Tag();
		t2.setNome("tag2");
		postagem.getTags().add(t);
		postagem.getTags().add(t2);

		return dao.merge(postagem);
	}

	@Override
	public List<Postagem> consultarLista() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<Postagem> consultar(Integer id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
