package net.circle.business;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;
import javax.transaction.Transactional;

import net.circle.business.interfaces.ICampeonatoBusiness;
import net.circle.domain.dao.AtletaDAO;
import net.circle.domain.dao.CampeonatoDAO;
import net.circle.domain.dao.CategoriaCampeonatoDAO;
import net.circle.domain.dao.FotoDAO;
import net.circle.domain.dao.InscricaoCampeonatoDAO;
import net.circle.domain.dao.NotaCampeonatoDAO;
import net.circle.domain.dao.PicoDAO;
import net.circle.domain.dao.PremiacaoCampeonatoDAO;
import net.circle.domain.entity.Atleta;
import net.circle.domain.entity.Campeonato;
import net.circle.domain.entity.CategoriaCampeonato;
import net.circle.domain.entity.Foto;
import net.circle.domain.entity.InscricaoCampeonato;
import net.circle.domain.entity.NotaCampeonato;
import net.circle.domain.entity.PremiacaoCampeonato;
import net.circle.domain.entity.StatusPagamento;

@Named
public class CampeonatoBusiness implements ICampeonatoBusiness {

	@Inject
	private CampeonatoDAO dao;

	@Inject
	private CategoriaCampeonatoDAO categoriaCampeonatoDAO;

	@Inject
	private PremiacaoCampeonatoDAO premiacaoCampeonatoDAO;

	@Inject
	private InscricaoCampeonatoDAO inscricaoCampeonatoDAO;

	@Inject
	private NotaCampeonatoDAO notaCampeonatoDAO;

	@Inject
	private PicoDAO picoDAO;

	@Inject
	private FotoDAO fotoDAO;

	@Inject
	private AtletaDAO atletaDAO;

	@Override
	public Campeonato salvar(Campeonato model) throws Exception {
		try {

			var entity = model.getId() != null ? dao.findById(model.getId()).get() : new Campeonato();

			entity.setTitulo(model.getTitulo());
			entity.setDescricao(model.getDescricao());
			entity.setPico(picoDAO.findById(model.getPico().getId()).get());
			entity.setData(model.getData());

			entity.setMidiasDivulgacao(model.getMidiasDivulgacao());
			for (Foto midia : entity.getMidiasDivulgacao())
				if (midia.getId() != null)
					entity.getMidiasDivulgacao().set(entity.getMidiasDivulgacao().indexOf(midia),
							fotoDAO.findById(midia.getId()).get());

			entity.setFotos(model.getFotos());
			for (Foto foto : entity.getFotos())
				if (foto.getId() != null)
					entity.getFotos().set(entity.getFotos().indexOf(foto), fotoDAO.findById(foto.getId()).get());

			if (model.getRegulamentoModificado()) {
				entity.setRegulamento(model.getRegulamento());
			}

			entity.getArbitros().clear();
			for (Atleta arbitro : model.getArbitros()) {
				entity.getArbitros().add(atletaDAO.findById(arbitro.getId()).get());
			}

			entity.getCategorias().clear();
			for (CategoriaCampeonato categoriaCampeonato : model.getCategorias()) {
				var categoria = categoriaCampeonato.getId() != null
						? categoriaCampeonatoDAO.findById(categoriaCampeonato.getId()).get()
						: new CategoriaCampeonato();
				categoria.setNome(categoriaCampeonato.getNome());
				categoria.setDescricao(categoriaCampeonato.getDescricao());
				categoria.setVoltas(categoriaCampeonato.getVoltas());
				categoria.setPodium(categoriaCampeonato.getPodium());
				categoria.setValorInscricao(categoriaCampeonato.getValorInscricao());
				categoria.setPermitirInscricoes(categoriaCampeonato.getPermitirInscricoes());
				categoria.setExibirInscricoes(categoriaCampeonato.getExibirInscricoes());
				categoria.setExibirClassificacao(categoriaCampeonato.getExibirClassificacao());

				categoria.getPremiacoes().clear();
				for (PremiacaoCampeonato premiacaoCampeonato : categoriaCampeonato.getPremiacoes()) {
					var premiacao = premiacaoCampeonato.getId() != null
							? premiacaoCampeonatoDAO.findById(premiacaoCampeonato.getId()).get()
							: new PremiacaoCampeonato();
					premiacao.setColocacao(premiacaoCampeonato.getColocacao());
					premiacao.setPremiacao(premiacaoCampeonato.getPremiacao());
					categoria.getPremiacoes().add(premiacao);
				}

				entity.getCategorias().add(categoria);
			}

			return dao.merge(entity);
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	public List<Campeonato> consultarLista() {
		return dao.findAll("data ASC");
	}

	@Override
	public Optional<Campeonato> consultar(Integer id) throws Exception {
		return dao.findById(id);
	}

	@Override
	public void setPermitirInscricoes(Boolean permitir, Integer categoriaId) throws Exception {
		var categoria = categoriaCampeonatoDAO.findById(categoriaId).get();
		categoria.setPermitirInscricoes(permitir);
		categoriaCampeonatoDAO.merge(categoria);
	}

	@Override
	public void setExibirInscricoes(Boolean exibir, Integer categoriaId) throws Exception {
		var categoria = categoriaCampeonatoDAO.findById(categoriaId).get();
		categoria.setExibirInscricoes(exibir);
		categoriaCampeonatoDAO.merge(categoria);

	}

	@Override
	public void setExibirClassificacao(Boolean exibir, Integer categoriaId) throws Exception {
		var categoria = categoriaCampeonatoDAO.findById(categoriaId).get();
		categoria.setExibirClassificacao(exibir);
		categoriaCampeonatoDAO.merge(categoria);
	}

	@Override
	public NotaCampeonato setNota(NotaCampeonato notaEntity, Integer idInscricao) throws Exception {
		var nota = notaEntity.getId() != null ? notaCampeonatoDAO.findById(notaEntity.getId()).get()
				: new NotaCampeonato();

		if (nota.getId() == null) {
			nota.setInscricao(inscricaoCampeonatoDAO.findById(idInscricao).get());
			nota.setArbitro(atletaDAO.findById(notaEntity.getArbitro().getId()).get());
			nota.setVolta(notaEntity.getVolta());
		}
		nota.setNota(notaEntity.getNota());

		if (nota.getInscricao().getCategoria().getVoltas() < nota.getVolta())
			throw new Exception("Número da volta inválida");
		
		return notaCampeonatoDAO.merge(nota);

	}

	@Override
	public void setInscricao(Integer idCategoria, Integer idAtleta) throws Exception {
		var inscricao = new InscricaoCampeonato();
		inscricao.setAtleta(atletaDAO.findById(idAtleta).get());
		inscricao.setStatusPagamento(StatusPagamento.PENDENTE);
		inscricao.setCategoria(categoriaCampeonatoDAO.findById(idCategoria).get());
		inscricao.setData(LocalDateTime.now());
		inscricaoCampeonatoDAO.merge(inscricao);
	}

	@Override
	@Transactional
	public void deleteInscricao(Integer idInscricao) throws Exception {
		var inscricao = inscricaoCampeonatoDAO.findById(idInscricao).get();
		inscricaoCampeonatoDAO.remove(inscricao);
	}

	
}
