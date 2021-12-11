ALTER TABLE pico RENAME TO pista;
ALTER TABLE pico_registro RENAME TO pista_registro;
ALTER TABLE tags_picos RENAME TO tags_pistas;
ALTER TABLE fotos_picos RENAME TO fotos_pistas;

ALTER TABLE tags_pistas RENAME COLUMN pico_id TO pista_id;
ALTER TABLE pista_registro RENAME COLUMN pico_atual_id TO pista_atual_id;
ALTER TABLE pista_registro RENAME COLUMN pico_novo_id TO pista_nova_id;
ALTER TABLE fotos_pistas RENAME COLUMN pico_id TO pista_id;
ALTER TABLE campeonato RENAME COLUMN pico_id TO pista_id;