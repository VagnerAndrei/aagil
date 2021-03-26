import { get, pagina_nao_encontrada } from './navegacao-controller.js';


const elements = {}

export async function initManobras() {


	/*
	CONSULTANDO MANOBRAS
	*/
	let response = await get(`api/manobras`);

	if (response.status == 200) {
		const json = await response.json();
		//console.log(json)
		//console.log(json.tipos)

		const conteudoManobras = document.getElementById('conteudo-manobras')

		const secoes = []
		json.tipos.map(tipo => {

			const secao = {};
			secao.nome = tipo.nome
			secao.manobras = []
			secao.gruposComplementos = []
			json.manobras.map(
				manobra => {

					manobra.complementos?.map((complemento_manobra, indice) => {
						manobra.complementos[indice] = json.complementos.find(complemento => complemento.id === complemento_manobra.id)
					})

					if (manobra.tipo.id == tipo.id)
						secao.manobras.push(manobra)


				})
			json.gruposComplementos.map(grupo => {
				if (secao.manobras.some(manobra => manobra.complementos?.find(complemento => complemento.grupo?.id === grupo.id)))
					secao.gruposComplementos.push(grupo)
			})
			secoes.push(secao)

		})
		secoes.map(secao => {

			const table = document.createElement("table");

			let thead = document.createElement("thead");
			table.appendChild(thead);

			let theadRow = thead.insertRow(-1)
			thead.appendChild(theadRow)

			let thManobras = document.createElement("th")
			thManobras.innerHTML = "Manobras"
			thManobras.rowSpan = 2
			theadRow.appendChild(thManobras)

			let thDescricao = document.createElement("th")
			thDescricao.innerHTML = "Descrição"
			thDescricao.rowSpan = 2
			theadRow.appendChild(thDescricao)

			if (secao.gruposComplementos?.length > 0) {
				let thGruposComplementos = document.createElement("th")
				thGruposComplementos.colSpan = secao.gruposComplementos.length
				thGruposComplementos.innerHTML = "Complementos"
				theadRow.appendChild(thGruposComplementos)
				let theadRowGruposComplementos = document.createElement("tr")
				let thGrupoComplemento
				secao.gruposComplementos.map(grupo => {
					thGrupoComplemento = document.createElement("th")
					thGrupoComplemento.innerHTML = grupo.nome
					theadRowGruposComplementos.appendChild(thGrupoComplemento)
				})
				thead.appendChild(theadRowGruposComplementos)
			}

			let tbody = document.createElement("tbody");
			table.appendChild(tbody);
			let row, cel
			secao.manobras.map(manobra => {
				row = tbody.insertRow(-1)
				cel = row.insertCell(-1)
				cel.innerHTML = manobra.nome
				cel = row.insertCell(-1)
				cel.innerHTML = manobra.descricao

				secao.gruposComplementos.map(grupo => {
					cel = row.insertCell(-1)
					manobra.complementos?.filter(c => c.grupo.id === grupo.id).map((complemento, indice, array) => {
						cel.innerHTML += indice + 1 == array.length ? complemento.nome : complemento.nome + ", "
					})
				})

			})
			let titulo = document.createElement("h2")
			titulo.innerHTML = secao.nome
			conteudoManobras.appendChild(titulo)
			conteudoManobras.appendChild(table)
		})

	}
	else
		pagina_nao_encontrada();

}