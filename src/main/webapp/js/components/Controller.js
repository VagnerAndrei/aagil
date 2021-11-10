/**
 * 
 */
export class Controller {

	_getView(){}

	remove() {
		console.log('b')
		this._getView().remove()
	}

	display(condition) {
		console.log('a')
		console.log(this._getView())
		this._getView().display(condition)
	}
}