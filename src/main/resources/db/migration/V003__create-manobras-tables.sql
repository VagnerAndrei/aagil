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



INSERT INTO manobra_tipo(nome, descricao) VALUES('Slide/Grind', 'Deslizar sobre um obstáculo.'); 	/* 1 */
INSERT INTO manobra_tipo(nome, descricao) VALUES('Giro', 'Pular e realizar um giro.'); 			/* 2 */
INSERT INTO manobra_tipo(nome, descricao) VALUES('Grab', 'Pular e realizar uma posição.'); 		/* 3 */
INSERT INTO manobra_tipo(nome, descricao) VALUES('Wallride', 'Andar na parede.'); 					/* 4 */
INSERT INTO manobra_tipo(nome, descricao) VALUES('Shuffle', 'Deslizar sobre uma superfície plana.');/* 5 */ 
INSERT INTO manobra_tipo(nome, descricao) VALUES('Handplant', 'Usar as mãos em um obstáculo'); 								/* 6 */
INSERT INTO manobra_tipo(nome, descricao) VALUES('Stall', 'Manter-se parado em cima de um obstáculo'); 								/* 7 */

INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Acid', '', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Backslide', '', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Fastslide', '', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Fishbrain', '', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Kindgrind', '', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Makio', '', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Mistral', '', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Mizou', 'Slide com os dois pés inclinados para trás', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Nuggen', 'Slide de base com pé atrás', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Pornstar', '', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Pudslide', '', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Royale', '', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Savanah', '', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Sweatsteance', '', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Soul', '', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Torque', '', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Ufo', '', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Unity', '', 1);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Xgrind', '', 1);

INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Backflip', '', 2);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Corck Screw', '', 2);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Flatspin', '', 2);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Frontflip', '', 2);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Mistyflip', '', 2);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Monkeyflip', '', 2);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('180', '', 2);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('360', '', 2);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('540', '', 2);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('720', '', 2);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('900', '', 2);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('1080', '', 2);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('1260', '', 2);

INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Abstract', '', 3);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Cross', '', 3);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Cross Rocket', '', 3);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Japan', '', 3);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Liu Kang', '', 3);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Mute', '', 3);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Parallel', '', 3);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Rocket', '', 3);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Safety', '', 3);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Shifty', '', 3);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Stale', '', 3);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Stale Japan', '', 3);

INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Acid', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Backslide', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Fastslide', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Fishbrain', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Kindgrind', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Makir', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Mistral', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Mizou', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Nuggen', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Pornstar', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Pudslide', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Royale', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Savanah', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Sweatsteance', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Soul', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Torque', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Ufo', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Unity', '', 7);
INSERT INTO manobra(nome, descricao, tipo_id) VALUES('Xgrind', '', 7);

INSERT INTO manobra_complemento_grupo(nome, descricao) VALUES('Entrada do Slide', '.'); 	/* 1 */
INSERT INTO manobra_complemento_grupo(nome, descricao) VALUES('Base do Slide', '.'); 	/* 2 */
INSERT INTO manobra_complemento_grupo(nome, descricao) VALUES('Lado do Slide', '.'); 	/* 3 */
INSERT INTO manobra_complemento_grupo(nome, descricao) VALUES('Variação', '.'); 	/* 4 */
INSERT INTO manobra_complemento_grupo(nome, descricao) VALUES('Saída do Slide', '.'); 	/* 5 */

INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Alleyoop', '.', '', 1); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Fake', '.', '', 1); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Fullcab', '.', '', 1); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Halfcab', '.', '', 1); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Truespin', '.', '', 1); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Zerospin', '.', '', 1); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('270', '.', '', 1); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('360', '.', '', 1); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('540', '.', '', 1); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('720', '.', '', 1); 	


INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Switch', '.', '', 2); 	

INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Backside', '.', '', 3); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Frontside', '.', '', 3); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Farside', '.', '', 3); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Negative', '.', '', 3); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Top', '.', '', 3); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Top Negative', '.', '', 3); 	

INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('360', '.', '', 4); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('Stepover', '.', '', 4); 	

INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('180', '.', '', 5); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('360', '.', '', 5); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('540', '.', '', 5); 	
INSERT INTO manobra_complemento(nome, descricao, abreviacao, grupo_id) VALUES('720', '.', '', 5);


INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,1); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,7); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,8); 	/* Acid */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(1,9); 	/* Acid */

INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,1); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,7); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,8); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(2,9); 	/*  */

INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,1); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,7); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,8); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(3,9); 	/*  */

INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(4,1); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(4,7); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(4,8); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(4,9); 	/*  */

INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(5,1); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(5,7); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(5,8); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(5,9); 	/*  */

INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(20,1); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(20,7); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(20,8); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(20,9); 	/*  */

INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(30,1); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(30,2); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(30,3); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(30,4); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(30,5); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(30,6); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(30,7); 	/*  */

INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(38,1); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(38,2); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(38,3); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(38,4); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(38,5); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(38,6); 	/*  */
INSERT INTO manobras_complementos(manobra_id, complemento_id) VALUES(38,7); 	/*  */
