import { Controller } from "../../../components/Controller.js";
import { get } from "../../../fetch.js";
import { pagina_nao_encontrada } from "../../../navegacao.js";
import { AtletaView } from "../view/AtletaView.js";

export class AtletaController extends Controller {

	constructor({ idAtleta }) {
		super()
		this._idAtleta = idAtleta
		this._view = new AtletaView({ onViewCreatedFn: this._init() })
	}

	_init() {
		return () => {
			this._consultarAtleta()
		}
	}

	async _consultarAtleta() {
		const response = await get(`api/atletas/${this._idAtleta}`)

		switch (response.status) {
			case 302:
				const atleta = await response.json()
				this._view.setAtleta(atleta);
				break
			case 404:
			case 500:
				pagina_nao_encontrada()
		}
	}

	applyRole() {
		this._view._applyRole()
	}
}