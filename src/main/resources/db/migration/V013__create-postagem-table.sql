CREATE TABLE postagem(
	id SERIAL PRIMARY KEY,	
	titulo VARCHAR(100) NOT NULL,
	texto TEXT NOT NULL,
	midia VARCHAR(100) NULL
);

CREATE TABLE fotos_postagens(
	foto_id INTEGER NOT NULL REFERENCES foto(id),
	postagem_id INTEGER NOT NULL REFERENCES postagem(id),
	PRIMARY KEY(postagem_id, foto_id)
);
