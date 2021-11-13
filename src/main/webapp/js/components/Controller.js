/**
 * 
 */
export class Controller {

	_getView(){}

	remove() {
		this._getView().remove()
	}

	display(condition) {
		this._getView().display(condition)
	}
}