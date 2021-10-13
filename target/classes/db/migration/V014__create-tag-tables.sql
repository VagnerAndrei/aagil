CREATE TABLE tag(
	id SERIAL PRIMARY KEY,
	nome varchar(100) NOT NULL UNIQUE
);

CREATE TABLE tags_picos(
	tag_id INTEGER NOT NULL REFERENCES tag(id),
	pico_id INTEGER NOT NULL REFERENCES pico(id),
	PRIMARY KEY(tag_id, pico_id)
);

CREATE TABLE tags_postagens(
	tag_id INTEGER NOT NULL REFERENCES tag(id),
	postagem_id INTEGER NOT NULL REFERENCES postagem(id),
	PRIMARY KEY(tag_id, postagem_id)
);