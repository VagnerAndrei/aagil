CREATE TABLE manobra_tipo(
	id SERIAL PRIMARY KEY,
	nome VARCHAR(25) NOT NULL,
	descricao VARCHAR(150) NOT NULL
);

CREATE TABLE manobra(
	id SERIAL PRIMARY KEY,
	nome VARCHAR(25) NOT NULL,
	descricao VARCHAR(255) NOT NULL,
	tipo_id INTEGER NOT NULL REFERENCES manobra_tipo(id)
);

CREATE TABLE manobra_complemento_grupo(
	id SERIAL PRIMARY KEY,
	nome VARCHAR(20) NOT NULL,
	descricao VARCHAR (150) NOT NULL
);

CREATE TABLE manobra_complemento(
	id SERIAL PRIMARY KEY,
	nome VARCHAR(25) NOT NULL,
	descricao VARCHAR(150) NOT NULL,
	abreviacao VARCHAR(5),
	grupo_id INTEGER NOT NULL REFERENCES manobra_complemento_grupo(id)
);


CREATE TABLE manobras_complementos(
	manobra_id INTEGER NOT NULL REFERENCES manobra(id),
	complemento_id INTEGER NOT NULL REFERENCES manobra_complemento(id),
	UNIQUE (manobra_id,complemento_id)
);



INSERT INTO manobra_tipo(nome, descricao) VALUES('Slide/Grind', 'Deslizar sobre um obstáculo.'); 			/* 1 */
INSERT INTO manobra_tipo(nome, descricao) VALUES('Giro', 'Pular e realizar um giro.'); 						/* 2 */
INSERT INTO manobra_tipo(nome, descricao) VALUES('Grab', 'Pular e realizar uma posição.'); 					/* 3 */
INSERT INTO manobra_tipo(nome, descricao) VALUES('Wallride', 'Andar na parede.'); 							/* 4 */
INSERT INTO manobra_tipo(nome, descricao) VALUES('Shuffle', 'Deslizar sobre uma superfície plana.');		/* 5 */ 
INSERT INTO manobra_tipo(nome, descricao) VALUES('Handplant', 'Usar as mãos em um obstáculo'); 				/* 6 */
INSERT INTO manobra_tipo(nome, descricao) VALUES('Stall', 'Manter-se parado em cima de um obstáculo'); 		/* 7 */

INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Acid Soul', '', 1);													/* 1 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Backslide', '', 1);												/* 2 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Fastslide', '', 1);												/* 3 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Fishbrain', '', 1);												/* 4 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Kindgrind', '', 1);												/* 5 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Makio', '', 1);													/* 6 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Mistral', '', 1);													/* 7 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Mizou', 'Slide com os dois pés inclinados para trás', 1);			/* 8 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Nuggen', 'Slide de base com pé atrás', 1);						/* 9 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Pornstar', '', 1);												/* 10 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Pudslide', '', 1);												/* 11 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Royale', '', 1);													/* 12 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Savanah', '', 1);													/* 13 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Sweatsteance', '', 1);											/* 14 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Soul', '', 1);													/* 15 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Torque', '', 1);													/* 16 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Ufo', '', 1);														/* 17 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Unity', '', 1);													/* 18 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Xgrind', '', 1);													/* 19 */

INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Backflip', '', 2);												/* 20 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Corck Screw', '', 2);												/* 21 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Flatspin', '', 2);												/* 22 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Frontflip', '', 2);												/* 23 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Mistyflip', '', 2);												/* 24 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Monkeyflip', '', 2);												/* 25 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('180', '', 2);														/* 26 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('360', '', 2);														/* 27 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('540', '', 2);														/* 28 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('720', '', 2);														/* 29 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('900', '', 2);														/* 30 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('1080', '', 2);													/* 31 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('1260', '', 2);													/* 32 */

INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Abstract', '', 3);												/* 33 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Cross', '', 3);													/* 34 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Cross Rocket', '', 3);											/* 35 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Japan', '', 3);													/* 36 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Liu Kang', '', 3);												/* 37 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Mute', '', 3);													/* 38 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Parallel', '', 3);												/* 39 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Rocket', '', 3);													/* 40 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Safety', '', 3);													/* 41 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Shifty', '', 3);													/* 42 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Stale', '', 3);													/* 43 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Stale Japan', '', 3);												/* 44 */

INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Acid', '', 7);													/* 45 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Backslide', '', 7);												/* 46 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Fastslide', '', 7);												/* 47 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Fishbrain', '', 7);												/* 48 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Kindgrind', '', 7);												/* 49 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Makir', '', 7);													/* 50 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Mistral', '', 7);													/* 51 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Mizou', '', 7);													/* 52 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Nuggen', '', 7);													/* 53 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Pornstar', '', 7);												/* 54 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Pudslide', '', 7);												/* 55 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Royale', '', 7);													/* 56 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Savanah', '', 7);													/* 57 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Sweatsteance', '', 7);											/* 58 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Soul', '', 7);													/* 59 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Torque', '', 7);													/* 60 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Ufo', '', 7);														/* 61 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Unity', '', 7);													/* 62 */
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Xgrind', '', 7);													/* 63 */

