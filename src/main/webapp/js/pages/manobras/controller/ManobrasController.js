import { Controller } from '../../../components/custom/Controller.js';
import { get } from '../../../fetch.js';
import { ManobrasView } from '../view/ManobrasView.js';

export class ManobrasController extends Controller {

	constructor() {
		super()
		this._view = new ManobrasView({ onViewCreatedFn: this._init() })
	}

	_init() {
		return () => {
			this._consultarManobras()
		}
	}

	async _consultarManobras() {
		const response = await get(`api/manobras`);

		if (response.status == 200) {
			const json = await response.json();
			this._view.setManobras(json)
		}
		else
			pagina_nao_encontrada();

	}

}