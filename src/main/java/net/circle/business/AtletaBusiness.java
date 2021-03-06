package net.circle.business;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;

import net.circle.business.exception.BusinessException;
import net.circle.business.exception.BusinessException.Excecao;
import net.circle.business.interfaces.IAtletaBusiness;
import net.circle.business.util.Encriptador;
import net.circle.domain.dao.AtletaDAO;
import net.circle.domain.dao.LocalidadeDAO;
import net.circle.domain.dao.UsuarioDAO;
import net.circle.domain.entity.Atleta;
import net.circle.domain.entity.Foto;
import net.circle.domain.entity.Perfil;

@Named
public class AtletaBusiness implements IAtletaBusiness {

	@Inject
	private AtletaDAO dao;

	@Inject
	private LocalidadeDAO localidadeDAO;

	@Inject
	private UsuarioDAO usuarioDAO;

	@Override
	public Atleta salvar(Atleta atleta) throws BusinessException, Exception {
		if (usuarioDAO.exist(atleta.getUsuario().getEmail()))
			throw new BusinessException(Excecao.EMAIL_JA_CADASTRADO);
		atleta.getUsuario().setPerfil(Perfil.USER);
		atleta.getUsuario().setSenha(Encriptador.MD5(atleta.getUsuario().getSenha()));
		return dao.merge(atleta);
	}

	@Override
	public Atleta atualizar(Atleta atleta) throws Exception {
		var entity = dao.findById(atleta.getId()).get();

		entity.setNome(atleta.getNome());
		entity.setNascimento(atleta.getNascimento());
		entity.setLocalidade(
				atleta.getLocalidade() != null ? localidadeDAO.findById(atleta.getLocalidade().getId()).get() : null);
		entity.setCategoria(atleta.getCategoria());

		return dao.merge(entity);
	}

	@Override
	public List<Atleta> consultarLista() throws Exception {
		return dao.findAll();
	}

	@Override
	public Optional<Atleta> consultar(Integer id) {
		return dao.findById(id);
	}

	@Override
	public void delete(Integer id) throws Exception {
		dao.remove(dao.findById(id).get());
	}

	@Override
	public Atleta findByKey(String key, String valor) throws Exception {
		return dao.findByKey(key, valor);
	}

	@Override
	public void foto(Integer id, byte[] foto, String extensao) throws Exception {
		var atleta = dao.findById(id).get();
		if (atleta.getFoto() == null)
			atleta.setFoto(new Foto());
		atleta.getFoto().setArquivo(foto);
		atleta.getFoto().setExtensao(extensao.toLowerCase());
		dao.merge(atleta);
	}

	public void apagarFoto(Integer idAtleta) throws Exception {
		var atleta = dao.findById(idAtleta).get();
		if (atleta.getFoto() == null)
			throw new BusinessException(Excecao.FOTO_NAO_EXISTE);
		atleta.setFoto(null);
		dao.merge(atleta);
	}

	@Override
	public String consultarUsuario(Integer idAtleta) throws Exception {
		return dao.findById(idAtleta).orElseThrow().getUsuario().getEmail();
	}

}
