package net.circle.service.api;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import net.circle.business.exception.enums.NegocioExcecao;
import net.circle.business.interfaces.ICampeonatoBusiness;
import net.circle.domain.entity.Atleta;
import net.circle.domain.entity.Campeonato;
import net.circle.domain.entity.CategoriaCampeonato;
import net.circle.domain.entity.Foto;
import net.circle.domain.entity.Pico;
import net.circle.domain.entity.PremiacaoCampeonato;
import net.circle.service.model.CampeonatoModel;
import net.circle.service.model.CategoriaCampeonatoModel;
import net.circle.service.model.ErroModel;
import net.circle.service.model.PremiacaoCampeonatoModel;

@Path("/campeonatos")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CampeonatoRest {

	@Inject
	private ICampeonatoBusiness servicoCampeonato;

	/**
	 * Realiza a obtenção da lista de atletas
	 *
	 * @returns List<CampeonatoModel>
	 */
	@GET
	public List<CampeonatoModel> getLista() {
		return parseModel(servicoCampeonato.consultarLista());
	}

	/**
	 * Realiza o registro de um campeonato
	 *
	 * @param pessoa - Atleta
	 * 
	 * @returns Response: <br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@POST
	@RolesAllowed("ADMIN")
	public Response register(@Context HttpServletRequest servletRequest, @Valid CampeonatoModel campeonatoModel) {
		try {
			var campeonato = servicoCampeonato.salvar(parseEntity(campeonatoModel));
			return Response.accepted(campeonato).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	private List<CampeonatoModel> parseModel(List<Campeonato> lista) {
		return lista.stream().map(campeonato -> new CampeonatoModel(campeonato.getTitulo()))
				.collect(Collectors.toList());
	}

	private Campeonato parseEntity(CampeonatoModel model) {
		var campeonato = new Campeonato();
		campeonato.setId(model.getId());
		campeonato.setTitulo(model.getTitulo());
		campeonato.setDescricao(model.getDescricao());
		campeonato.setData(model.getData());

		if (model.getPico() != null) {
			campeonato.setPico(new Pico());
			campeonato.getPico().setId(model.getPico().getId());
		}

		for (CategoriaCampeonatoModel categoriaModel : model.getCategorias()) {
			var categoriaCampeonato = new CategoriaCampeonato();
			categoriaCampeonato.setId(categoriaModel.getId());
			categoriaCampeonato.setNome(categoriaModel.getNome());
			categoriaCampeonato.setDescricao(categoriaModel.getDescricao());
			categoriaCampeonato.setVoltas(categoriaModel.getVoltas());
			categoriaCampeonato.setPodium(categoriaModel.getPodium());
			categoriaCampeonato.setValorInscricao(categoriaModel.getValorInscricao());
			categoriaCampeonato.setPermitirInscricoes(false);
			categoriaCampeonato.setExibirInscricoes(false);
			categoriaCampeonato.setExibirClassificacao(false);

			for (PremiacaoCampeonatoModel premiacaoModel : categoriaModel.getPremiacoes()) {
				var premiacaoCampeonato = new PremiacaoCampeonato();
				premiacaoCampeonato.setId(premiacaoModel.getId());
				premiacaoCampeonato.setColocacao(premiacaoModel.getColocacao());
				premiacaoCampeonato.setPremiacao(premiacaoModel.getPremiacao());
				categoriaCampeonato.getPremiacoes().add(premiacaoCampeonato);
			}
			
			campeonato.getCategorias().add(categoriaCampeonato);
		}

		campeonato.setArbitros(model.getArbitros().stream().map(arbitroModel -> new Atleta(arbitroModel.getId()))
				.collect(Collectors.toList()));
		campeonato.setMidiasDivulgacao(model.getMidiasDivulgacao().stream()
				.map(midiaDivulgacaoModeo -> new Foto(midiaDivulgacaoModeo.getId())).collect(Collectors.toList()));
		campeonato.setFotos(model.getFotos().stream()
				.map(fotoModel -> new Foto(fotoModel.getId())).collect(Collectors.toList()));

		return campeonato;
	}

}
