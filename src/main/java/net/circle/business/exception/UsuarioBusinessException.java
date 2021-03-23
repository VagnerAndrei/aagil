package net.circle.business.exception;

import net.circle.business.exception.enums.UsuarioExcecao;

public class UsuarioBusinessException extends BusinessException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static void main(String[] args) {
	}

	private UsuarioExcecao excecao;

	public UsuarioBusinessException(UsuarioExcecao excecao) {
		super();
		this.excecao = excecao;
	}
	
	public UsuarioExcecao getExcecao() {
		return excecao;
	}

	public String getMessage() {
		if (excecao != null)
			return excecao.toString();
		return "[NEGÓCIO:ERRO] -> " + super.getMessage();
	}

}
