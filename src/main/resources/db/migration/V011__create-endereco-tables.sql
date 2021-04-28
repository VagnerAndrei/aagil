CREATE TABLE geolocalizacao(
	id SERIAL PRIMARY KEY,
	latitude NUMERIC(15) NOT NULL,
	longitude NUMERIC(15) NOT NULL
);

CREATE TABLE endereco(
	id SERIAL PRIMARY KEY,	
	cep VARCHAR(8),
	estado VARCHAR(50) NOT NULL,
	localidade VARCHAR(50) NOT NULL,
	bairro VARCHAR(90) NOT NULL,
	logradouro VARCHAR(80) NOT NULL,
	complemento VARCHAR(50),
	perimetro VARCHAR(100),
	referencia VARCHAR(100),
	geolocalizacao_id INTEGER REFERENCES geolocalizacao(id)
);