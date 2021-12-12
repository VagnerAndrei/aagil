/**
 * 
 */
export class Controller {

	_getView() {
		return this._view
	}

	remove() {
		this._getView().remove()
	}

	display(condition) {
		this._getView().display(condition)
	}
}