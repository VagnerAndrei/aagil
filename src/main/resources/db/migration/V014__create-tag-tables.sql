CREATE TABLE tag(
	id SERIAL PRIMARY KEY,
	nome varchar(100) NOT NULL UNIQUE
);

CREATE TABLE tags_picos(
	pico_id INTEGER REFERENCES pico(id),
	tag_id INTEGER REFERENCES tag(id)
);

CREATE TABLE tags_postagens(
	postagem_id INTEGER REFERENCES postagem(id),
	tag_id INTEGER REFERENCES tag(id)
);