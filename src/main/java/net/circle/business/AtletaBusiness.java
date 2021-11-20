package net.circle.business;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;
import javax.sql.rowset.serial.SerialBlob;

import net.circle.business.exception.AtletaBusinessException;
import net.circle.business.exception.UsuarioBusinessException;
import net.circle.business.exception.enums.AtletaExcecao;
import net.circle.business.exception.enums.UsuarioExcecao;
import net.circle.business.interfaces.IAtletaBusiness;
import net.circle.business.util.Encriptador;
import net.circle.business.util.ImagemUtil;
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
	public Atleta salvar(Atleta atleta) throws Exception {

		if (atleta.getUsuario() != null) {
			if (usuarioDAO.exist(atleta.getUsuario().getEmail()))
				throw new UsuarioBusinessException(UsuarioExcecao.EMAIL_JA_CADASTRADO);
		atleta.getUsuario().getPerfis().add(Perfil.USER);
		atleta.getUsuario().setSenha(Encriptador.MD5(atleta.getUsuario().getSenha()));
		}
		
		return dao.merge(atleta);
	}

	@Override
	public Atleta atualizar(Atleta atleta) throws Exception {
		var entity = dao.findById(atleta.getId()).get();

		entity.setNome(atleta.getNome());
		entity.setApelido(atleta.getApelido());
		entity.setBiografia(atleta.getBiografia());
		entity.setNascimento(atleta.getNascimento());
		entity.setLocalidade(
				atleta.getLocalidade() != null ? localidadeDAO.findById(atleta.getLocalidade().getId()).get() : null);
		entity.setCategoria(atleta.getCategoria());

		return dao.merge(entity);
	}

	@Override
	public List<Atleta> consultarLista() {
		return dao.findAll("nome ASC");
	}

	@Override
	public Optional<Atleta> consultar(Integer id) throws Exception {
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
	public Atleta findByKey(String key, Number valor) throws Exception {
		return dao.findByKey(key, valor);
	}

	@Override
	public Atleta foto(Integer id, byte[] foto, String extensao) throws Exception {
		var atleta = dao.findById(id).get();
		if (atleta.getFoto() == null)
			atleta.setFoto(new Foto());
		atleta.getFoto().setOriginal(new SerialBlob(foto));
		atleta.getFoto().setArquivo(new SerialBlob(ImagemUtil.getTratamentoJPG(foto)));
		atleta.getFoto().setThumbnail(new SerialBlob(
				ImagemUtil.getThumbnailFromJPG(atleta.getFoto().getArquivo().getBinaryStream().readAllBytes())));
		atleta.getFoto().setExtensao(extensao);
		return dao.merge(atleta);
	}

	public void apagarFoto(Integer idAtleta) throws Exception {
		var atleta = dao.findById(idAtleta).get();
		if (atleta.getFoto() == null)
			throw new AtletaBusinessException(AtletaExcecao.FOTO_NAO_EXISTE);
		atleta.setFoto(null);
		dao.merge(atleta);
	}

	@Override
	public String consultarUsuario(Integer idAtleta) throws Exception {
		return dao.findById(idAtleta).orElseThrow().getUsuario().getEmail();
	}

	@Override
	public List<Atleta> consultarPagina(int... rowStartIdxAndCount) {
		return dao.findByPropertyNullable("usuario", "IS NOT NULL", "nome ASC", rowStartIdxAndCount);
	}

	@Override
	public int count() {
		return dao.consultarCount();
	}

}
