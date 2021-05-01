package net.circle.domain.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import net.circle.domain.entity.core.AbstractEntity;

@Entity
public class Manobra extends AbstractEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Size(max = 25)
	@NotNull
	private String nome;

	@Size(max = 255)
	@NotNull
	private String descricao;

	@NotNull
	@ManyToOne
	private ManobraTipo tipo;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "manobras_complementos", joinColumns = @JoinColumn(name = "manobra_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "complemento_id", referencedColumnName = "id"))
	private Set<ManobraComplemento> complementos = new HashSet<ManobraComplemento>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public ManobraTipo getTipo() {
		return tipo;
	}

	public void setTipo(ManobraTipo tipo) {
		this.tipo = tipo;
	}

	public Set<ManobraComplemento> getComplementos() {
		return complementos;
	}

	public void setComplementos(Set<ManobraComplemento> complementos) {
		this.complementos = complementos;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Manobra other = (Manobra) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
