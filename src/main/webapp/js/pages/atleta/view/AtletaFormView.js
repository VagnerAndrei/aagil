import { Modal } from '../../../components/custom/Modal.js'


export class AtletaFormView extends Modal {

    constructor({ atleta, callbackHandler, isAdminForm, titulo }) {
        super(titulo ? titulo : isAdminForm ? 'Registrar Atleta' : 'Editar informações')

        this._atleta = atleta
        this._callbackHandler = callbackHandler
        this._isAdminForm = isAdminForm

        this._carregarUFsFn = {}
        this._carregarLocalidadesFn = {}

		this._init()
    }

    _init() {
        this._labelErro = document.querySelector('#label-erro');
        this._inputNome = document.querySelector('#input-nome');
        this._inputApelido = document.querySelector('#input-apelido');
        this._textareaBiografia = document.querySelector('#textarea-biografia');
        this._inputNascimento = document.querySelector('#input-nascimento');
        this._radioCategoria = document.getElementsByName('radio-categoria');
        this._selectUfs = document.querySelector('#select-ufs');
        this._selectLocalidades = document.querySelector('#select-localidades');
        this._divAtletaPessoal = document.querySelector('#div-atleta-pessoal')


        if (this._isAdminForm) {
            this._inputNascimento.required = false
            this._selectUfs.required = false
            this._selectLocalidades.required = false
            this._divAtletaPessoal.classList.add('display-none')
            document.querySelector('#input-categoria-iniciante').required = false
            document.querySelector('#input-categoria-amador').required = false
            document.querySelector('#input-categoria-profissional').required = false
        } else {
            this.setAtleta()
        }


        this._configureChangeSelectUF()
    }

    _template() {
        return `
         <form name="form-atleta" id="form-atleta">
             <div>
                 <label for="nome">Nome:</label> <input id="input-nome" type="text"
                     required="required">
             </div>
             
             <div>
                 <label for="apelido">Apelido:</label> <input id="input-apelido" type="text">
             </div>
     
             <div>
                 <label for="nascimento">Data de nascimento:</label> <input
                     id="input-nascimento" type="date" required min="1920-01-01"
                     max="2010-12-31">
             </div>
     
             <div class="flex-row space-beetween">
                 <label for="categoria">Localidade:</label> <select id="select-ufs"
                     required>
                     <option value="">UF:</option>
                 </select> <select id="select-localidades" required>
                     <option value="">Localidade:</option>
                 </select>
             </div>
     
             <div id="div-atleta-pessoal">
                 <div class="flex-row">
                     
                     <label for="categoria">Categoria:</label> 
                     
                     <input id="input-categoria-iniciante" type="radio" name="radio-categoria" value="Iniciante" required>
                     <label for="input-categoria-iniciante">Iniciante</label> 
                     
                     <input id="input-categoria-amador" type="radio" name="radio-categoria" value="Amador" required> 
                     <label for="input-categoria-amador">Amador</label>
 
                     <input id="input-categoria-profissional" type="radio" name="radio-categoria" value="Profissional" required> 
                     <label for="input-categoria-profissional">Profissional</label>
                 </div>
         
                 <div>
                     <label for="nome">Biografia:</label>
                     <textarea id="textarea-biografia" rows="20" cols="48"
                         style="resize: none" maxlength="5000"></textarea>
                 </div>
             </div>
             <label id="label-erro" for="Email" class="mensagem-erro"></label>
             <button id="botao-enviar" type="submit">Enviar</button>
         </form>
                 `
    }

    /*
                                         PRIVATE CONFIGURE METHODS
                                                                                */

    _configureChangeSelectUF() {
        this._selectUfs.addEventListener('change', event => this._changeSelectUF(event))
    }


    /*
                                            PUBLIC CONFIGURE METHODS
                                                                                */

    configureEnviarFormulario(command) {
        document.forms.namedItem('form-atleta').addEventListener('submit', event => this._enviarFormulario(event, command));
    }

    configureCarregarUFsFn(command) {
        this._carregarUFsFn = command
		this._carregarUFsFn()
    }

    configureCarregarLocalidades(command) {
        this._carregarLocalidadesFn = command
    }


    /*
                                            PRIVATE METHODS
                                                                                */

    _changeSelectUF(event) {
        this._carregarLocalidadesFn(event.target.value)
        this._changeEvent = true
    }

    _enviarFormulario(event, enviarFormularioController) {
        event.preventDefault();

        const atleta = {
            nome: this._inputNome.value
        }

        if (this._isAdminForm) {
            if (this._inputNascimento.value) atleta.nascimento = this._inputNascimento.value
            if (this._selectLocalidades.value) atleta.localidade = { id: this._selectLocalidades.value }
            if (this._inputApelido.value) atleta.apelido = this._inputApelido.value
        }
        else {
            atleta.id = this._atleta.id
            atleta.biografia = this._textareaBiografia.value
            atleta.nascimento = this._inputNascimento.value
            atleta.apelido = this._inputApelido.value
            atleta.categoria = Array.from(this._radioCategoria).find(radio => radio.checked).value
            atleta.localidade = { id: this._selectLocalidades.value }
        }

        enviarFormularioController(atleta)
    }



    _limparLocalidades() {
        if (this._selectLocalidades.length > 1) {
            const optionsLocalidades = document.querySelectorAll('#select-localidades option');
            optionsLocalidades.forEach(o => o.remove());
            const elementLocalidades = document.createElement("option");
            elementLocalidades.text = "Localidade:"
            elementLocalidades.value = "";
            this._selectLocalidades.add(elementLocalidades, null);
        }
    }




    /*
                                            PUBLIC METHODS
                                                                                */

    setupUFs(ufs) {
        ufs.map(uf => {
            const element = document.createElement("option");
            element.value = uf.id;
            element.text = uf.sigla;
            element.title = uf.nome;
            this._selectUfs.add(element, null)
        })

        if (this._atleta && this._atleta.localidade) {
            this._selectUfs.value = this._atleta.localidade.idUf;
            this._carregarLocalidadesFn(this._atleta.localidade.idUf);
            this._changeEvent = false
        }
    }

    setupLocalidades(localidades) {
        this._limparLocalidades()

        localidades.map(localidade => {
            const element = document.createElement("option");
            element.value = localidade.id;
            element.text = localidade.nome;
            this._selectLocalidades.add(element, null);
        })

        if (!this._changeEvent) this._selectLocalidades.value = this._atleta.localidade.id;
        this._selectLocalidades.disabled = false;
    }

    setAtleta() {
        if (this._atleta.nome) this._inputNome.value = this._atleta.nome;
        if (this._atleta.apelido) this._inputApelido.value = this._atleta.apelido;
        if (this._atleta.biografia) this._textareaBiografia.value = this._atleta.biografia;
        if (this._atleta.nascimento) this._inputNascimento.value = this._atleta.nascimento;
        if (this._atleta.categoria) Array.from(this._radioCategoria).find(radio => radio.value == this._atleta.categoria).checked = true;
    }

    setErroLabel(msg) {
        this._labelErro.textContent = msg
    }

}