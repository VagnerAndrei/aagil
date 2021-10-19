ALTER TABLE usuarios_perfis ADD CONSTRAINT emailfk FOREIGN KEY (email) REFERENCES usuario (email);
ALTER TABLE usuarios_perfis ADD CONSTRAINT perfilfk FOREIGN KEY (perfil) REFERENCES perfil (nome);