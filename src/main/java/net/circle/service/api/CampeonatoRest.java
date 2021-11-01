package net.circle.service.api;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
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
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
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
import net.circle.business.interfaces.ICampeonatoBusiness;
import net.circle.domain.entity.Atleta;
import net.circle.domain.entity.Campeonato;
import net.circle.domain.entity.CategoriaCampeonato;
import net.circle.domain.entity.Foto;
import net.circle.domain.entity.InscricaoCampeonato;
import net.circle.domain.entity.NotaCampeonato;
import net.circle.domain.entity.Pico;
import net.circle.domain.entity.PremiacaoCampeonato;
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
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
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

	private List<CampeonatoModel> parseModel(List<Campeonato> lista) {
		return lista.stream().map(campeonato -> new CampeonatoModel(campeonato.getTitulo()))
				.collect(Collectors.toList());
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
		model.setMidiasDivulgacao(campeonato.getMidiasDivulgacao().stream().map(midia -> new IDModel(midia.getId())).collect(Collectors.toList()));
		model.setFotos(campeonato.getFotos().stream().map(foto -> new IDModel(foto.getId())).collect(Collectors.toList()));
		
		try {
			model.setRegulamento(campeonato.getRegulamento() != null ? campeonato.getRegulamento().getBinaryStream().available() != 0 : false);
		} catch (IOException | SQLException e) {
			e.printStackTrace();
		}
		
		for(CategoriaCampeonato categoriaCampeonato : campeonato.getCategorias()) {
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
			
			for(PremiacaoCampeonato premiacaoCampeonato : categoriaCampeonato.getPremiacoes()) {
				var premiacaoModel  = new PremiacaoCampeonatoModel();
				premiacaoModel.setId(premiacaoCampeonato.getId());
				premiacaoModel.setColocacao(premiacaoCampeonato.getColocacao());
				premiacaoModel.setPremiacao(premiacaoCampeonato.getPremiacao());
				categoriaModel.getPremiacoes().add(premiacaoModel);
			}
			
			for(InscricaoCampeonato inscricaoCampeonato : categoriaCampeonato.getInscricoes()) {
				var inscricaoModel = new InscricaoCampeonatoModel();
				inscricaoModel.setId(inscricaoCampeonato.getId());
				inscricaoModel.setAtleta(ParseModelUtil.parseModel(inscricaoCampeonato.getAtleta(), false));
				inscricaoModel.setStatusPagamento(inscricaoCampeonato.getStatusPagamento().name());
				for(NotaCampeonato notaCampeonato : inscricaoCampeonato.getNotas()) {
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
			categoriaCampeonato.setPermitirInscricoes(false);
			categoriaCampeonato.setExibirInscricoes(false);
			categoriaCampeonato.setExibirClassificacao(false);

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
