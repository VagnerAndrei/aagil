/**
 * 
 */
import { View } from './../../../components/custom/View.js'
import { isAdmin } from './../../../sessao.js'
import { postagem } from './../../../navegacao.js'
import { PostagemListaController } from './../../postagem/controller/PostagemListaController.js'

export class HomeView extends View {

    constructor() {
        super({ titulo: 'Página Inicial'})
    }

    _init() {
        this._buttonPostar = document.getElementById('button-registrar-postagem')
        this._buttonPostar.addEventListener('click', postagem)
        const postagens = new PostagemListaController({ element: 'section-postagens' })
        this.applyRole()
    }

    applyRole() {
        if (isAdmin()) this._buttonPostar.classList.remove('display-none')
        else this._buttonPostar.classList.add('display-none')
    }

    async _update() {
        super._update(await this._template())
    }

    async _template() {
        return this._getHTML('pages/public/home.html')
    }
}