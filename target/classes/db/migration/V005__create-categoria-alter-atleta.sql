CREATE TABLE categoria(
	nome VARCHAR(12) PRIMARY KEY
);

INSERT INTO categoria VALUES('Iniciante');
INSERT INTO categoria VALUES('Amador');
INSERT INTO categoria VALUES('Profissional');

ALTER TABLE atleta	ADD COLUMN nascimento DATE;
ALTER TABLE atleta	ADD COLUMN categoria VARCHAR(12) REFERENCES categoria(nome);
ALTER TABLE atleta	ADD COLUMN foto BYTEA;
ALTER TABLE atleta	ADD COLUMN localidade_id INTEGER REFERENCES localidade(id);
