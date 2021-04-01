/**
 * 
 */
export class View {

	constructor(titulo) {
		document.getElementsByTagName('main')[0].innerHTML = this.template()
		document.getElementsByTagName('title')[0].innerHTML = titulo;
	}
	
	template(){
		throw new Error('Not Yet Implemented')
	}

}