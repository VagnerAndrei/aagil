/**
 * 
 */
import { Modal } from './../../../components/custom/Modal.js'
import { AtletaFormController } from './../controller/AtletaFormController.js'

export class SelecionarAtletaView extends Modal {

	constructor({ titulo, callBackHandlerFn }) {
		super(titulo || 'Selecionar Atleta')
		this._selectAtleta = document.querySelector('#select-atleta')
		this._buttonAtualizarAtletas = document.querySelector('#button-atualizar-atletas')
		this._buttonSelecionar = document.querySelector('#button-selecionar')
		this._buttonCriarNovo = document.querySelector('#button-criar-novo')

		this._callBackHandlerFn = callBackHandlerFn
		this._configureSelectAtleta()
		this._configureCriarNovoAtleta()
		this._configureSelecionarAtleta()
	}

	_template() {
		return `
		<form name="form-selecionar-atleta" id="form-selecionar-atleta">
			<div class="form-item">
				<label>Atleta:</label>
				<select id="select-atleta"></select>
				<button id="button-atualizar-atletas" class="botao-atualizar botao-lista" type="button" title="Atualizar Lista"></button>
			</div>
			<button id="button-selecionar" type="button" disabled>Selecionar</button>
			<button id="button-criar-novo" type="button">Criar novo atleta</button>
		</form>
				`
	}

	_configureSelectAtleta() {
		this._selectAtleta.addEventListener('change', (event) => {
			this._selectAtletaChange(event)
		})
	}

	_configureCriarNovoAtleta() {
		this._buttonCriarNovo.addEventListener('click', () => {
			new AtletaFormController({ atleta: undefined, callbackHandler: this._callBackHandlerFn, isAdminForm: true })
		})
	}

	_configureSelecionarAtleta() {
		this._buttonSelecionar.addEventListener('click', () => {
			this._callBackHandlerFn({ id: this._selectAtleta.value, nome: this._selectAtleta.options[this._selectAtleta.selectedIndex].label })
			this.fecharModal()
		})
	}

	_selectAtletaChange(event) {
		this._buttonSelecionar.disabled = event.target.value ? false : true
	}

	async configureRefreshListaAtleta(command) {
		this._buttonAtualizarAtletas.addEventListener('click', async () => {
			await command()
			this._selectAtleta.dispatchEvent(new Event('change'))
		})
		await command()
	}

	setupListaAtletas(atletas) {
		this._selectAtleta.innerHTML = ''
		const option = document.createElement('option')
		option.label = 'Selecione...'
		this._selectAtleta.appendChild(option)
		atletas.forEach(atleta => {
			const option = document.createElement('option')
			option.value = atleta.id
			option.label = atleta.nome
			this._selectAtleta.appendChild(option)
		})
	}
}