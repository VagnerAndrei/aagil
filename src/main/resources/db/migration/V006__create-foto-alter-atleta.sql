CREATE TABLE foto(
	id SERIAL PRIMARY KEY,
	original OID NOT NULL,
	arquivo OID NOT NULL,
	thumbnail OID NOT NULL,
	extensao VARCHAR(4) NOT NULL
);

ALTER TABLE atleta	DROP COLUMN foto;
ALTER TABLE atleta	ADD COLUMN foto_id INTEGER REFERENCES foto(id);
