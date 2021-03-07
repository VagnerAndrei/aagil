package net.circle.service.api;

import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import net.circle.business.ManobraBusiness;
import net.circle.domain.entity.Manobra;
import net.circle.service.model.ManobraModel;

@Path("/tricks")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ManobraRest {

	@Inject
	ManobraBusiness manobraBusiness;

	@GET
	public List<ManobraModel> consultarManobras() {
		return parseModel(manobraBusiness.consultarLista());
	}

	private ManobraModel parseModel(Manobra manobra) {
		var manobraModel = new ManobraModel();
		manobraModel.setId(manobra.getId());
		manobraModel.setNome(manobra.getNome());
		manobraModel.setDescricao(manobra.getDescricao());
		manobraModel.setTipo(manobra.getTipo().getNome());
		return manobraModel;
	}

	private List<ManobraModel> parseModel(List<Manobra> manobras) {
		return manobras.stream().map(manobra -> parseModel(manobra)).collect(Collectors.toList());
	}

}
