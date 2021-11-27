package net.circle.service.model.util;

import net.circle.domain.entity.Atleta;
import net.circle.domain.entity.Endereco;
import net.circle.domain.entity.Pista;
import net.circle.service.model.AtletaModel;
import net.circle.service.model.EnderecoModel;
import net.circle.service.model.IDModel;
import net.circle.service.model.LocalidadeModel;
import net.circle.service.model.PistaModel;
import net.circle.service.model.UsuarioModel;

public class ParseModelUtil {

	public static EnderecoModel parseModel(Endereco endereco) {
		var model = new EnderecoModel();
		model.setBairro(endereco.getBairro());
		model.setCep(endereco.getCep());
		model.setComplemento(endereco.getComplemento());
		model.setUF(endereco.getUF());
		model.setLocalidade(endereco.getLocalidade());
		model.setLogradouro(endereco.getLogradouro());
		model.setPerimetro(endereco.getPerimetro());
		model.setReferencia(endereco.getReferencia());

		return model;
	}

	public static PistaModel parseModel(Pista pista, Boolean tags) {
		var model = new PistaModel();
		model.setId(pista.getId());
		model.setTitulo(pista.getTitulo());
		model.setEndereco(parseModel(pista.getEndereco()));

		pista.getFotos().forEach(foto -> model.getFotos().add(new IDModel(foto.getId())));

		if (tags)
			pista.getTags().forEach(tag -> model.getTags().add(tag.getNome()));

		return model;
	}

	public static AtletaModel parseModel(Atleta atleta, Boolean simple) {
		var model = new AtletaModel(atleta.getId(), atleta.getNome());
		
		if(atleta.getUsuario() != null) {
			model.setUsuario(new UsuarioModel());
		}
		
		if (!simple) {
			model.setApelido(atleta.getApelido());
			model.setNascimento(atleta.getNascimento());
			if (atleta.getLocalidade() != null)
				model.setLocalidade(new LocalidadeModel(atleta.getLocalidade().getId(),
						atleta.getLocalidade().getNome(), atleta.getLocalidade().getEstado().getId(),
						atleta.getLocalidade().getEstado().getSigla()));
		}
		return model;
	}

}
