CREATE TABLE midia(
	id SERIAL PRIMARY KEY,	
	codigo VARCHAR(30) NOT NULL,
	tipo VARCHAR(10) NOT NULL
);

CREATE TABLE postagem(
	id SERIAL PRIMARY KEY,	
	titulo VARCHAR(100) NOT NULL,
	conteudo TEXT NOT NULL,
	data TIMESTAMP NOT NULL,
	midia_id INTEGER REFERENCES midia(id),
	atleta_id INTEGER REFERENCES atleta(id)
);


CREATE TABLE fotos_postagens(
	foto_id INTEGER NOT NULL REFERENCES foto(id),
	postagem_id INTEGER NOT NULL REFERENCES postagem(id),
	PRIMARY KEY(postagem_id, foto_id)
);
