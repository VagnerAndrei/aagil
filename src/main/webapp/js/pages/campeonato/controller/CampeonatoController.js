/**
 * 
 */
import { Controller } from './../../../components/custom/Controller.js'
import { CampeonatoView } from './../view/CampeonatoView.js'
import { get, post } from './../../../fetch.js'
import { Campeonato } from './../model/Campeonato.js'
import { atletaLogado } from './../../../sessao.js'
import { pagina_nao_encontrada } from './../../../navegacao.js'

export class CampeonatoController extends Controller {

	constructor({ idCampeonato }) {
		super()

		this._view = new CampeonatoView({ onViewCreatedFn: this.init() })

		this._idCampeonato = idCampeonato
	}

	init() {
		return async () => {
			this._consultarCampeonato({ isUpdateNotas: false })
			this._view.configureInscreverSeFunction(this._inscreverSe())
			this._view.configureInscreverAtletaFunction(this._inscreverAtleta())
			this._view.configureSetExibirInscricoes(this._setExibirInscricoes())
			this._view.configureSetPermitirInscricoes(this._setPermitirInscricoes())
			this._view.configureSetExibirClassificacao(this._setExibirClassificacao())
			this._view.configureLancarNota(this._lancarNota())
			this._view.configureUpdateNotas(this._updateNotas())
			this._view.configureUpdateCampeonato(this._updateCampeonato())
		}
	}

	_updateNotas() {
		return async () => {
			await this._consultarCampeonato({ isUpdateNotas: true })
		}
	}

	_updateCampeonato() {
		return async () => {
			await this._consultarCampeonato({ isUpdateCampeonato: true })
		}
	}

	async _consultarCampeonato({ isUpdateNotas, isUpdateCampeonato }) {
		const response = await get(`api/campeonatos/${this._idCampeonato}`)
		switch (response.status) {
			case 302:
				const json = await response.json()
				const campeonato = new Campeonato(json)
				if (isUpdateNotas) {
					this._view.updateNotasCampeonato(campeonato)
				} else
					if (isUpdateCampeonato) {
						this._view.updateCampeonato(campeonato)
					} else
						this._view.setCampeonato(campeonato)
				break
			case 404:
			case 500:
				pagina_nao_encontrada()
				break
		}
	}

	_inscreverSe() {
		return async (idCategoria) => {
			const response =
				await
					post(`api/campeonatos/inscricoes/${idCategoria}`,
						{
							id: atletaLogado.id,
							usuario: {
								email: atletaLogado.usuario.email
							}
						})


			switch (response.status) {
				case 200:
					alert('Inscrição realizada com sucesso !!!\n\nFique ligado, em breve atualizaremos o site com novidades sobre o campeonato.\n\nDesde já agradecemos sua participação.\n\nAté breve.')
					this._updateCampeonato()()
					break
				case 403:
					break
				case 500:
					const json = await response.json()
					alert(json.mensagem)
					break
			}
		}
	}

	_inscreverAtleta() {
		return async (idCategoria, idAtleta) => {
			const response =
				await
					post(`api/campeonatos/inscricoes/${idCategoria}/${idAtleta}`,
						{
							id: atletaLogado.id,
							usuario: {
								email: atletaLogado.usuario.email
							}
						})
			switch (response.status) {
				case 200:
					alert('Inscrição realizada com sucesso')
					this._updateCampeonato()()
					break
				case 403:
					console.log(response)
					break
				case 500:
					const json = await response.json()
					alert(json.mensagem)
					break
			}
		}
	}

	_setPermitirInscricoes() {
		return async (idCategoria, permitir) => {
			const response =
				await
					get(`api/campeonatos/permitirInscricoes/${idCategoria}/${permitir}`)
			switch (response.status) {
				case 200:
					alert(permitir ? 'Inscrições abertas' : 'Inscrições fechadas')
					this._updateCampeonato()()
					break
				case 403:
					console.log(response)
					break
				case 500:
					const json = await response.json()
					alert(json.mensagem)
					break
			}
		}
	}

	_setExibirInscricoes() {
		return async (idCategoria, exibir) => {
			const response =
				await
					get(`api/campeonatos/exibirInscricoes/${idCategoria}/${exibir}`)
			switch (response.status) {
				case 200:
					alert(exibir ? 'Exibindo Inscrições publicamente' : 'Inscrições ocultadas ao público')
					break
				case 403:
					console.log(response)
					break
				case 500:
					const json = await response.json()
					alert(json.mensagem)
					break
			}
		}
	}

	_setExibirClassificacao() {
		return async (idCategoria, exibir) => {
			const response =
				await
					get(`api/campeonatos/exibirClassificacao/${idCategoria}/${exibir}`)
			switch (response.status) {
				case 200:
					alert(exibir ? 'Exibindo Classificação publicamente' : 'Classificação ocultada ao público')
					break
				case 403:
					console.log(response)
					break
				case 500:
					const json = await response.json()
					alert(json.mensagem)
					break
			}
		}
	}

	_lancarNota() {
		return async (idCategoria, idInscricao, nota) => {

			const model = nota.id ?
				{ id: nota.id } :
				{ volta: nota.volta, arbitro: { id: nota.arbitro.id } }
			model.nota = nota.nota

			const response = await post(`api/campeonatos/notas/${idInscricao}`, model)
			switch (response.status) {
				case 200:
					const nota = await response.json()
					this._view.setNota(idCategoria, idInscricao, nota)
					break
				case 403:
					console.log(response)
					break
				case 400:
					const badrequest = await response.json()
					alert(badrequest.mensagem + '. A tabela de notas será recarregada.')
					await this._consultarCampeonato({ isUpdateNotas: true })
					break
				case 500:
					const erro = await response.json()
					alert(erro.mensagem)
					break
			}
		}
	}

	applyRole() {
		this._view.applyRole()
	}

	_getView() {
		return this._view
	}

}