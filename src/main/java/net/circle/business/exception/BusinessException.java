package net.circle.business.exception;

public class BusinessException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static void main(String[] args) {
	}

	private Excecao excecao;

	public static enum Excecao {

		EMAIL_JA_CADASTRADO("Email", "Email já cadastrado"), EMAIL_NAO_ENCONTRADO("Email", "Email não encontrado"),
		SENHA_INVALIDA("Senha", "Senha inválida"), EMAIL_JA_AUTENTICADO("Email", "Já existe um email autenticado"),
		FOTO_NAO_EXISTE("Foto", "Este usuário não possui foto"),
		FOTO_ARQUIVO_INVÁLIDO("Foto", "Arquivo inválido, verifique se sua imagem foi salva corretamente");

		private String campo;
		private String mensagem;

		private Excecao(String campo, String mensagem) {
			this.campo = campo;
			this.mensagem = mensagem;
		}

		public String toString() {
			return campo != null ? campo + " : " + mensagem : mensagem;
		}

		public String getCampo() {
			return this.campo;
		}

		public String getMensagem() {
			return this.mensagem;
		}

	}

	public BusinessException(Excecao excecao) {
		super();
		this.excecao = excecao;
	}

	public Excecao getExcecao() {
		return this.excecao;
	}

	public String getCampo() {
		return this.excecao.campo;
	}

	public String getMensagem() {
		return this.excecao.mensagem;
	}

	public String getMessage() {
		if (excecao != null)
			return excecao.toString();
		return "[NEGÓCIO:ERRO] -> " + super.getMessage();
	}

}
