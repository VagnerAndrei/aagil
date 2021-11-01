package net.circle.business;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.PostPersist;

import net.circle.business.interfaces.ICampeonatoBusiness;
import net.circle.domain.dao.CampeonatoDAO;
import net.circle.domain.dao.CategoriaCampeonatoDAO;
import net.circle.domain.dao.FotoDAO;
import net.circle.domain.dao.InscricaoCampeonatoDAO;
import net.circle.domain.dao.NotaCampeonatoDAO;
import net.circle.domain.dao.PicoDAO;
import net.circle.domain.dao.PremiacaoCampeonatoDAO;
import net.circle.domain.entity.Campeonato;
import net.circle.domain.entity.CategoriaCampeonato;
import net.circle.domain.entity.Foto;
import net.circle.domain.entity.PremiacaoCampeonato;

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

	@Override
	@PostPersist
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
					entity.getMidiasDivulgacao().set(entity.getMidiasDivulgacao().indexOf(foto),
							fotoDAO.findById(foto.getId()).get());

			if (model.getRegulamentoModificado()) {
				entity.getRegulamento().free();
				entity.setRegulamento(model.getRegulamento());
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
		return dao.findAll();
	}

	@Override
	public Optional<Campeonato> consultar(Integer id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
