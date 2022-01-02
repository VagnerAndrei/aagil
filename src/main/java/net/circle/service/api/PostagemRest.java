package net.circle.service.api;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
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
import javax.ws.rs.core.Response.Status;

import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.circle.business.exception.enums.CampeonatoExcecao;
import net.circle.business.exception.enums.NegocioExcecao;
import net.circle.business.interfaces.IAtletaBusiness;
import net.circle.business.interfaces.IPostagemBusiness;
import net.circle.domain.entity.Atleta;
import net.circle.domain.entity.Foto;
import net.circle.domain.entity.Midia;
import net.circle.domain.entity.MidiaTipo;
import net.circle.domain.entity.Postagem;
import net.circle.domain.entity.Tag;
import net.circle.service.model.ErroModel;
import net.circle.service.model.IDModel;
import net.circle.service.model.MidiaModel;
import net.circle.service.model.PostagemModel;
import net.circle.service.util.InputPartUtil;
import net.circle.service.util.exception.FormatoInvalidoException;

@Path("/postagens")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PostagemRest {

	@Inject
	private IPostagemBusiness postagemBusiness;

	@Inject
	private IAtletaBusiness atletaBusiness;

	public final static String[] fotoFormatos = { "PNG", "JPG", "JPEG", "BMP" };

	@GET
	public List<PostagemModel> consultarPostagens() {
		return parseModel(postagemBusiness.consultarLista());
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
	@Path("/{idPostagem}")
	public Response consultarPostagem(@PathParam("idPostagem") Integer idPostagem) {
		try {
			var model = parseModel(
					postagemBusiness.consultar(idPostagem).orElseThrow(() -> new Exception("Postagem não encontrada")));

			return Response.status(Status.FOUND).entity(model).build();
		} catch (Exception e) {
			if (e.getMessage().equals("Postagem não encontrada"))
				return Response.status(Status.NOT_FOUND).build();
			e.printStackTrace();
			return Response.serverError().build();
		}
	}

	@POST
	@PUT
	@RolesAllowed("ADMIN")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response registrarPostagem(@Context HttpServletRequest request, MultipartFormDataInput input) {
		try {
			Map<String, List<InputPart>> uploadForm = input.getFormDataMap();

			List<InputPart> fotos = uploadForm.get("foto");
			List<InputPart> json = uploadForm.get("json");

			ObjectMapper mapper = new ObjectMapper();
			PostagemModel model = mapper.readValue(json.get(0).getBodyAsString(), PostagemModel.class);

			var atleta = atletaBusiness.findByKey("id", model.getAtleta().getId());

			if (!request.getUserPrincipal().getName().equals(atleta.getUsuario().getEmail()))
				return Response.status(Status.FORBIDDEN).build();

			var postagem = parseModel(model);

			if (fotos != null)
				try {
					postagem.getFotos().addAll(InputPartUtil.getListFotoEntity(fotos));
				} catch (FormatoInvalidoException e) {
					e.printStackTrace();
					return Response.status(Status.BAD_REQUEST)
							.entity(new ErroModel(CampeonatoExcecao.FORMATO_FOTO_INVALIDO)).build();
				} catch (Exception e) {
					throw e;
				}
			postagem = postagemBusiness.salvar(postagem);
			return Response.accepted().build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	@DELETE
	@RolesAllowed("ADMIN")
	@Path("/{idPostagem}")
	public Response apagarPostagem(@PathParam("idPostagem") Integer idPostagem) {
		try {
			postagemBusiness.delete(idPostagem);
			return Response.noContent().build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	private List<PostagemModel> parseModel(List<Postagem> lista) {
		return lista.stream().map(postagem -> parseModel(postagem)).collect(Collectors.toList());
	}

	private PostagemModel parseModel(Postagem postagem) {
		PostagemModel model = new PostagemModel();
		model.setId(postagem.getId());
		if (postagem.getMidia() != null)
			model.setMidia(new MidiaModel(postagem.getMidia().getCodigo(), postagem.getMidia().getTipo().toString()));
		model.setConteudo(postagem.getConteudo());
		model.setTitulo(postagem.getTitulo());
		model.setTags(postagem.getTags().stream().map(tag -> tag.getNome()).collect(Collectors.toList()));
		model.setFotos(
				postagem.getFotos().stream().map(foto -> new IDModel(foto.getId())).collect(Collectors.toList()));
		model.setData(postagem.getData());
		return model;
	}

	private Postagem parseModel(PostagemModel model) {
		Postagem postagem = new Postagem();
		postagem.setId(model.getId());
		if (model.getMidia() != null)
			postagem.setMidia(new Midia(model.getMidia().getCodigo(),
					model.getMidia().getTipo().equals(MidiaTipo.Youtube.toString()) ? MidiaTipo.Youtube
							: MidiaTipo.Vimeo));
		postagem.setConteudo(model.getConteudo());
		postagem.setTitulo(model.getTitulo());
		postagem.setTags(model.getTags().stream().map(tag -> new Tag(tag)).collect(Collectors.toList()));
		postagem.setFotos(model.getFotos().stream().map(foto -> new Foto(foto.getId())).collect(Collectors.toList()));
		postagem.setAtleta(new Atleta());
		postagem.getAtleta().setId(model.getAtleta().getId());
		return postagem;
	}

}
