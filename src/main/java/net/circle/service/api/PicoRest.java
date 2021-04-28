package net.circle.service.api;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import net.circle.business.PicoBusiness;

@Path("/picos")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PicoRest {

	@Inject
	private PicoBusiness picoBusiness;

	@GET
	public void teste() {
		try {
			System.out.println("testeapi");
			picoBusiness.salvar(null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
