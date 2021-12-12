/**
 * 
 */
import { Controller } from '../../../components/Controller.js'
import { post } from '../../../fetch.js'
import { loginHandler } from '../../../sessao.js'
import { AcessoView } from './../view/AcessoView.js'

export class AcessoController extends Controller {

	constructor() {
		super()
		this._view = new AcessoView()
		this._init()
	}

	_init() {
		this._view.configureAcessar(this._acessar())
		if (localStorage.getItem('email') != null)
			this._view.setUsuarioLocalStorage({ email: localStorage.getItem('email'), senha: localStorage.getItem('senha') })
	}

	_acessar() {
		return async (json, manterDados) => {
			const response = await post('api/usuarios/autenticacao', json)

			const responseJSON = await response.json()

			if (response.status == 202)
				loginHandler(responseJSON, 'authEvent')
			else
				this._view.setErroAcesso(responseJSON)
				
			if (manterDados) {
				localStorage.setItem('email', json.email)
				localStorage.setItem('senha', json.senha)
			} else {
				localStorage.removeItem('email')
				localStorage.removeItem('senha')
			}
		}
	}
}