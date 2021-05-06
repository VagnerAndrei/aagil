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
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import com.fasterxml.jackson.databind.ObjectMapper;

import net.circle.business.exception.enums.PicoExcecao;
import net.circle.business.interfaces.IAtletaBusiness;
import net.circle.business.interfaces.IPicoBusiness;
import net.circle.business.interfaces.IPicoRegistroBusiness;
import net.circle.business.util.ImagemUtil;
import net.circle.domain.entity.Atleta;
import net.circle.domain.entity.Endereco;
import net.circle.domain.entity.Foto;
import net.circle.domain.entity.Pico;
import net.circle.domain.entity.PicoRegistro;
import net.circle.domain.entity.Tag;
import net.circle.service.model.EnderecoModel;
import net.circle.service.model.ErroModel;
import net.circle.service.model.IDModel;
import net.circle.service.model.PaginacaoModel;
import net.circle.service.model.PicoModel;
import net.circle.service.model.PicoRegistroModel;

@Path("/picos")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PicoRest {

	@Inject
	private IPicoRegistroBusiness picoRegistroBusiness;

	@Inject
	private IPicoBusiness picoBusiness;

	@Inject
	private IAtletaBusiness atletaBusiness;

	public final static String[] fotoFormatos = { "PNG", "JPG", "JPEG", "BMP" };

	
	/**
	 * Realiza o registro de pico com upload de imagens
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
	@Consumes({ MediaType.MULTIPART_FORM_DATA, MediaType.APPLICATION_JSON })
	public Response adicionarPico(@Context HttpServletRequest request, MultipartFormDataInput input) {
		try {
			Map<String, List<InputPart>> uploadForm = input.getFormDataMap();

			List<InputPart> fotos = uploadForm.get("foto");
			List<InputPart> json = uploadForm.get("json");

			ObjectMapper mapper = new ObjectMapper();
			PicoRegistroModel model = mapper.readValue(json.get(0).getBodyAsString(), PicoRegistroModel.class);

			var atleta = atletaBusiness.findByKey("id", model.getAtleta().getId());

			if (!request.getUserPrincipal().getName().equals(atleta.getUsuario().getEmail()))
				return Response.status(Status.FORBIDDEN).build();

			var registro = parseEntity(model);

			if (fotos != null)
				if (fotos.size() > 10)
					return Response.status(Status.BAD_REQUEST)
							.entity(new ErroModel(PicoExcecao.LIMITE_DE_FOTOS_EXCEDIDO)).build();
				else
					for (InputPart inputPart : fotos) {

						String fileName = getFileName(inputPart.getHeaders());

						var extensao = fileName.toUpperCase().substring(fileName.lastIndexOf(".") + 1);

						if (!Arrays.asList(fotoFormatos).contains(extensao))
							return Response.status(Status.BAD_REQUEST)
									.entity(new ErroModel(PicoExcecao.FORMATO_INVALIDO)).build();

						// convert the uploaded file to inputstream
						InputStream inputStream = inputPart.getBody(InputStream.class, null);
						var foto = new Foto();
						foto.setOriginal(new SerialBlob(inputStream.readAllBytes()));
						foto.setExtensao(extensao);
						foto.setArquivo(new SerialBlob(ImagemUtil.getTratamentoJPG(foto.getOriginalAsByteArray())));
						foto.setThumbnail(new SerialBlob(ImagemUtil.getThumbnailFromJPG(foto.getArquivoAsByteArray())));
						registro.getPicoNovo().getFotos().add(foto);

					}

			var picoRegistro = picoRegistroBusiness.salvar(registro);
			String mensagem = "O Registro do pico foi efetuado com sucesso.";
			switch (picoRegistro.getStatus()) {
			case PENDENTE:
				mensagem = "O Registro do pico foi efetuado com sucesso, e será avaliado por um administrador. Obrigado pela colaboração.";
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
	public List<PicoModel> consultarPicos() {
		return parseModel(picoBusiness.consultarLista());
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
		var paginacao = parseModelPaginacao(picoBusiness.consultarPagina(indice, tamanho));
		paginacao.setTotal(picoBusiness.count());
		return paginacao;
	}

	private PicoRegistro parseEntity(PicoRegistroModel model) {
		PicoRegistro registro = new PicoRegistro();

		registro.setAtleta(new Atleta());
		registro.getAtleta().setId(model.getAtleta().getId());

		registro.setObservacoes(model.getObservacoes());

		if (model.getPicoAtual() != null) {
			registro.setPicoAtual(new Pico());
			registro.getPicoAtual().setId(model.getPicoAtual().getId());
		}

		registro.setPicoNovo(new Pico());
		registro.getPicoNovo().setEndereco(new Endereco());
		registro.getPicoNovo().getEndereco().setBairro(model.getPicoNovo().getEndereco().getBairro());
		registro.getPicoNovo().getEndereco().setCep(model.getPicoNovo().getEndereco().getCep());
		registro.getPicoNovo().getEndereco().setComplemento(model.getPicoNovo().getEndereco().getComplemento());
		registro.getPicoNovo().getEndereco().setEstado(model.getPicoNovo().getEndereco().getEstado());
		registro.getPicoNovo().getEndereco().setLocalidade(model.getPicoNovo().getEndereco().getLocalidade());
		registro.getPicoNovo().getEndereco().setLogradouro(model.getPicoNovo().getEndereco().getLogradouro());
		registro.getPicoNovo().getEndereco().setPerimetro(model.getPicoNovo().getEndereco().getPerimetro());
		registro.getPicoNovo().getEndereco().setReferencia(model.getPicoNovo().getEndereco().getReferencia());
		registro.getPicoNovo().setTitulo(model.getPicoNovo().getTitulo());

		model.getPicoNovo().getTags().forEach(tag -> registro.getPicoNovo().getTags().add(new Tag(tag)));

		return registro;
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

	private List<PicoModel> parseModel(List<Pico> consultarLista) {
		return consultarLista.stream().map(pico -> parseModel(pico)).collect(Collectors.toList());
	}

	private PicoModel parseModel(Pico pico) {
		PicoModel model = new PicoModel();
		model.setId(pico.getId());
		model.setEndereco(new EnderecoModel());
		model.getEndereco().setBairro(pico.getEndereco().getBairro());
		model.getEndereco().setCep(pico.getEndereco().getCep());
		model.getEndereco().setComplemento(pico.getEndereco().getComplemento());
		model.getEndereco().setEstado(pico.getEndereco().getEstado());
		model.getEndereco().setLocalidade(pico.getEndereco().getLocalidade());
		model.getEndereco().setLogradouro(pico.getEndereco().getLogradouro());
		model.getEndereco().setPerimetro(pico.getEndereco().getPerimetro());
		model.getEndereco().setReferencia(pico.getEndereco().getReferencia());
		pico.getFotos().forEach(foto -> model.getFotos().add(new IDModel(foto.getId())));
		pico.getTags().forEach(tag -> model.getTags().add(tag.getNome()));
		model.setTitulo(pico.getTitulo());
		return model;
	}
	
	private PaginacaoModel parseModelPaginacao(List<Pico> lista) {
		var paginacao = new PaginacaoModel();
		paginacao.setPagina(lista.stream().map(pico -> parseModel(pico)).collect(Collectors.toList()));
		return paginacao;

	}

}
