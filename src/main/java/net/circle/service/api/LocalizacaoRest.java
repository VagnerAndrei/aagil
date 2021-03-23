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

import net.circle.business.interfaces.ILocalizacaoBusiness;
import net.circle.domain.entity.Estado;
import net.circle.domain.entity.Localidade;
import net.circle.service.model.EstadoModel;
import net.circle.service.model.LocalidadeModel;

@Path("/localizacao")
@Produces(MediaType.APPLICATION_JSON)
public class LocalizacaoRest {

	@Inject
	private ILocalizacaoBusiness servicoLocalizacao;

	@GET
	@Path("/estados")
	@RolesAllowed("USER")
	public List<EstadoModel> listarEstados() {
		return parseModelEstados(servicoLocalizacao.listarEstados());
	}

	@GET
	@Path("/localidades/{idEstado}")
	@RolesAllowed("USER")
	public List<LocalidadeModel> listarEstados(@PathParam("idEstado") Integer idEstado) {
		return parseModelLocalidades(servicoLocalizacao.listarLocalidadesPorEstado(idEstado));
	}

	private LocalidadeModel parseModel(Localidade localidade) {
		return new LocalidadeModel(localidade.getId(), localidade.getNome());
	}

	private EstadoModel parseModel(Estado estado) {
		return new EstadoModel(estado.getId(), estado.getSigla());
	}

	private List<EstadoModel> parseModelEstados(List<Estado> estados) {
		return estados.stream().map(estado -> parseModel(estado)).collect(Collectors.toList());
	}

	private List<LocalidadeModel> parseModelLocalidades(List<Localidade> localidades) {
		return localidades.stream().map(localidade -> parseModel(localidade)).collect(Collectors.toList());
	}

}
