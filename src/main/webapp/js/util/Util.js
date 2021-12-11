/**
 * 
 */
export class Util{
	
	constructor(){}
	
	static padraoString(string){
		return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
	}
 
}