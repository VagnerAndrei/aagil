package net.circle.service.api;

import java.util.UUID;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;

import net.circle.business.interfaces.IFotoBusiness;

@Path("/fotos")
@Produces("image/jpg")
public class FotoRest {

	@Inject
	private IFotoBusiness fotoBusiness;

	@GET
	@Path("/{idFoto}")
	public Response getFoto(@PathParam("idFoto") Integer idFoto) {
		try {
			ResponseBuilder response = Response.ok(fotoBusiness.consultar(idFoto).get().getArquivo().getBinaryStream().readAllBytes()).type("image/jpg");
			response.header("Content-Disposition", "inline; filename=" + UUID.randomUUID() + ".jpg");
			return response.build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.NOT_FOUND).build();
		}
	}

	@GET
	@Path("/{idFoto}/thumb")
	public Response getFotoThumb(@PathParam("idFoto") Integer idFoto) {
		try {
			ResponseBuilder response = Response.ok(fotoBusiness.consultar(idFoto).get().getThumbnail().getBinaryStream().readAllBytes()).type("image/jpg");
			response.header("Content-Disposition", "inline; filename=" + UUID.randomUUID() + "-thumbnail.jpg");
			return response.build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Status.NOT_FOUND).build();
		}
	}

}
