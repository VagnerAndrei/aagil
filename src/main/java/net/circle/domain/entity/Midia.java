package net.circle.domain.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Midia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String codigo;

	private MidiaTipo tipo;
	
	public Midia() {
	}

	public Midia(String codigo, MidiaTipo tipo) {
		this.codigo = codigo;
		this.tipo = tipo;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public MidiaTipo getTipo() {
		return tipo;
	}

	public void setTipo(MidiaTipo tipo) {
		this.tipo = tipo;
	}

}
