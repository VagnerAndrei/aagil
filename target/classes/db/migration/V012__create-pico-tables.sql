CREATE TABLE pico(
	id SERIAL PRIMARY KEY,	
	titulo VARCHAR(100) NOT NULL,
	endereco_id INTEGER NOT NULL REFERENCES endereco(id),
	ativo BOOLEAN NOT NULL
);

CREATE TABLE fotos_picos(
	foto_id INTEGER NOT NULL REFERENCES foto(id),
	pico_id INTEGER NOT NULL REFERENCES pico(id),
	PRIMARY KEY(pico_id, foto_id)
);

CREATE TABLE pico_registro(
	id SERIAL PRIMARY KEY,
	pico_atual_id INTEGER REFERENCES pico(id),
	pico_novo_id INTEGER NOT NULL REFERENCES pico(id),
	data DATE NOT NULL,
	atleta_id INTEGER NOT NULL REFERENCES atleta(id),
	status VARCHAR(30) NOT NULL,
	observacoes VARCHAR(255)
);