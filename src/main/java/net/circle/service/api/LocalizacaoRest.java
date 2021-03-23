package net.circle.service.api;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import net.circle.business.LocalizacaoBusiness;
import net.circle.business.exception.enums.NegocioExcecao;
import net.circle.domain.entity.Localidade;
import net.circle.service.model.ErroModel;
import net.circle.service.model.LocalidadeModel;

@Path("/localizacao")
@Produces(MediaType.APPLICATION_JSON)
public class LocalizacaoRest {

	@Inject
	private LocalizacaoBusiness servicoLocalizacao;

	@GET
	@Path("/estados")
	@RolesAllowed("USER")
	public Response listarEstados() {
		try {
			return Response.ok(servicoLocalizacao.listarEstados()).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	@GET
	@Path("/localidades/{idEstado}")
	@RolesAllowed("USER")
	public Response listarEstados(@PathParam("idEstado") Integer idEstado) {
		try {
			return Response.ok(parseModel(servicoLocalizacao.listarLocalidadesPorEstado(idEstado))).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	private LocalidadeModel parseModel(Localidade localidade) {
		return new LocalidadeModel(localidade.getId(), localidade.getNome());
	}

	private List<LocalidadeModel> parseModel(List<Localidade> localidades) {
		return localidades.stream().map(localidade -> parseModel(localidade)).collect(Collectors.toList());
	}

}
