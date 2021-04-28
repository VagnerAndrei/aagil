package net.circle.business;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;

import net.circle.business.interfaces.IPicoBusiness;
import net.circle.domain.dao.PicoDAO;
import net.circle.domain.dao.TagDAO;
import net.circle.domain.entity.Endereco;
import net.circle.domain.entity.Pico;
import net.circle.domain.entity.Tag;

@Named
public class PicoBusiness implements IPicoBusiness {

	@Inject
	private PicoDAO dao;

	@Inject
	private TagDAO tagDAO;

	public void delete(Integer id) throws Exception {
		// TODO Auto-generated method stub

	}

	public Pico salvar(Pico model) throws Exception {
		Pico pico = new Pico();
		pico.setTitulo("nome");
		Tag t = new Tag();
		t.setNome("tag");
		Tag t2 = new Tag();
		t2.setNome("tag2");
		pico.getTags().add(t);
		pico.getTags().add(t2);
		for (Tag tag : pico.getTags()) {
			var tagEntity = tagDAO.findByKey("nome", tag.getNome());
			if (tagEntity != null)
				tag.setId(tagEntity.getId());
		}

		Endereco endereco = new Endereco();
		endereco.setBairro("bE");
		endereco.setCep("ceo");
		endereco.setEstado("estado");
		endereco.setLocalidade("localidade");
		endereco.setLogradouro("logradouro");

		pico.setEndereco(endereco);

		return dao.merge(pico);
	}

	public List<Pico> consultarLista() {
		// TODO Auto-generated method stub
		return null;
	}

	public Optional<Pico> consultar(Integer id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