INSERT INTO manobra_complemento_grupo(nome, descricao) VALUES('Entrada do Slide', '.'); 	/* 1 */
INSERT INTO manobra_complemento_grupo(nome, descricao) VALUES('Base do Slide', '.'); 		/* 2 */
INSERT INTO manobra_complemento_grupo(nome, descricao) VALUES('Lado do Slide', '.'); 		/* 3 */
INSERT INTO manobra_complemento_grupo(nome, descricao) VALUES('Variação', '.'); 			/* 4 */
INSERT INTO manobra_complemento_grupo(nome, descricao) VALUES('Saída do Slide', '.'); 		/* 5 */

INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Alleyoop', '.', '', 1); 		/* 1 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Fullcab', '.', '', 1); 		/* 3 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Halfcab', '.', '', 1); 		/* 4 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Zerospin', '.', '', 1); 		/* 6 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Outspin', '.', '', 1); 		/* 5 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Truespin', '.', '', 1); 		/* 5 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('270', '.', '', 1); 			/* 7 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('360', '.', '', 1); 			/* 8 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('540', '.', '', 1); 			/* 9 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('720', '.', '', 1); 			/* 10 */


INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Base', '.', '', 2); 		/* 11 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Switch', '.', '', 2); 		/* 11 */

INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Backside', '.', '', 3); 		/* 12 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Frontside', '.', '', 3); 	/* 13 */	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Farside', '.', '', 3); 		/* 14 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Negative', '.', '', 3); 		/* 15 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Top', '.', '', 3); 			/* 16 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Top Negative', '.', '', 3); 	/* 17 */

INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Darkside', '.', '', 4); 		/* 17 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Stepover', '.', '', 4); 		/* 19 */

INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('180', '.', '', 5); 			/* 20 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('360', '.', '', 5); 			/* 21 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('540', '.', '', 5); 			/* 22 */
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('720', '.', '', 5);			/* 23 */


/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,1); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,2); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,3); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,4); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,5); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,6); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,7); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,8); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,9); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,10); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,11); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,12); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,15); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,16); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,17); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,18); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,19); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,21); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,22); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,23); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,24); 	/* Acid */

/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,1); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,2); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,3); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,4); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,5); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,6); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,7); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,8); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,9); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,10); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,11); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,12); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,15); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,16); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,17); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,18); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,19); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,21); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,22); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,23); 	/* Makio */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(6,24); 	/* Makio */

/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,1); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,2); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,3); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,4); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,5); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,6); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,7); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,8); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,9); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,10); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,11); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,12); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,15); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,16); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,17); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,18); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,19); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,21); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,22); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,23); 	/* Mistral */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(7,24); 	/* Mistral */

/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,1); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,2); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,3); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,4); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,5); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,6); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,7); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,8); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,9); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,10); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,11); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,12); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,15); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,16); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,17); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,18); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,19); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,21); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,22); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,23); 	/* Mizou */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(8,24); 	/* Mizou */

/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,1); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,2); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,3); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,4); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,5); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,6); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,7); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,8); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,9); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,10); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,11); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,12); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,15); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,16); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,17); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,18); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,19); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,21); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,22); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,23); 	/* Pornstar */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(10,24); 	/* Pornstar */

/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,1); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,2); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,3); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,4); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,5); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,6); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,7); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,8); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,9); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,10); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,11); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,12); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,15); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,16); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,17); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,18); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,19); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,21); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,22); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,23); 	/* Sweatsteance */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(14,24); 	/* Sweatsteance */

/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,1); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,2); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,3); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,4); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,5); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,6); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,7); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,8); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,9); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,10); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,11); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,12); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,15); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,16); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,17); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,18); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,19); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,21); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,22); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,23); 	/* Soul */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(15,24); 	/* Soul */

/* Backslide*/
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,3); 	/* Backslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,7); 	/* Backslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,8); 	/* Backslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,9); 	/* Backslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,10); 	/* Backslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,11); 	/* Backslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,12); 	/* Backslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,13); 	/* Backslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,14); 	/* Backslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,21); 	/* Backslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,22); 	/* Backslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,23); 	/* Backslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,24); 	/* Backslide */

/* Fastslide*/
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,3); 	/* Fastslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,7); 	/* Fastslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,8); 	/* Fastslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,9); 	/* Fastslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,10); 	/* Fastslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,11); 	/* Fastslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,12); 	/* Fastslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,13); 	/* Fastslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,14); 	/* Fastslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,21); 	/* Fastslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,22); 	/* Fastslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,23); 	/* Fastslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,24); 	/* Fastslide */

