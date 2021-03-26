/**
 * 
 */
import { get } from "../../controller/navegacao-controller.js"

export class List {

	constructor(urlApiLista) {
		this.urlApiLista_ = urlApiLista
	}
	
	async init(){
		const responseAtletas = await get(this.urlApiLista_)

		switch (responseAtletas.status) {
			case 200:
				this.lista_ = await responseAtletas.json()
				break
			case 500:
				console.log(responseAtletas)
				break
		}
	}

	get lista() {
		return this.lista_
	}

	template() {
		throw new Error('Not Yet Implemented')
	}


}