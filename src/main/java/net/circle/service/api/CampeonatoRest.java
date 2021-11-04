package net.circle.service.api;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.sql.rowset.serial.SerialBlob;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;

import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.circle.business.exception.enums.CampeonatoExcecao;
import net.circle.business.exception.enums.NegocioExcecao;
import net.circle.business.interfaces.ICampeonatoBusiness;
import net.circle.domain.entity.Atleta;
import net.circle.domain.entity.Campeonato;
import net.circle.domain.entity.CategoriaCampeonato;
import net.circle.domain.entity.Foto;
import net.circle.domain.entity.InscricaoCampeonato;
import net.circle.domain.entity.NotaCampeonato;
import net.circle.domain.entity.Pico;
import net.circle.domain.entity.PremiacaoCampeonato;
import net.circle.service.model.AtletaModel;
import net.circle.service.model.CampeonatoModel;
import net.circle.service.model.CategoriaCampeonatoModel;
import net.circle.service.model.ErroModel;
import net.circle.service.model.IDModel;
import net.circle.service.model.InscricaoCampeonatoModel;
import net.circle.service.model.NotaCampeonatoModel;
import net.circle.service.model.PremiacaoCampeonatoModel;
import net.circle.service.model.util.ParseModelUtil;
import net.circle.service.util.InputPartUtil;
import net.circle.service.util.exception.FormatoInvalidoException;

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
	 *          Status.BAD_REQUEST(400, "Bad Request")
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 *          Status.ACCEPTED(202, "Accepted")
	 */
	@POST
	@PUT
	@RolesAllowed("ADMIN")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response register(@Context HttpServletRequest servletRequest, MultipartFormDataInput input) {
		try {
			Map<String, List<InputPart>> uploadForm = input.getFormDataMap();

			List<InputPart> json = uploadForm.get("json");
			List<InputPart> midiasDivulgacao = uploadForm.get("midiaDivulgacao");
			List<InputPart> fotos = uploadForm.get("foto");
			List<InputPart> regulamento = uploadForm.get("regulamento");

			ObjectMapper mapper = new ObjectMapper();

			CampeonatoModel campeonatoModel = mapper.readValue(json.get(0).getBodyAsString(), CampeonatoModel.class);

			var campeonato = parseEntity(campeonatoModel);

			if (midiasDivulgacao != null)
				try {
					campeonato.getMidiasDivulgacao().addAll(InputPartUtil.getListFotoEntity(midiasDivulgacao));
				} catch (FormatoInvalidoException e) {
					e.printStackTrace();
					return Response.status(Status.BAD_REQUEST)
							.entity(new ErroModel(CampeonatoExcecao.FORMATO_MIDIA_INVALIDO)).build();
				} catch (Exception e) {
					throw e;
				}

			if (fotos != null)
				try {
					campeonato.getFotos().addAll(InputPartUtil.getListFotoEntity(fotos));
				} catch (FormatoInvalidoException e) {
					e.printStackTrace();
					return Response.status(Status.BAD_REQUEST)
							.entity(new ErroModel(CampeonatoExcecao.FORMATO_FOTO_INVALIDO)).build();
				} catch (Exception e) {
					throw e;
				}

			if (regulamento != null) {
				if (regulamento.size() != 1)
					return Response.status(Status.BAD_REQUEST)
							.entity(new ErroModel(CampeonatoExcecao.VARIOS_REGULAMENTOS_ENVIADOS)).build();
				for (InputPart inputPart : regulamento) {

					if (inputPart.getMediaType().getType().equals("text")) {
						campeonato.setRegulamento(null);
						break;
					}

					String fileName = InputPartUtil.getFileName(inputPart.getHeaders());

					var extensao = fileName.toUpperCase().substring(fileName.lastIndexOf(".") + 1);
					if (!extensao.equals("PDF"))
						return Response.status(Status.BAD_REQUEST)
								.entity(new ErroModel(CampeonatoExcecao.FORMATO_REGULAMENTO_INVALIDO)).build();

					// convert the uploaded file to inputstream
					InputStream inputStream = inputPart.getBody(InputStream.class, null);
					campeonato.setRegulamento(new SerialBlob(inputStream.readAllBytes()));
				}
				campeonato.setRegulamentoModificado(true);
			}

			campeonato = servicoCampeonato.salvar(campeonato);
			return Response.accepted(parseModel(campeonato)).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	/**
	 * Realiza a consulta de um campeonato
	 *
	 * @param idCampeonato
	 * 
	 * @returns Response: <br/>
	 *          Status.FOUND(302, "Found"),<br/>
	 *          Status.NOT_FOUND(404, "Not Found"),<br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@GET
	@Path("/{idCampeonato}")
	@Transactional
	public Response consultar(@PathParam("idCampeonato") Integer idCampeonato) {
		try {
			var campeonato = servicoCampeonato.consultar(idCampeonato);

			return campeonato.isPresent() ? Response.status(Status.FOUND).entity(parseModel(campeonato.get())).build()
					: Response.status(Status.NOT_FOUND).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	/**
	 * Realiza alteração em permitir inscrição de uma determinada categoria
	 *
	 * @param idCategoria      Integer
	 * @param exibirInscricoes Boolean
	 * 
	 * @returns Response: <br/>
	 *          Status.OK(200, "OK"),<br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@GET
	@RolesAllowed("ADMIN")
	@Path("/permitirInscricoes/{idCategoria}/{permitirInscricoes}")
	public Response permitirInscricoes(@PathParam("idCategoria") Integer idCategoria,
			@PathParam("permitirInscricoes") Boolean permitirInscricoes) {
		try {
			servicoCampeonato.setPermitirInscricoes(permitirInscricoes, idCategoria);
			return Response.ok().build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	/**
	 * Realiza alteração em exibir inscrição de uma determinada categoria
	 *
	 * @param idCategoria      Integer
	 * @param exibirInscricoes Boolean
	 * 
	 * @returns Response: <br/>
	 *          Status.OK(200, "OK"),<br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@PUT
	@RolesAllowed("ADMIN")
	@Path("/exibirInscricoes/{idCategoria}/{exibirInscricoes}")
	public Response exibirInscricoes(@PathParam("idCategoria") Integer idCategoria,
			@PathParam("exibirInscricoes") Boolean exibirInscricoes) {
		try {
			servicoCampeonato.setExibirInscricoes(exibirInscricoes, idCategoria);
			return Response.ok().build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	/**
	 * Realiza alteração em exibir classificação de uma determinada categoria
	 *
	 * @param idCategoria         Integer
	 * @param exibirClassificacao Boolean
	 * 
	 * @returns Response: <br/>
	 *          Status.OK(200, "OK"),<br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@PUT
	@RolesAllowed("ADMIN")
	@Path("/exibirClassificacao/{idCategoria}/{exibirClassificacao}")
	public Response exibirClassificacao(@PathParam("idCategoria") Integer idCategoria,
			@PathParam("exibirClassificacao") Boolean exibirClassificacao) {
		try {
			servicoCampeonato.setExibirInscricoes(exibirClassificacao, idCategoria);
			return Response.ok().build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	/**
	 * Realiza alteração em uma nota de uma volta
	 *
	 * @param idCategoria         Integer
	 * @param exibirClassificacao Boolean
	 * 
	 * @returns Response: <br/>
	 *          Status.OK(200, "OK"),<br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@POST
	@RolesAllowed("ADMIN")
	@Path("/notas/{idInscricao}")
	public Response setNota(NotaCampeonatoModel notaModel, @PathParam("idInscricao") Integer idInscricao) {
		try {
			servicoCampeonato.setNota(parseEntity(notaModel), idInscricao);
			return Response.ok().build();
		} catch (Exception e) {
			e.printStackTrace();
			
			if(e.getMessage().equals("Número da volta inválida"))
				return Response.serverError().entity(new ErroModel(CampeonatoExcecao.NUMERO_DA_VOLTA_INVALIDA))
						.build();
			
			if (e.getCause().getCause().getMessage().contains("ERROR: duplicate key value violates unique constraint"))
				return Response.serverError().entity(new ErroModel(CampeonatoExcecao.NOTA_JA_LANCADA_NESTA_VOLTA))
						.build();

			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	/**
	 * Realiza a inscrição de um atleta em uma categoria
	 *
	 * @param idCategoria         Integer
	 * @param exibirClassificacao Boolean
	 * 
	 * @returns Response: <br/>
	 *          Status.OK(200, "OK"),<br/>
	 *          Status.FORBIDDEN(403, "Forbidden") Status.INTERNAL_SERVER_ERROR(500,
	 *          "Internal Server Error")
	 */
	@POST
	@RolesAllowed("USER")
	@Path("/inscricoes/{idCategoria}")
	public Response setInscricao(@Context HttpServletRequest request, AtletaModel atleta,
			@PathParam("idCategoria") Integer idCategoria) {
		try {
			if (!atleta.getUsuario().getEmail().equals(request.getUserPrincipal().getName()))
				return Response.status(Status.FORBIDDEN).build();

			servicoCampeonato.setInscricao(idCategoria, atleta.getId());

			return Response.ok().build();
		} catch (Exception e) {
			e.printStackTrace();

			if (e.getCause().getCause().getMessage()
					.contains(" duplicate key value violates unique constraint \"unique\""))
				return Response.serverError().entity(new ErroModel(CampeonatoExcecao.ATLETA_JA_INSCRITO)).build();

			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	/**
	 * Realiza a inscrição de um atleta em uma categoria
	 *
	 * @param idCategoria         Integer
	 * @param exibirClassificacao Boolean
	 * 
	 * @returns Response: <br/>
	 *          Status.OK(200, "OK"),<br/>
	 *          Status.FORBIDDEN(403, "Forbidden") Status.INTERNAL_SERVER_ERROR(500,
	 *          "Internal Server Error")
	 */
	@POST
	@RolesAllowed("ADMIN")
	@Path("/inscricoes/{idCategoria}/{idAtleta}")
	public Response setInscricaoAdmin(@Context HttpServletRequest request, AtletaModel atleta,
			@PathParam("idCategoria") Integer idCategoria, @PathParam("idAtleta") Integer idAtleta) {
		try {
			if (!atleta.getUsuario().getEmail().equals(request.getUserPrincipal().getName()))
				return Response.status(Status.FORBIDDEN).build();

			servicoCampeonato.setInscricao(idCategoria, idAtleta);

			return Response.ok().build();
		} catch (Exception e) {
			e.printStackTrace();

			if (e.getCause().getCause().getMessage()
					.contains(" duplicate key value violates unique constraint \"unique\""))
				return Response.serverError().entity(new ErroModel(CampeonatoExcecao.ATLETA_JA_INSCRITO)).build();

			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	/**
	 * Realiza a remoção da inscrição de um atleta em uma categoria
	 *
	 * @param idCategoria         Integer
	 * @param exibirClassificacao Boolean
	 * 
	 * @returns Response: <br/>
	 *          Status.NO_CONTENT(204, "No Content"),<br/>
	 *          Status.FORBIDDEN(403, "Forbidden") Status.INTERNAL_SERVER_ERROR(500,
	 *          "Internal Server Error")
	 */
	@DELETE
	@RolesAllowed("ADMIN")
	@Path("/inscricoes/{idInscricao}")
	public Response deleteInscricaoAdmin(@Context HttpServletRequest request, AtletaModel atleta,
			@PathParam("idInscricao") Integer idInscricao) {
		try {
			if (!atleta.getUsuario().getEmail().equals(request.getUserPrincipal().getName()))
				return Response.status(Status.FORBIDDEN).build();

			servicoCampeonato.deleteInscricao(idInscricao);

			return Response.status(Status.NO_CONTENT).build();
		} catch (NoSuchElementException e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(CampeonatoExcecao.INSCRICAO_NAO_EXISTE)).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	/**
	 * Realiza a obtenção do regulamento do campeonato
	 *
	 * @param idAtleta
	 * 
	 * @returns Response: <br/>
	 *          Status.OK(200, "OK"),<br/>
	 *          Status.NO_CONTENT(204, "No Content"),<br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@GET
	@Path("/{idCampeonato}/regulamento")
	@Produces("application/pdf")
	@Transactional
	public Response getRegulamento(@PathParam("idCampeonato") Integer idCampeonato) {
		try {
			var campeonato = servicoCampeonato.consultar(idCampeonato).get();

			var regulamento = campeonato.getRegulamento().getBinaryStream().readAllBytes();
			
			if (regulamento.length == 0)
				return Response.status(Status.NO_CONTENT).build();

			ResponseBuilder response = Response.ok(regulamento).type("application/pdf"); // +
			// atleta.getFoto().getExtensao()
			response.header("Content-Disposition", "inline; filename=" + campeonato.getTitulo().trim() + "-regulamento.pdf");// +
			// atleta.getFoto().getExtensao()

			return response.build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	private List<CampeonatoModel> parseModel(List<Campeonato> lista) {
		return lista.stream().map(campeonato -> new CampeonatoModel(campeonato.getId(), campeonato.getTitulo()))
				.collect(Collectors.toList());
	}

	private NotaCampeonato parseEntity(NotaCampeonatoModel model) {
		var nota = new NotaCampeonato();
		nota.setId(model.getId());
		if (model.getArbitro() != null)
			nota.setArbitro(new Atleta(model.getArbitro().getId()));
		nota.setVolta(model.getVolta());
		nota.setNota(model.getNota());
		return nota;
	}

	private CampeonatoModel parseModel(Campeonato campeonato) {
		var model = new CampeonatoModel();
		model.setId(campeonato.getId());
		model.setTitulo(campeonato.getTitulo());
		model.setTitulo(campeonato.getTitulo());
		model.setDescricao(campeonato.getDescricao());
		model.setData(campeonato.getData());
		model.setPico(ParseModelUtil.parseModel(campeonato.getPico(), false));
		model.setData(campeonato.getData());

		model.setArbitros(campeonato.getArbitros().stream().map(arbitro -> ParseModelUtil.parseModel(arbitro, true))
				.collect(Collectors.toList()));
		model.setMidiasDivulgacao(campeonato.getMidiasDivulgacao().stream().map(midia -> new IDModel(midia.getId()))
				.collect(Collectors.toList()));
		model.setFotos(
				campeonato.getFotos().stream().map(foto -> new IDModel(foto.getId())).collect(Collectors.toList()));

		try {
			model.setRegulamento(campeonato.getRegulamento() != null
					? campeonato.getRegulamento().getBinaryStream().readAllBytes().length != 0
					: false);
		} catch (IOException | SQLException e) {
			e.printStackTrace();
		}

		for (CategoriaCampeonato categoriaCampeonato : campeonato.getCategorias()) {
			var categoriaModel = new CategoriaCampeonatoModel();
			categoriaModel.setId(categoriaCampeonato.getId());
			categoriaModel.setNome(categoriaCampeonato.getNome());
			categoriaModel.setDescricao(categoriaCampeonato.getDescricao());
			categoriaModel.setVoltas(categoriaCampeonato.getVoltas());
			categoriaModel.setPodium(categoriaCampeonato.getPodium());
			categoriaModel.setValorInscricao(categoriaCampeonato.getValorInscricao());
			categoriaModel.setPermitirInscricoes(categoriaCampeonato.getPermitirInscricoes());
			categoriaModel.setExibirInscricoes(categoriaCampeonato.getExibirInscricoes());
			categoriaModel.setExibirClassificacao(categoriaCampeonato.getExibirClassificacao());

			for (PremiacaoCampeonato premiacaoCampeonato : categoriaCampeonato.getPremiacoes()) {
				var premiacaoModel = new PremiacaoCampeonatoModel();
				premiacaoModel.setId(premiacaoCampeonato.getId());
				premiacaoModel.setColocacao(premiacaoCampeonato.getColocacao());
				premiacaoModel.setPremiacao(premiacaoCampeonato.getPremiacao());
				categoriaModel.getPremiacoes().add(premiacaoModel);
			}

			for (InscricaoCampeonato inscricaoCampeonato : categoriaCampeonato.getInscricoes()) {
				var inscricaoModel = new InscricaoCampeonatoModel();
				inscricaoModel.setId(inscricaoCampeonato.getId());
				inscricaoModel.setAtleta(ParseModelUtil.parseModel(inscricaoCampeonato.getAtleta(), false));
				inscricaoModel.setStatusPagamento(inscricaoCampeonato.getStatusPagamento().name());
				for (NotaCampeonato notaCampeonato : inscricaoCampeonato.getNotas()) {
					var notaModel = new NotaCampeonatoModel();
					notaModel.setId(notaCampeonato.getId());
					notaModel.setVolta(notaCampeonato.getVolta());
					notaModel.setNota(notaCampeonato.getNota());
					notaModel.setArbitro(ParseModelUtil.parseModel(notaCampeonato.getArbitro(), true));
					inscricaoModel.getNotas().add(notaModel);
				}
				categoriaModel.getInscricoes().add(inscricaoModel);
			}

			model.getCategorias().add(categoriaModel);
		}

		return model;
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
			categoriaCampeonato.setPermitirInscricoes(
					categoriaModel.getPermitirInscricoes() != null ? categoriaModel.getPermitirInscricoes() : false);
			categoriaCampeonato.setExibirInscricoes(
					categoriaModel.getExibirInscricoes() != null ? categoriaModel.getExibirInscricoes() : false);
			categoriaCampeonato.setExibirClassificacao(
					categoriaModel.getExibirClassificacao() != null ? categoriaModel.getExibirClassificacao() : false);

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
		campeonato.setFotos(
				model.getFotos().stream().map(fotoModel -> new Foto(fotoModel.getId())).collect(Collectors.toList()));

		return campeonato;
	}

}
