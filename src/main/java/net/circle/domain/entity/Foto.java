package net.circle.domain.entity;

import java.sql.Blob;
import java.sql.SQLException;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

import net.circle.domain.entity.core.AbstractEntity;

@Entity
public class Foto extends AbstractEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private Blob original;
	
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private Blob arquivo;

	@Lob
	@Basic(fetch = FetchType.LAZY)
	private Blob thumbnail;

	private String extensao;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public Blob getOriginal() {
		return original;
	}
	
	public byte[] getOriginalAsByteArray() throws SQLException {
		return original.getBytes(1, (int) original.length());
	}

	public void setOriginal(Blob original) {
		this.original = original;
	}

	public Blob getArquivo() {
		return arquivo;
	}
	
	public byte[] getArquivoAsByteArray() throws SQLException {
		return arquivo.getBytes(1, (int) arquivo.length());
	}

	public Blob getThumbnail() {
		return thumbnail;
	}
	
	public byte[] getThumbnailAsByteArray() throws SQLException {
		return getThumbnail().getBytes(1, (int) getThumbnail().length());
	}


	public void setThumbnail(Blob thumbnail) {
		this.thumbnail = thumbnail;
	}

	public void setArquivo(Blob arquivo) {
		this.arquivo = arquivo;
	}

	public String getExtensao() {
		return extensao;
	}

	public void setExtensao(String extensao) {
		this.extensao = extensao;
	}

}
