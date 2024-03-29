package net.circle.service.api;

import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
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

import net.circle.business.exception.AtletaBusinessException;
import net.circle.business.exception.enums.AtletaExcecao;
import net.circle.business.exception.enums.NegocioExcecao;
import net.circle.business.interfaces.IAtletaBusiness;
import net.circle.domain.entity.Atleta;
import net.circle.service.model.AtletaModel;
import net.circle.service.model.ErroModel;
import net.circle.service.model.IDModel;
import net.circle.service.model.LocalidadeModel;
import net.circle.service.model.PaginacaoModel;
import net.circle.service.util.InputPartUtil;

@Path("/atletas")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AtletaRest {

	@Inject
	private IAtletaBusiness servicoAtleta;

	public final static String[] fotoFormatos = { "PNG", "JPG", "JPEG", "BMP" };

	/**
	 * Realiza a obtenção da lista de atletas
	 *
	 * @returns List<AtletaModel>
	 */
	@GET
	public List<AtletaModel> getLista() {
		return parseModel(servicoAtleta.consultarLista(), false);
	}

	/**
	 * Realiza a obtenção da lista de atletas
	 *
	 * @returns List<AtletaModel>
	 */
	@GET
	@Path("/simple")
	public List<AtletaModel> getListaSimple() {
		return parseModel(servicoAtleta.consultarLista(), true);
	}

	/**
	 * Realiza a obtenção da lista de atletas paginada
	 *
	 * @param contador
	 * @param pagina
	 * 
	 * 
	 * @returns PaginacaoModel
	 */
	@GET
	@Path("/{indice}/{tamanho}")
	public PaginacaoModel getListaPaginada(@PathParam("indice") Integer indice, @PathParam("tamanho") Integer tamanho) {
		var paginacao = parseModelPaginacao(servicoAtleta.consultarPagina(indice, tamanho));
		paginacao.setTotal(servicoAtleta.count());
		return paginacao;
	}

	/**
	 * Realiza a obtenção de um atleta
	 *
	 * @param idAtleta
	 * 
	 * @returns Response: <br/>
	 *          Status.FOUND(302, "Found"),<br/>
	 *          Status.NOT_FOUND(404, "Not Found"),<br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@GET
	@Path("/{idAtleta}")
	public Response consultar(@PathParam("idAtleta") Integer idAtleta) {
		try {
			var atleta = servicoAtleta.consultar(idAtleta);

			if (atleta.isPresent()) {
				var atletaModel = parseModel(atleta.get(), false);
				
				return Response.status(Status.FOUND).entity(atletaModel).build();
			}

			return Response.status(Status.NOT_FOUND).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}
	
	/**
	 * Realiza a exclusão da foto do atleta, incluindo thumbnail e original
	 *
	 * @param idAtleta
	 * 
	 * @returns Response: <br/>
	 *          Status.NO_CONTENT(204, "No Content"),<br/>
	 *          Status.FORBIDDEN(403, "Forbidden"),<br/>
	 *          Status.NOT_ACCEPTABLE(406, "Not Acceptable"),<br/>
	 *          Status. INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@DELETE
	@RolesAllowed("USER")
	@Path("/{idAtleta}/foto")
	public Response apagarFoto(@Context HttpServletRequest request, @PathParam("idAtleta") Integer idAtleta) {
		try {
			var atleta = servicoAtleta.consultar(idAtleta).get();

			if (!request.getUserPrincipal().getName().equals(atleta.getUsuario().getEmail()))
				return Response.status(Status.FORBIDDEN).entity("Acesso negado").build();

			servicoAtleta.apagarFoto(idAtleta);

			return Response.noContent().build();
		} catch (AtletaBusinessException e) {
			return Response.status(Status.NOT_ACCEPTABLE).entity(new ErroModel(e.getExcecao())).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	/**
	 * Realiza a obtenção da foto do atleta em formato JPG
	 *
	 * @param idAtleta
	 * 
	 * @returns Response: <br/>
	 *          Status.OK(200, "OK"),<br/>
	 *          Status.NO_CONTENT(204, "No Content"),<br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@GET
	@Path("/{idAtleta}/foto")
	@Produces("image/jpg")
	@Transactional
	public Response getFoto(@PathParam("idAtleta") Integer idAtleta) {
		try {
			var atleta = servicoAtleta.consultar(idAtleta).get();

			if (atleta.getFoto() == null)
				return Response.status(Status.NO_CONTENT).build();

			ResponseBuilder response = Response.ok(atleta.getFoto().getArquivo().getBinaryStream().readAllBytes())
					.type("image/jpg"); // +
			// atleta.getFoto().getExtensao()
			response.header("Content-Disposition", "inline; filename=" + atleta.getNome().trim() + ".jpg");// +
			// atleta.getFoto().getExtensao()

			return response.build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	/**
	 * Realiza a obtenção da foto do atleta em formato original (a mesma que foi
	 * enviada no upload)
	 *
	 * @param idAtleta
	 * 
	 * @returns Response: <br/>
	 *          Status.OK(200, "OK"),<br/>
	 *          Status.NO_CONTENT(204, "No Content"),<br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@GET
	@Path("/{idAtleta}/foto/original")
	@Produces({ "image/jpg", "image/png", "image/jpeg", "image/bmp" })
	public Response getFotoOriginal(@PathParam("idAtleta") Integer idAtleta) {
		try {
			var atleta = servicoAtleta.consultar(idAtleta).get();

			if (atleta.getFoto() == null)
				return Response.noContent().build();

			ResponseBuilder response = Response.ok(atleta.getFoto().getOriginal().getBinaryStream().readAllBytes())
					.type("image/" + atleta.getFoto().getExtensao().toLowerCase());
			response.header("Content-Disposition",
					"inline; filename=" + atleta.getNome().trim() + "." + atleta.getFoto().getExtensao().toLowerCase());

			return response.build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	/**
	 * Realiza a obtenção da foto do atleta em formato Thumbnail
	 *
	 * @param idAtleta
	 * 
	 * @returns Response: <br/>
	 *          Status.OK(200, "OK"),<br/>
	 *          Status.NO_CONTENT(204, "No Content"),<br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@GET
	@Path("/{idAtleta}/foto/thumb")
	@Produces({ "image/jpg", "image/gif" })
	@Transactional
	public Response getThumb(@PathParam("idAtleta") Integer idAtleta) {
		try {
			var atleta = servicoAtleta.consultar(idAtleta).get();

			if (atleta.getFoto() == null)
				return Response.status(Status.NO_CONTENT).build();
			ResponseBuilder response = Response.ok(atleta.getFoto().getThumbnail().getBinaryStream().readAllBytes())
					.type("image/jpg");
			response.header("Content-Disposition", "inline; filename=" + atleta.getNome().trim() + "-thumbnail.jpg");

			return response.build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.NOT_FOUND).build();
		}
	}

	/**
	 * Realiza atualização do atleta
	 *
	 * @param idAtleta
	 * 
	 * @returns Response: <br/>
	 *          Status.FORBIDDEN(403, "Forbidden"),<br/>
	 *          Status.ACCEPTED(202, "Accepted"),<br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@PUT
	@RolesAllowed("USER")
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response atualizar(@Context HttpServletRequest request, Atleta atleta) {
		try {
			if (!request.getUserPrincipal().getName().equals(servicoAtleta.consultarUsuario(atleta.getId())))
				return Response.status(Status.FORBIDDEN).entity("Acesso negado").build();

			return Response.accepted().entity(parseModel(servicoAtleta.atualizar(atleta), false)).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}
	
	/**
	 * Realiza atualização do atleta
	 *
	 * @param idAtleta
	 * 
	 * @returns Response: <br/>
	 *          Status.FORBIDDEN(403, "Forbidden"),<br/>
	 *          Status.ACCEPTED(202, "Accepted"),<br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@POST
	@RolesAllowed("ADMIN")
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response criarAtleta(@Context HttpServletRequest request, Atleta atleta) {
		try {
			return Response.accepted().entity(parseModel(servicoAtleta.salvar(atleta), false)).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	/**
	 * Realiza upload da foto do perfil do atleta
	 *
	 * @param idAtleta
	 * @param input    inputStream com uma imagem
	 * 
	 * @returns Response: <br/>
	 *          Status.ACCEPTED(202, "Accepted"),<br/>
	 *          Status.FORBIDDEN(403, "Acesso Negado"),<br/>
	 *          Status.TOO_MANY_REQUESTS(429, "Este serviço aceita upload de uma
	 *          imagem apenas"), <br/>
	 *          Status.BAD_REQUEST(400, "Não foi encontrado uma foto no formulário")
	 *          ,<br/>
	 *          Status.BAD_REQUEST(400, "Formatos aceitos: PNG, JPG, JPEG, BMP")
	 *          ,<br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@PUT
	@RolesAllowed("USER")
	@Path("/{idAtleta}/foto")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response uploadFoto(@Context HttpServletRequest request, @PathParam("idAtleta") Integer idAtleta,
			MultipartFormDataInput input) {
		try {
			var usuario = servicoAtleta.consultarUsuario(idAtleta);
			if (!request.getUserPrincipal().getName().equals(usuario))
				return Response.status(Status.FORBIDDEN).build();

			Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
			List<InputPart> inputParts = uploadForm.get("foto");

			if (inputParts.size() > 1)
				return Response.status(Status.TOO_MANY_REQUESTS)
						.entity(new ErroModel(AtletaExcecao.VARIOS_ARQUIVOS_ENVIADOS)).build();
			if (inputParts.size() == 0)
				return Response.status(Status.BAD_REQUEST)
						.entity(new ErroModel(AtletaExcecao.FOTO_NAO_ENCONTRADA_NO_FORMULARIO)).build();

			int idFoto = 0;
			for (InputPart inputPart : inputParts) {

				String fileName = InputPartUtil.getFileName(inputPart.getHeaders());

				var extensao = fileName.toUpperCase().substring(fileName.lastIndexOf(".") + 1);

				if (!Arrays.asList(fotoFormatos).contains(extensao))
					return Response.status(Status.BAD_REQUEST).entity(new ErroModel(AtletaExcecao.FORMATO_INVALIDO))
							.build();

				// convert the uploaded file to inputstream
				InputStream inputStream = inputPart.getBody(InputStream.class, null);
				var atleta = servicoAtleta.foto(idAtleta, inputStream.readAllBytes(), extensao);
				idFoto = atleta.getFoto().getId();
			}

			return Response.accepted().entity(new IDModel(idFoto)).build();

		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}

	}

	private AtletaModel parseModel(Atleta pessoa, Boolean simple) {
		return simple ? new AtletaModel(pessoa.getId(),

				pessoa.getNome() + (pessoa.getUsuario() == null ? " (sem login)" : "")) :

				new AtletaModel(

						pessoa.getId(),

						pessoa.getNome(),

						pessoa.getApelido(),

						pessoa.getBiografia(),

						pessoa.getNascimento(),

						pessoa.getLocalidade() != null
								? new LocalidadeModel(pessoa.getLocalidade().getId(), pessoa.getLocalidade().getNome(),
										pessoa.getLocalidade().getEstado().getId(),
										pessoa.getLocalidade().getEstado().getSigla())
								: null,

						pessoa.getCategoria() != null ? pessoa.getCategoria().toString() : null,

						pessoa.getFoto() != null ? new IDModel(pessoa.getFoto().getId()) : null);

	}

	private List<AtletaModel> parseModel(List<Atleta> lista, Boolean simple) {
		return lista.stream().map(atleta -> parseModel(atleta, simple)).collect(Collectors.toList());
	}

	private PaginacaoModel parseModelPaginacao(List<Atleta> lista) {
		var paginacao = new PaginacaoModel();
		paginacao.setPagina(lista.stream().map(atleta -> parseModel(atleta, false)).collect(Collectors.toList()));
		return paginacao;

	}

}
