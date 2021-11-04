CREATE TABLE campeonato(
	id SERIAL PRIMARY KEY,
	titulo varchar(100) NOT NULL,
	descricao varchar(255) NOT NULL,
	pico_id INTEGER NOT NULL REFERENCES pico(id),
	data TIMESTAMP NOT NULL,
	regulamento OID
);

CREATE TABLE arbitros_campeonato(
	campeonato_id INTEGER NOT NULL REFERENCES campeonato(id),
	atleta_id INTEGER NOT NULL REFERENCES atleta(id),
	PRIMARY KEY(campeonato_id, atleta_id)
);

CREATE TABLE midias_divulgacao_campeonato(
	campeonato_id INTEGER NOT NULL REFERENCES campeonato(id),
	foto_id INTEGER NOT NULL REFERENCES foto(id),
	PRIMARY KEY(campeonato_id, foto_id)
);

CREATE TABLE fotos_campeonato(
	campeonato_id INTEGER NOT NULL REFERENCES campeonato(id),
	foto_id INTEGER NOT NULL REFERENCES foto(id),
	PRIMARY KEY(campeonato_id, foto_id)
);


CREATE TABLE categoria_campeonato(
	id SERIAL PRIMARY KEY,
	nome varchar(100) NOT NULL,
	descricao varchar(255) NOT NULL,
	voltas INTEGER NOT NULL,
	podium INTEGER NOT NULL,
	valor_inscricao NUMERIC(5,2),
	permitir_inscricoes BOOLEAN NOT NULL,
	exibir_inscricoes BOOLEAN NOT NULL,
	exibir_classificacao BOOLEAN NOT NULL,
	campeonato_id INTEGER NOT NULL REFERENCES campeonato(id),
	UNIQUE(descricao, campeonato_id)
);

CREATE TABLE premiacao_campeonato(
	id SERIAL PRIMARY KEY,
	colocacao INTEGER NOT NULL,
	premiacao VARCHAR(255) NOT NULL,
	categoria_campeonato_id INTEGER NOT NULL REFERENCES categoria_campeonato(id)
);

CREATE TABLE inscricao_campeonato(
	id SERIAL PRIMARY KEY,
	atleta_id INTEGER NOT NULL REFERENCES atleta(id),
	categoria_campeonato_id INTEGER NOT NULL REFERENCES categoria_campeonato(id),
	status_pagamento VARCHAR(22),
	UNIQUE(atleta_id, categoria_campeonato_id)
);

CREATE TABLE nota_campeonato(
	id SERIAL PRIMARY KEY,
	inscricao_campeonato_id INTEGER NOT NULL REFERENCES inscricao_campeonato(id),
	volta INTEGER NOT NULL,
	arbitro_id INTEGER NOT NULL REFERENCES atleta(id),
	nota NUMERIC(4,2) NOT NULL,
	UNIQUE(inscricao_campeonato_id, volta, arbitro_id)
)


