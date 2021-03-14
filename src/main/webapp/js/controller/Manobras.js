import { get, pagina_nao_encontrada } from './NavegacaoController.js';


const elements = {}

export async function initManobras() {


	/*
	CONSULTANDO MANOBRAS
	*/
	let response = await get(`api/manobras`);

	if (response.status == 404)
		pagina_nao_encontrada();
	else
		if (response.status == 200) {
			const manobras = await response.json();
			console.log(manobras)
			console.log(manobras.tipos)

			const conteudoManobras = document.getElementById('conteudo-manobras')

			let secoes = []
			manobras.tipos.map(tipo => {

				let secao = {};
				secao.nome = tipo.nome
				secao.manobras = []
				manobras.manobras.map(
					manobra => {
						if (manobra.tipo.id == tipo.id)
							secao.manobras.push(manobra)


					})

				secoes.push(secao)

			})

			console.log(secoes)


		}


}