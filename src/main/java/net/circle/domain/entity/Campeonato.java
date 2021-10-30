package net.circle.domain.entity;

import java.sql.Blob;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import net.circle.domain.entity.core.AbstractEntity;

@Entity
public class Campeonato extends AbstractEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false, length = 100)
	private String titulo;

	@Column(nullable = true, length = 255)
	private String descricao;

	@ManyToOne
	@JoinColumn(nullable = false)
	private Pico pico;
	
	@JsonFormat(pattern = "MM/dd/yyyy HH:mm:ss")
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime data;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="campeonato_id", referencedColumnName = "id", nullable = false)
	private List<CategoriaCampeonato> categorias = new ArrayList<CategoriaCampeonato>();

	@OneToMany
	@JoinTable(name = "arbitros_campeonato", joinColumns = @JoinColumn(name = "campeonato_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "atleta_id", referencedColumnName = "id"))
	private List<Atleta> arbitros = new ArrayList<Atleta>();

	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "midias_divulgacao_campeonato", joinColumns = @JoinColumn(name = "campeonato_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "foto_id", referencedColumnName = "id"))
	private List<Foto> midiasDivulgacao = new ArrayList<Foto>();

	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "fotos_campeonato", joinColumns = @JoinColumn(name = "campeonato_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "foto_id", referencedColumnName = "id"))
	private List<Foto> fotos = new ArrayList<Foto>();

	@Lob
	@Basic(fetch = FetchType.LAZY)
	private Blob regulamento;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Pico getPico() {
		return pico;
	}

	public void setPico(Pico pico) {
		this.pico = pico;
	}

	public LocalDateTime getData() {
		return data;
	}

	public void setData(LocalDateTime data) {
		this.data = data;
	}

	public List<CategoriaCampeonato> getCategorias() {
		return categorias;
	}

	public void setCategorias(List<CategoriaCampeonato> categorias) {
		this.categorias = categorias;
	}

	public List<Atleta> getArbitros() {
		return arbitros;
	}

	public void setArbitros(List<Atleta> arbitros) {
		this.arbitros = arbitros;
	}

	public List<Foto> getMidiasDivulgacao() {
		return midiasDivulgacao;
	}

	public void setMidiasDivulgacao(List<Foto> midiasDivulgacao) {
		this.midiasDivulgacao = midiasDivulgacao;
	}

	public List<Foto> getFotos() {
		return fotos;
	}

	public void setFotos(List<Foto> fotos) {
		this.fotos = fotos;
	}

	public Blob getRegulamento() {
		return regulamento;
	}

	public void setRegulamento(Blob regulamento) {
		this.regulamento = regulamento;
	}

}
