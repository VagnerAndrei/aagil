import { View } from './../../../components/custom/View.js';

export class ManobrasView extends View {

    constructor({onViewCreatedFn}) {
        super({ titulo: 'Manobras' , onViewCreatedFn})
    }

    _init() {
        this._divConteudoManobras = document.getElementById('div-conteudo-manobras')
    }

    async _update() {
        super._update({ html: await this._template() })
    }

    async _template() {
        return `
			<div id="div-conteudo-manobras"></div>
		`
    }

    setManobras(json) {

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

            const thead = document.createElement("thead");
            table.appendChild(thead);

            const theadRow = thead.insertRow(-1)
            thead.appendChild(theadRow)

            const thManobras = document.createElement("th")
            thManobras.innerHTML = "Manobras"
            thManobras.rowSpan = 2
            theadRow.appendChild(thManobras)

            const thDescricao = document.createElement("th")
            thDescricao.innerHTML = "Descrição"
            thDescricao.rowSpan = 2
            theadRow.appendChild(thDescricao)

            if (secao.gruposComplementos?.length > 0) {
                const thGruposComplementos = document.createElement("th")
                thGruposComplementos.colSpan = secao.gruposComplementos.length
                thGruposComplementos.innerHTML = "Complementos"
                theadRow.appendChild(thGruposComplementos)
                const theadRowGruposComplementos = document.createElement("tr")
                let thGrupoComplemento
                secao.gruposComplementos.map(grupo => {
                    thGrupoComplemento = document.createElement("th")
                    thGrupoComplemento.innerHTML = grupo.nome
                    theadRowGruposComplementos.appendChild(thGrupoComplemento)
                })
                thead.appendChild(theadRowGruposComplementos)
            }

            const tbody = document.createElement("tbody");
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
            const titulo = document.createElement("h2")
            titulo.innerHTML = secao.nome
            this._divConteudoManobras.appendChild(titulo)
            this._divConteudoManobras.appendChild(table)
        })


    }

}
