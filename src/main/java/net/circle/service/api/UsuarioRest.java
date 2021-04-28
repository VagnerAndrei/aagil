
/**
 * 
 */
package net.circle.service.api;

import java.net.URI;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import net.circle.business.exception.UsuarioBusinessException;
import net.circle.business.exception.enums.NegocioExcecao;
import net.circle.business.exception.enums.UsuarioExcecao;
import net.circle.business.interfaces.IAtletaBusiness;
import net.circle.domain.entity.Atleta;
import net.circle.service.model.AtletaModel;
import net.circle.service.model.AuthModel;
import net.circle.service.model.ErroModel;

/**
 * @author Vagner
 *
 */
@Path("/usuarios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UsuarioRest {

	@Inject
	private IAtletaBusiness servico;

//	@Context
//	private SecurityContext securityContext;

	/**
	 * Realiza o registro do usuário
	 *
	 * @param pessoa - Atleta
	 * 
	 * @returns Response: <br/>
	 *          Status.CONFLICT(409, "EXISTE_UM_EMAIL_AUTENTICADO"),<br/>
	 *          Status.CONFLICT(409, "EMAIL_JA_CADASTRADO"),<br/>
	 *          Status.CREATED(201, "Created"),<br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@POST
	public Response register(@Context HttpServletRequest servletRequest, @Valid Atleta pessoa) {
		try {
			if (servletRequest.getUserPrincipal() != null)
				return Response.status(Status.CONFLICT)
						.entity(new ErroModel(UsuarioExcecao.EXISTE_UM_EMAIL_AUTENTICADO)).build();
			var senha = pessoa.getUsuario().getSenha();
			var registro = servico.salvar(pessoa);
			servletRequest.login(registro.getUsuario().getEmail(), senha);
			return Response.status(Status.CREATED).entity(parseModel(registro)).build();
		} catch (UsuarioBusinessException e) {
			e.printStackTrace();
			return Response.status(Status.CONFLICT).entity(new ErroModel(e.getExcecao())).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	/**
	 * Informa se o usuário está logado
	 *
	 * 
	 * @returns Response: <br/>
	 *          Status.NOT_FOUND(404, "Not Found"),<br/>
	 *          Status.FOUND(302, "Found"),<br/>
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@GET
	@Path("/autenticacao")
	public Response obterUsuarioLogado(@Context HttpServletRequest servletRequest) {
		try {
			if (servletRequest.getUserPrincipal() == null) {
				return Response.status(Status.NOT_FOUND).build();
			} else {
				var pessoa = servico.findByKey("usuario.email", servletRequest.getUserPrincipal().getName());
				return Response.status(Status.FOUND).entity(parseModel(pessoa)).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	@GET
	@Path("/autenticado")
	public Response isUsuarioLogado(@Context HttpServletRequest servletRequest) {
		return Response
				.ok(servletRequest.getUserPrincipal() != null ? servletRequest.getUserPrincipal().getName() : false)
				.build();
	}

	/**
	 * Realiza a autenticação do usuário no sistema
	 *
	 * @param usuario - usuario e senha
	 * 
	 * @returns Response: <br/>
	 *          Status.ACCEPTED(202, "Accepted"),<br/>
	 *          Status.NOT_FOUND(404, "EMAIL_NAO_ENCONTRADO"),<br/>
	 *          Status.CONFLICT(409, "EXISTE_UM_EMAIL_AUTENTICADO"),<br/>
	 *          Status.BAD_REQUEST(400, "SENHA_INVALIDA")
	 *          Status.INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	 */
	@POST
	@Path("/autenticacao")
	public Response autenticar(@Context HttpServletRequest servletRequest, @Valid AuthModel usuario) {
		try {
			if (servletRequest.getUserPrincipal() == null) {

				var pessoa = servico.findByKey("usuario.email", usuario.getEmail());

				if (pessoa != null) {

					servletRequest.login(usuario.getEmail(), usuario.getSenha());
					return Response.accepted(parseModel(pessoa)).build();

				} else
					return Response.status(Status.NOT_FOUND).entity(new ErroModel(UsuarioExcecao.EMAIL_NAO_ENCONTRADO))
							.build();
			} else
				return Response.status(Status.CONFLICT)
						.entity(new ErroModel(UsuarioExcecao.EXISTE_UM_EMAIL_AUTENTICADO)).build();
		} catch (Exception e) {
			e.printStackTrace();
			if (e.getMessage().contains("Login failed"))
				return Response.status(Status.BAD_REQUEST).entity(new ErroModel(UsuarioExcecao.SENHA_INVALIDA)).build();
			return Response.serverError().entity(new ErroModel(NegocioExcecao.OCORREU_UM_ERRO_NO_SERVIDOR)).build();
		}
	}

	@GET
	@Path("/sair")
	@RolesAllowed({ "USER", "ADMIN" })
	public void logout(@Context HttpServletRequest servletRequest) {
		try {
			servletRequest.logout();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@GET
	@Path("/user")
	@RolesAllowed("USER")
	public String user() {
		return "USER";
	}

	@GET
	@Path("/admin")
	@RolesAllowed("ADMIN")
	public String admin() {
		return "ADMIN";
	}

	@GET
	@Path("/atleta")
	public Response redirect() {
		return Response.temporaryRedirect(URI.create("../?atleta")).build();
	}

	private AtletaModel parseModel(Atleta pessoa) {
		return new AtletaModel(pessoa.getId(), pessoa.getNome(), pessoa.getUsuario().getEmail());
	}

}