/* Fishbrain*/
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(4,8); 	/* Fishbrain */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(4,9); 	/* Fishbrain */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(4,10); 	/* Fishbrain */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(4,11); 	/* Fishbrain */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(4,12); 	/* Fishbrain */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(4,17); 	/* Fishbrain */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(4,21); 	/* Fishbrain */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(4,22); 	/* Fishbrain */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(4,23); 	/* Fishbrain */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(4,24); 	/* Fishbrain */

/* Kindgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(5,4); 		/* Kindgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(5,11); 	/* Kindgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(5,12); 	/* Kindgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(5,17); 	/* Kindgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(5,21); 	/* Kindgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(5,22); 	/* Kindgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(5,23); 	/* Kindgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(5,24); 	/* Kindgrind */

/* Nuggen */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(9,3); 	/* Nuggen */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(9,7); 	/* Nuggen */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(9,8); 	/* Nuggen */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(9,9); 	/* Nuggen */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(9,10); 	/* Nuggen */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(9,11); 	/* Nuggen */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(9,12); 	/* Nuggen */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(9,13); 	/* Nuggen */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(9,14); 	/* Nuggen */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(9,21); 	/* Nuggen */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(9,22); 	/* Nuggen */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(9,23); 	/* Nuggen */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(9,24); 	/* Nuggen */

/* Pudslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(11,3); 	/* Pudslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(11,7); 	/* Pudslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(11,8); 	/* Pudslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(11,9); 	/* Pudslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(11,10); 	/* Pudslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(11,11); 	/* Pudslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(11,12); 	/* Pudslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(11,13); 	/* Pudslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(11,14); 	/* Pudslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(11,21); 	/* Pudslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(11,22); 	/* Pudslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(11,23); 	/* Pudslide */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(11,24); 	/* Pudslide */

/* Royale */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(12,3); 	/* Royale */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(12,7); 	/* Royale */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(12,8); 	/* Royale */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(12,9); 	/* Royale */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(12,10); 	/* Royale */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(12,11); 	/* Royale */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(12,12); 	/* Royale */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(12,13); 	/* Royale */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(12,14); 	/* Royale */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(12,21); 	/* Royale */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(12,22); 	/* Royale */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(12,23); 	/* Royale */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(12,24); 	/* Royale */

/* Savanah */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(13,3); 	/* Savanah */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(13,7); 	/* Savanah */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(13,8); 	/* Savanah */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(13,9); 	/* Savanah */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(13,10); 	/* Savanah */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(13,11); 	/* Savanah */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(13,12); 	/* Savanah */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(13,13); 	/* Savanah */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(13,14); 	/* Savanah */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(13,21); 	/* Savanah */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(13,22); 	/* Savanah */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(13,23); 	/* Savanah */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(13,24); 	/* Savanah */

/* Torque*/
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(16,3); 	/* Torque */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(16,7); 	/* Torque */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(16,8); 	/* Torque */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(16,9); 	/* Torque */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(16,10); 	/* Torque */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(16,11); 	/* Torque */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(16,12); 	/* Torque */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(16,13); 	/* Torque */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(16,14); 	/* Torque */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(16,21); 	/* Torque */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(16,22); 	/* Torque */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(16,23); 	/* Torque */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(16,24); 	/* Torque */

/* Ufo */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(17,3); 	/* Ufo */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(17,7); 	/* Ufo */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(17,8); 	/* Ufo */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(17,9); 	/* Ufo */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(17,10); 	/* Ufo */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(17,11); 	/* Ufo */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(17,12); 	/* Ufo */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(17,13); 	/* Ufo */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(17,14); 	/* Ufo */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(17,21); 	/* Ufo */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(17,22); 	/* Ufo */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(17,23); 	/* Ufo */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(17,24); 	/* Ufo */

/* Unity */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(18,3); 	/* Unity */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(18,7); 	/* Unity */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(18,8); 	/* Unity */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(18,9); 	/* Unity */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(18,10); 	/* Unity */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(18,11); 	/* Unity */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(18,12); 	/* Unity */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(18,13); 	/* Unity */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(18,14); 	/* Unity */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(18,21); 	/* Unity */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(18,22); 	/* Unity */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(18,23); 	/* Unity */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(18,24); 	/* Unity */

/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,1); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,2); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,3); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,4); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,5); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,6); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,7); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,8); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,9); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,10); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,11); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,12); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,16); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,17); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,18); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,21); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,22); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,23); 	/* Xgrind */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(19,24); 	/* Xgrind */


/* 		
 * Alleyoop top mizou = kindgrind
 * 	Alleyoop top mistral = misfyt
 * Top mizu = sweatsteance
 * top makio = fishbrain
 * 
 *  */
