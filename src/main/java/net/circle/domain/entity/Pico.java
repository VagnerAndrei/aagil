package net.circle.domain.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

import net.circle.domain.entity.core.AbstractEntity;

@Entity
public class Pico extends AbstractEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String titulo;

	@OneToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REMOVE })
	private Endereco endereco;

	@ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
	@JoinTable(name = "tags_picos", joinColumns = @JoinColumn(name = "pico_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
	private Set<Tag> tags = new HashSet<Tag>();

	@ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REMOVE})
	@JoinTable(name = "fotos_picos", joinColumns = @JoinColumn(name = "pico_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "foto_id", referencedColumnName = "id"))
	private Set<Foto> fotos = new HashSet<Foto>();

	private Boolean ativo;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String nome) {
		this.titulo = nome;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	public Set<Tag> getTags() {
		return tags;
	}

	public void setTags(Set<Tag> tags) {
		this.tags = tags;
	}

	public Set<Foto> getFotos() {
		return fotos;
	}

	public void setFotos(Set<Foto> fotos) {
		this.fotos = fotos;
	}

	public Boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}

}
