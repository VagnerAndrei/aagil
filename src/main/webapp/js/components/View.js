/**
 * 
 */
export class View {

	constructor(titulo) {
		this._titulo = titulo
		document.getElementsByTagName('main')[0].innerHTML = this.template()
		document.getElementsByTagName('title')[0].innerHTML = this._titulo;
	}
	
	template(){
		throw new Error('Not Yet Implemented')
	}

}