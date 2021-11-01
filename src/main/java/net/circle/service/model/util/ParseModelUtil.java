package net.circle.service.model.util;

import net.circle.domain.entity.Atleta;
import net.circle.domain.entity.Endereco;
import net.circle.domain.entity.Pico;
import net.circle.service.model.AtletaModel;
import net.circle.service.model.EnderecoModel;
import net.circle.service.model.IDModel;
import net.circle.service.model.LocalidadeModel;
import net.circle.service.model.PicoModel;

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

	public static PicoModel parseModel(Pico pico, Boolean tags) {
		var model = new PicoModel();
		model.setId(pico.getId());
		model.setTitulo(pico.getTitulo());
		model.setEndereco(parseModel(pico.getEndereco()));

		pico.getFotos().forEach(foto -> model.getFotos().add(new IDModel(foto.getId())));

		if (tags)
			pico.getTags().forEach(tag -> model.getTags().add(tag.getNome()));

		return model;
	}

	public static AtletaModel parseModel(Atleta atleta, Boolean simple) {
		var model = new AtletaModel(atleta.getId(), atleta.getNome());
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
