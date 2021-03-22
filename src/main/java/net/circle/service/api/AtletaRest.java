package net.circle.service.api;

import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;

import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import net.circle.business.AtletaBusiness;
import net.circle.business.exception.BusinessException;
import net.circle.domain.entity.Atleta;
import net.circle.service.model.AtletaModel;
import net.circle.service.model.ErroModel;
import net.circle.service.model.LocalidadeModel;

@Path("/atletas")
@Produces(MediaType.APPLICATION_JSON)
public class AtletaRest {

	@Inject
	private AtletaBusiness servicoAtleta;

	@GET
	@Path("/{idAtleta}")
	public Response consultar(@PathParam("idAtleta") Integer idAtleta) {

		var atleta = servicoAtleta.consultar(idAtleta);

		if (atleta.isPresent())
			return Response.status(Status.FOUND).entity(parseModel(atleta.get())).build();

		return Response.status(Status.NOT_FOUND).build();

	}

	@DELETE
	@RolesAllowed("USER")
	@Path("/{idAtleta}/foto")
	public Response apagarFoto(@Context HttpServletRequest request, @PathParam("idAtleta") Integer idAtleta) {
		var atleta = servicoAtleta.consultar(idAtleta).get();

		if (!request.getUserPrincipal().getName().equals(atleta.getUsuario().getEmail()))
			return Response.status(Status.FORBIDDEN).entity("Acesso negado").build();

		try {
			servicoAtleta.apagarFoto(idAtleta);
		} catch (BusinessException e) {
			return Response.status(Status.NOT_ACCEPTABLE).entity(new ErroModel(e.getCampo(), e.getMensagem())).build();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return Response.noContent().build();
	}

	@GET
	@Path("/{idAtleta}/foto")
	@Produces({ "image/jpg" })
	public Response getFoto(@PathParam("idAtleta") Integer idAtleta) {
		var atleta = servicoAtleta.consultar(idAtleta).get();

		if (atleta.getFoto() == null)
			return Response.status(Status.NO_CONTENT).build();

		ResponseBuilder response = Response.ok(atleta.getFoto().getArquivo()).type("image/jpg"); // +
																									// atleta.getFoto().getExtensao()
		response.header("Content-Disposition", "inline; filename=" + atleta.getNome().trim() + ".jpg");// +
																										// atleta.getFoto().getExtensao()

		return response.build();
	}

	@GET
	@Path("/{idAtleta}/foto/original")
	@Produces({ "image/jpg", "image/png", "image/jpeg", "image/gif", "image/bmp" })
	public Response getFotoOriginal(@PathParam("idAtleta") Integer idAtleta) {
		var atleta = servicoAtleta.consultar(idAtleta).get();

		if (atleta.getFoto() == null)
			return Response.status(Status.NO_CONTENT).build();

		ResponseBuilder response = Response.ok(atleta.getFoto().getArquivo())
				.type("image/" + atleta.getFoto().getExtensao().toLowerCase());
		response.header("Content-Disposition",
				"inline; filename=" + atleta.getNome().trim() + "." + atleta.getFoto().getExtensao().toLowerCase());

		return response.build();
	}

	@GET
	@Path("/{idAtleta}/foto/thumb")
	@Produces({ "image/jpg" })
	public Response getThumb(@PathParam("idAtleta") Integer idAtleta) {
		var atleta = servicoAtleta.consultar(idAtleta).get();

		if (atleta.getFoto() == null)
			return Response.status(Status.NO_CONTENT).build();

		ResponseBuilder response = Response.ok(atleta.getFoto().getThumbnail()).type("image/jpg");
		response.header("Content-Disposition", "inline; filename=" + atleta.getNome().trim() + "-thumbnail.jpg");

		return response.build();
	}

	@PUT
	@RolesAllowed("USER")
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response atualizar(@Context HttpServletRequest request, Atleta atleta) {
		try {
			if (!request.getUserPrincipal().getName().equals(servicoAtleta.consultarUsuario(atleta.getId())))
				return Response.status(Status.FORBIDDEN).entity("Acesso negado").build();

			return Response.accepted().entity(parseModel(servicoAtleta.atualizar(atleta))).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(e.getMessage()).build();
		}
	}

	@PUT
	@RolesAllowed("USER")
	@Path("/{idAtleta}/foto")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response uploadFoto(@Context HttpServletRequest request, @PathParam("idAtleta") Integer idAtleta,
			MultipartFormDataInput input) {
		try {
			var usuario = servicoAtleta.consultarUsuario(idAtleta);

			if (!request.getUserPrincipal().getName().equals(usuario))
				return Response.status(Status.FORBIDDEN).entity("Acesso negado").build();

			Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
			List<InputPart> inputParts = uploadForm.get("foto");

			if (inputParts.size() > 1)
				return Response.status(Status.TOO_MANY_REQUESTS)
						.entity("Este serviço aceita upload de uma imagem apenas").build();
			if (inputParts.size() == 0)
				return Response.status(Status.BAD_REQUEST).entity("Não foi encontrado uma foto no formulário").build();

			for (InputPart inputPart : inputParts) {

				String fileName = getFileName(inputPart.getHeaders());

				String[] tipos = { "PNG", "JPG", "JPEG", "GIF", "BMP" };
				var extensao = fileName.toUpperCase().substring(fileName.lastIndexOf(".") + 1);

				if (!Arrays.asList(tipos).contains(extensao))
					return Response.status(Status.BAD_REQUEST).entity("Formatos aceitos:" + Arrays.asList(tipos))
							.build();

				// convert the uploaded file to inputstream
				InputStream inputStream;

				inputStream = inputPart.getBody(InputStream.class, null);
				servicoAtleta.foto(idAtleta, inputStream.readAllBytes(), extensao);
			}

			return Response.accepted().build();

		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(e.getMessage()).build();
		}

	}

	private String getFileName(MultivaluedMap<String, String> header) {

		String[] contentDisposition = header.getFirst("Content-Disposition").split(";");
		System.out.println(Arrays.asList(contentDisposition));
		for (String filename : contentDisposition) {
			if ((filename.trim().startsWith("filename"))) {

				String[] name = filename.split("=");

				String finalFileName = name[1].trim().replaceAll("\"", "");
				return finalFileName;
			}
		}
		return "unknown";
	}

	private AtletaModel parseModel(Atleta pessoa) {
		return new AtletaModel(

				pessoa.getId(),

				pessoa.getNome(),

				pessoa.getBiografia(),

				pessoa.getNascimento(),

				pessoa.getLocalidade() != null
						? new LocalidadeModel(pessoa.getLocalidade().getId(), pessoa.getLocalidade().getNome(),
								pessoa.getLocalidade().getEstado().getId(),
								pessoa.getLocalidade().getEstado().getSigla())
						: null,

				pessoa.getCategoria() != null ? pessoa.getCategoria().toString() : null);
	}

}
