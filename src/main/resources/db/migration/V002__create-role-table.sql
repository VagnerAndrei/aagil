CREATE TABLE perfil(
	nome VARCHAR(5) PRIMARY KEY
);

CREATE TABLE usuarios_perfis(
	email varchar(100),
	perfil varchar(5),
	PRIMARY KEY(email, perfil)
);

INSERT INTO perfil VALUES('ADMIN');
INSERT INTO perfil VALUES('USER');