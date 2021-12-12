/**
 * 
 */
import { Controller } from './../../../components/Controller.js'
import { HomeView } from './../view/HomeView.js'

export class HomeController extends Controller {

	constructor() {
		super()
		this._view = new HomeView({})
	}

	applyRole() {
		this._view.applyRole()
	}

}