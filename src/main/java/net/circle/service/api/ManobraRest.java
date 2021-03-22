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
import net.circle.domain.entity.ManobraComplemento;
import net.circle.domain.entity.ManobraComplementoGrupo;
import net.circle.domain.entity.ManobraTipo;
import net.circle.service.model.IDModel;
import net.circle.service.model.ManobraComplementoGrupoModel;
import net.circle.service.model.ManobraComplementoModel;
import net.circle.service.model.ManobraFullModel;
import net.circle.service.model.ManobraModel;
import net.circle.service.model.ManobraTipoModel;
import net.circle.service.model.ManobrasModel;

@Path("/manobras")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ManobraRest {

	@Inject
	private ManobraBusiness manobraBusiness;

	@GET
	public ManobrasModel consultarManobras() {
		return parseModel(manobraBusiness.consultarTipos(), manobraBusiness.consultarComplementos(),
				manobraBusiness.consultarGruposComplementos(), manobraBusiness.consultarLista());
	}

	@GET
	@Path("/full")
	public List<ManobraFullModel> consultarManobrasFull() {
		return parseModel(manobraBusiness.consultarLista());
	}

	private ManobraModel parseModel(Manobra manobra) {
		var manobraModel = new ManobraModel();
		// manobraModel.setId(manobra.getId());
		manobraModel.setNome(manobra.getNome());
		manobraModel.setDescricao(manobra.getDescricao());
		manobraModel.setTipo(new IDModel(manobra.getTipo().getId()));
		manobraModel.setComplementos(manobra.getComplementos().stream()
				.map(complemento -> new IDModel(complemento.getId())).collect(Collectors.toList()));
		return manobraModel;
	}

	private ManobraFullModel parseFullModel(Manobra manobra) {
		var manobraFullModel = new ManobraFullModel();
		// manobraModel.setId(manobra.getId());
		manobraFullModel.setNome(manobra.getNome());
		manobraFullModel.setDescricao(manobra.getDescricao());
		manobraFullModel.setTipo(parseModel(manobra.getTipo()));
		manobraFullModel.setComplementos(manobra.getComplementos().stream().map(complemento -> parseModel(complemento, false))
				.collect(Collectors.toList()));
		return manobraFullModel;
	}

	private ManobraTipoModel parseModel(ManobraTipo manobraTipo) {
		var manobraTipoModel = new ManobraTipoModel();
		manobraTipoModel.setId(manobraTipo.getId());
		manobraTipoModel.setNome(manobraTipo.getNome());
		manobraTipoModel.setDescricao(manobraTipo.getDescricao());

		return manobraTipoModel;
	}

	private ManobraComplementoGrupoModel parseModel(ManobraComplementoGrupo manobraComplementoGrupo) {
		var manobraComplementoGrupoModel = new ManobraComplementoGrupoModel();
		manobraComplementoGrupoModel.setId(manobraComplementoGrupo.getId());
		manobraComplementoGrupoModel.setNome(manobraComplementoGrupo.getNome());
		manobraComplementoGrupoModel.setDescricao(manobraComplementoGrupo.getDescricao());

		return manobraComplementoGrupoModel;
	}

	private ManobraComplementoModel parseModel(ManobraComplemento manobraComplemento, Boolean idModelGrupo) {
		var manobraComplementoModel = new ManobraComplementoModel();
		manobraComplementoModel.setId(manobraComplemento.getId());
		manobraComplementoModel.setNome(manobraComplemento.getNome());
		manobraComplementoModel.setDescricao(manobraComplemento.getDescricao());
		manobraComplementoModel.setAbreviacao(manobraComplemento.getAbreviacao());
		if (idModelGrupo)
			manobraComplementoModel.setGrupo(new IDModel(manobraComplemento.getGrupo().getId()));
		else
			manobraComplementoModel.setGrupoDescricao(manobraComplemento.getGrupo().getDescricao());
		return manobraComplementoModel;
	}

	private List<ManobraFullModel> parseModel(List<Manobra> manobras) {
		return manobras.stream().map(manobra -> parseFullModel(manobra)).collect(Collectors.toList());
	}

	private ManobrasModel parseModel(List<ManobraTipo> tipos, List<ManobraComplemento> complementos,
			List<ManobraComplementoGrupo> gruposComplementos, List<Manobra> manobras) {
		var manobrasModel = new ManobrasModel();
		manobrasModel.setTipos(tipos.stream().map(manobraTipo -> parseModel(manobraTipo)).collect(Collectors.toList()));
		manobrasModel.setComplementos(
				complementos.stream().map(complemento -> parseModel(complemento, true)).collect(Collectors.toList()));
		manobrasModel.setManobras(manobras.stream().map(manobra -> parseModel(manobra)).collect(Collectors.toList()));
		manobrasModel.setGrupos_complementos(gruposComplementos.stream()
				.map(grupoComplemento -> parseModel(grupoComplemento)).collect(Collectors.toList()));
		return manobrasModel;
	}

}
