package net.circle.service.api;

import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.sql.rowset.serial.SerialBlob;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
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

import net.circle.business.exception.enums.PistaExcecao;
import net.circle.business.interfaces.IAtletaBusiness;
import net.circle.business.interfaces.IPistaBusiness;
import net.circle.business.interfaces.IPistaRegistroBusiness;
import net.circle.business.util.ImagemUtil;
import net.circle.domain.entity.Atleta;
import net.circle.domain.entity.Endereco;
import net.circle.domain.entity.Foto;
import net.circle.domain.entity.Pista;
import net.circle.domain.entity.PistaRegistro;
import net.circle.domain.entity.Tag;
import net.circle.service.model.ErroModel;
import net.circle.service.model.IDModel;
import net.circle.service.model.PaginacaoModel;
import net.circle.service.model.PistaModel;
import net.circle.service.model.PistaRegistroModel;
import net.circle.service.model.util.ParseModelUtil;
import net.circle.service.util.InputPartUtil;

@Path("/pistas")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PistaRest {

	@Inject
	private IPistaRegistroBusiness pistaRegistroBusiness;

	@Inject
	private IPistaBusiness pistaBusiness;

	@Inject
	private IAtletaBusiness atletaBusiness;

	public final static String[] fotoFormatos = { "PNG", "JPG", "JPEG", "BMP" };

	/**
	 * Realiza o registro de pista com upload de imagens
	 *
	 * @param idAtleta
	 * 
	 * @returns Response: <br/>
	 *          Status.FORBIDDEN(403, "Forbidden"),<br/>
	 *          Status.BAD_REQUEST(400, "Bad Request"),<br/>
	 *          Status.ACCEPTED(202, "Accepted"),<br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@POST
	@Path("/")
	@RolesAllowed({ "ADMIN", "USER" })
	@Consumes({ MediaType.MULTIPART_FORM_DATA})
	public Response adicionarPista(@Context HttpServletRequest request, MultipartFormDataInput input) {
		try {
			Map<String, List<InputPart>> uploadForm = input.getFormDataMap();

			List<InputPart> fotos = uploadForm.get("foto");
			List<InputPart> json = uploadForm.get("json");

			ObjectMapper mapper = new ObjectMapper();
			PistaRegistroModel model = mapper.readValue(json.get(0).getBodyAsString(), PistaRegistroModel.class);

			var atleta = atletaBusiness.findByKey("id", model.getAtleta().getId());

			if (!request.getUserPrincipal().getName().equals(atleta.getUsuario().getEmail()))
				return Response.status(Status.FORBIDDEN).build();

			var registro = parseEntity(model);

			if (fotos != null)
				if (fotos.size() > 10)
					return Response.status(Status.BAD_REQUEST)
							.entity(new ErroModel(PistaExcecao.LIMITE_DE_FOTOS_EXCEDIDO)).build();
				else
					for (InputPart inputPart : fotos) {

						String fileName = InputPartUtil.getFileName(inputPart.getHeaders());

						var extensao = fileName.toUpperCase().substring(fileName.lastIndexOf(".") + 1);

						if (!Arrays.asList(fotoFormatos).contains(extensao))
							return Response.status(Status.BAD_REQUEST)
									.entity(new ErroModel(PistaExcecao.FORMATO_INVALIDO)).build();

						// convert the uploaded file to inputstream
						InputStream inputStream = inputPart.getBody(InputStream.class, null);
						var foto = new Foto();
						foto.setOriginal(new SerialBlob(inputStream.readAllBytes()));
						foto.setExtensao(extensao);
						foto.setArquivo(new SerialBlob(
								ImagemUtil.getTratamentoJPG(foto.getOriginal().getBinaryStream().readAllBytes())));
						foto.setThumbnail(new SerialBlob(
								ImagemUtil.getThumbnailFromJPG(foto.getArquivo().getBinaryStream().readAllBytes())));
						registro.getPistaNova().getFotos().add(foto);

					}

			var pistaRegistro = pistaRegistroBusiness.salvar(registro);
			String mensagem = "O Registro do pista foi efetuado com sucesso.";

			switch (pistaRegistro.getStatus()) {
			case PENDENTE:
				mensagem = "O Registro do pista foi efetuado com sucesso, e será avaliado por um administrador. Obrigado pela colaboração.";
				break;
			default:
				break;
			}
			return Response.accepted().entity(mensagem).build();

		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().build();
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<PistaModel> consultarPistas() {
		return parseModel(pistaBusiness.consultarLista(), false);
	}

	@GET
	@Path("/simple")
	public List<PistaModel> consultarPistasSimple() {
		return parseModel(pistaBusiness.consultarLista(), true);
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
		var paginacao = parseModelPaginacao(pistaBusiness.consultarPagina(indice, tamanho));
		paginacao.setTotal(pistaBusiness.count());
		return paginacao;
	}

	private PistaRegistro parseEntity(PistaRegistroModel model) {
		PistaRegistro registro = new PistaRegistro();

		registro.setAtleta(new Atleta());
		registro.getAtleta().setId(model.getAtleta().getId());

		registro.setObservacoes(model.getObservacoes());

		if (model.getPistaAtual() != null) {
			registro.setPistaAtual(new Pista());
			registro.getPistaAtual().setId(model.getPistaAtual().getId());
		}

		registro.setPistaNova(new Pista());
		registro.getPistaNova().setEndereco(new Endereco());
		registro.getPistaNova().getEndereco().setBairro(model.getPistaNovo().getEndereco().getBairro());
		registro.getPistaNova().getEndereco().setCep(model.getPistaNovo().getEndereco().getCep());
		registro.getPistaNova().getEndereco().setComplemento(model.getPistaNovo().getEndereco().getComplemento());
		registro.getPistaNova().getEndereco().setUF(model.getPistaNovo().getEndereco().getUF());
		registro.getPistaNova().getEndereco().setLocalidade(model.getPistaNovo().getEndereco().getLocalidade());
		registro.getPistaNova().getEndereco().setLogradouro(model.getPistaNovo().getEndereco().getLogradouro());
		registro.getPistaNova().getEndereco().setPerimetro(model.getPistaNovo().getEndereco().getPerimetro());
		registro.getPistaNova().getEndereco().setReferencia(model.getPistaNovo().getEndereco().getReferencia());
		registro.getPistaNova().setTitulo(model.getPistaNovo().getTitulo());

		model.getPistaNovo().getTags().forEach(tag -> registro.getPistaNova().getTags().add(new Tag(tag)));

		return registro;
	}

	private List<PistaModel> parseModel(List<Pista> consultarLista, Boolean simple) {
		return consultarLista.stream().map(pista -> parseModel(pista, simple)).collect(Collectors.toList());
	}

	private PistaModel parseModel(Pista pista, Boolean simple) {
		PistaModel model = new PistaModel();
		model.setId(pista.getId());
		model.setTitulo(pista.getTitulo());

		if (!simple) {
			model.setEndereco(ParseModelUtil.parseModel(pista.getEndereco()));
			pista.getFotos().forEach(foto -> model.getFotos().add(new IDModel(foto.getId())));
			pista.getTags().forEach(tag -> model.getTags().add(tag.getNome()));
		}

		return model;
	}

	private PaginacaoModel parseModelPaginacao(List<Pista> lista) {
		var paginacao = new PaginacaoModel();
		paginacao.setPagina(lista.stream().map(pista -> parseModel(pista, false)).collect(Collectors.toList()));
		return paginacao;

	}

}
