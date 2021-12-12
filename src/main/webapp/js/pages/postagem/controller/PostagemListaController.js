import { ListaController } from './../../../components/ListaController.js'
import { PostagemListaView } from './../view/PostagemListaView.js'

export class PostagemListaController extends ListaController {

	constructor({ element }) {
		super({ url: 'api/postagens' })
		this._view = new PostagemListaView({ element })
		this._init()
	}

	_init() {
		this._view.configureAtualizarLista(this._carregarPostagens())
	}

	_carregarPostagens() {
		return async () => {
			await this._atualizarLista()
			this._view.updateListTemplate(this._lista)
		}
	}
}