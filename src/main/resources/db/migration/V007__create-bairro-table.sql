CREATE TABLE bairro (
  id INTEGER PRIMARY KEY,
  nome VARCHAR(90) NOT NULL,
  localidade_id INTEGER NOT NULL REFERENCES localidade(id)
);