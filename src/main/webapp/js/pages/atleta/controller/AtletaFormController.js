import { Controller } from "../../../components/Controller.js";
import { get, post, put } from "../../../fetch.js";
import { AtletaFormView } from "../view/AtletaFormView.js";

export class AtletaFormController extends Controller {

	constructor({ atleta, callbackHandler, isAdminForm, titulo }) {
		super()
		this._view = new AtletaFormView({ atleta, isAdminForm, titulo })
		this._isAdminForm = isAdminForm
		this._callbackHandler = callbackHandler
		this._init()
	}

	_init() {
		this._view.configureEnviarFormulario(this._enviarFormulario())
		this._view.configureCarregarUFsFn(this._carregarUFs())
		this._view.configureCarregarLocalidades(this._carregarLocalidades())
	}

	_carregarUFs() {
		return async () => {
			const responseUfs = await get('api/localizacao/estados');

			if (responseUfs.status == 200) {
				const ufs = await responseUfs.json();
				this._view.setupUFs(ufs)
			}
		}
	}

	_carregarLocalidades() {
		return async (idUf) => {
			if (idUf != "") {
				const responseLocalidades = await get(`api/localizacao/localidades/${idUf}`);

				if (responseLocalidades.status == 200) {
					const localidades = await responseLocalidades.json();
					this._view.setupLocalidades(localidades)
				}
			}
		}
	}

	_enviarFormulario() {
		return async (atleta) => {
			console.log(atleta)
			const response = this._isAdminForm ? await post('api/atletas', atleta) : await put('api/atletas', atleta)

			switch (response.status) {
				case 202:
					const atleta = await response.json()
					this._callbackHandler(atleta)
					this._view.fecharModal()
					break
				case 403:
					this._view.setErroLabel("Acesso negado")
					break
				case 500:
					response.json().then(value => this._view.setErroLabel(value.mensagem))
					break
			}

		}
	}

}