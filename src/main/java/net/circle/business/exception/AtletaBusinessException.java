package net.circle.business.exception;

import net.circle.business.exception.enums.AtletaExcecao;

public class AtletaBusinessException extends BusinessException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private AtletaExcecao excecao;

	public AtletaBusinessException(AtletaExcecao excecao) {
		super();
		this.excecao = excecao;
	}

	public AtletaExcecao getExcecao() {
		return excecao;
	}

	public String getMessage() {
		if (excecao != null)
			return excecao.toString();
		return "[NEGÓCIO:ERRO] -> " + super.getMessage();
	}

}
