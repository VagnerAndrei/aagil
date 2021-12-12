/**
 * 
 */
import { atletaLogado } from './../../../sessao.js'
import { View2 } from '../../../components/View2.js'
import { TagsFormItem } from '../../../components/TagsFormItem.js'
import { UploadFormItem } from '../../../components/UploadFormItem.js'

export class PistaFormView extends View2 {

    constructor({ onViewCreatedFn }) {
        super({ titulo: 'Registro de pista', onViewCreatedFn })
        this._validCEP = false
        this._enviarFormularioFn = {}
        this._consultarCEPFn = {}
    }

    async _update() {
        super.update(await this._template())
    }

    async _template() {
        return this._getHTML('pages/user/pista-registro.html')
    }

    _init() {
        this._inputTitulo = document.querySelector('#input-titulo')

        this._inputCEP = document.querySelector('#input-cep')
        this._labelErroCEP = document.querySelector('#label-erro-cep')

        this._inputUF = document.querySelector('#input-estado')
        this._inputLocalidade = document.querySelector('#input-localidade')
        this._inputBairro = document.querySelector('#input-bairro')
        this._inputLogradouro = document.querySelector('#input-logradouro')
        this._inputComplemento = document.querySelector('#input-complemento')
        this._inputPerimetro = document.querySelector('#input-perimetro')
        this._inputReferencia = document.querySelector('#input-referencia')

        this._textareaObservacoes = document.querySelector('#textarea-observacoes')

        this._labelErroTag = document.querySelector('#label-erro-tag')

        this._labelErro = document.querySelector('#label-erro')
        this._buttonEnviar = document.querySelector('#button-enviar')

        this._formPista = document.querySelector('#form-pista')

        this._inputTags = new TagsFormItem('div-tags')

        this._uploadFotos = new UploadFormItem({ elementID: 'div-fotos', maxFiles: 10, maxSize: 5 })

        this._configureInputCEP()
        this._configureBotaoEnviar()
        this._configureForm()
    }

    configureEnviarFormulario(command) {
        this._enviarFormularioFn = command
    }

    configureConsultarCEP() {
        this._consultarCEPFn = command
    }

    setConsultaCEP({ logradouro, complemento, localidade, bairro, uf }) {
        this._inputUF.value = uf;
        this._inputLocalidade.value = localidade;
        this._inputBairro.value = bairro;
        this._inputLogradouro.value = logradouro;
        this._inputComplemento.value = complemento;
        this._labelErroCEP.textContent = ''
        this._validCEP = true
    }

    setErroConsultaCEP() {
        this._labelErroCEP.textContent = 'CEP não encontrado'
        this._validCEP = false
    }

	setErroLabel(msg){
		this._labelErro.textContent = msg
	}

    _configureForm() {
        this._formPista.addEventListener('submit', e => e.preventDefault())
    }

    _configureBotaoEnviar() {
        this._buttonEnviar.addEventListener('click', event => this._enviarFormulario(event))
    }

    _configureInputCEP() {
        this._inputCEP.addEventListener('change', event => this._handleInputCEP(event))
    }

    _handleInputCEP(event) {
        //event.target.value = event.target.value.replace(/[^\d]/, '')
        const value = event.target.value
        const regex = new RegExp('^[0-9]{5}[-]?[0-9]{3}$')
        this._resetEndereco()
        if (value)
            if (regex.test(value)) this._consultarCEPFn(value)
            else {
                this._labelErroCEP.textContent = 'CEP inválido'
                this._validCEP = false
            }
        else this._labelErroCEP.textContent = ''

    }

    _resetEndereco() {
        this._inputUF.value = '';
        this._inputLocalidade.value = '';
        this._inputBairro.value = '';
        this._inputLogradouro.value = '';
        this._inputComplemento.value = '';
        this._inputPerimetro.value = '';
        this._inputReferencia.value = '';
    }

    _enviarFormulario() {
        if (this._formPista.checkValidity() && this._validCEP) {

            const imgs = this._uploadFotos.getListFiles()

            const formData = new FormData()

            /*
                            FOTOS ATTACHMENT
            */

            for (let i = 0; i < imgs.length; i++) {
                formData.append('foto', imgs[i].file)
            }

            if (imgs.length == 0)
                if (!confirm('Este formulário nao possui nenhuma foto inserida, gostaria de enviá-lo assim mesmo? '))
                    return


            /*
                            JSON OBJECT
            */

            const json = {
                "atleta": {
                    "id": atletaLogado.id
                },
                "pistaNovo": {
                    "titulo": this._inputTitulo.value,
                    "endereco": {
                        "cep": this._inputCEP.value.replace('-', ''),
                        "uf": this._inputUF.value,
                        "localidade": this._inputLocalidade.value,
                        "bairro": this._inputBairro.value,
                        "logradouro": this._inputLogradouro.value,
                        "complemento": this._inputComplemento.value,
                        "perimetro": this._inputPerimetro.value,
                        "referencia": this._inputReferencia.value
                    },
                    "tags": this._inputTags.getTagsList()
                },
                "observacoes": this._textareaObservacoes.value
            }

            const blobJSON = new Blob([JSON.stringify(json)], { type: 'application/json' })
            formData.append('json', blobJSON)

            this._enviarFormularioFn(formData)
        } else {
            if (!this._validCEP)
                this._inputCEP.focus()
            this._formPista.reportValidity()
        }
    }


}