/**
 * 
 */
export class View {

	constructor(titulo) {
<<<<<<< HEAD
		this._titulo = titulo
		document.getElementsByTagName('main')[0].innerHTML = this.template()
		document.getElementsByTagName('title')[0].innerHTML = this._titulo;
=======
		document.getElementsByTagName('main')[0].innerHTML = this.template()
		document.getElementsByTagName('title')[0].innerHTML = titulo;
>>>>>>> branch 'main' of https://github.com/VagnerAndrei/aagil
	}
	
	template(){
		throw new Error('Not Yet Implemented')
	}

}