/**
 * 
 */
export function getIdade(nascimento) {
	const now = new Date();

	const aniversario = nascimento.split("-");
	const anos = now.getFullYear() - new Number(aniversario[0]);
	const mesAniversario = new Number(aniversario[1]);
	const diaAniversario = new Number(aniversario[2]);

	const idade = (now.getMonth() + 1 < mesAniversario || (now.getMonth() + 1 == mesAniversario && now.getDate() < diaAniversario)) ? anos - 1 : anos;

	return `${idade} anos`;
}