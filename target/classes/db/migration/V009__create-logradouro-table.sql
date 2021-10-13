CREATE TABLE logradouro (
  cep VARCHAR(8) PRIMARY KEY,
  tipo_logradouro VARCHAR(30) NOT NULL,
  logradouro VARCHAR(80) NOT NULL,
  complemento VARCHAR(120),
  bairro_id_inicio INTEGER REFERENCES bairro(id),
  bairro_id_fim INTEGER
  );