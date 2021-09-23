/************************************************************************
 * Script.css
 *
 * Folha de script responsável pelas funcionalidades básicas da aplicação
 ************************************************************************
 */


// Início do jogo
operations.loadGame();
operations.showResults();

/**
 * @function answer()
 * 
 * Esta função recebe um evento a partir da função getReferences(),
 * sendo o evento uma resposta e logo depois lança para o método
 * giveAnswer da class operations que vai verificar se a resposta
 * está correcta. Caso esteja, a função também é responsável por 
 * lançar a pergunta a seguir e caso não esteja, manda o jogador
 * para o início
 * 
 * @param {event} event
 * @return void
 */
function answer(event) {
	var answer = event.target;
	answer.classList.remove('idea');
	answer.classList.toggle('animated');
	operations.giveAnswer(answer).then(response => {
		setTimeout(function() {
			if(response)
				operations.nextQuestion();
			else
				operations.restart();
		}, 1000);
	}).catch(error => alert(error));
}

/**
 * @function skip()
 * 
 * Esta função, assim como outras recebe um evento como parâmetro
 * mas, trata o evento de forma diferente. Esta função está ligada
 * a uma ajuda da class operations que pula a pergunta actual.
 * 
 * @param {event} event
 * @return void
 */
function skip(event) {
	var element = event.target;
	var parent = element.parentElement;

	parent.disabled = 'disabled';

	if(!operations.skip())
		parent.disabled = '';
}

/**
 * @function idea()
 * 
 * Esta função, assim como outras recebe um evento como parâmetro
 * mas, trata o evento de forma diferente. Esta função está ligada
 * a uma ajuda da class operations que apresenta a resposta correcta
 * da pergunta actual.
 * 
 * @param {event} event
 * @return void
 */
function idea(event) {
	var element = event.target;
	var parent = element.parentElement;

	if(operations.idea())
		parent.disabled = 'disabled';
}

function removeResult(event, result) {
	var element = event.target;
	var parent = element.parentElement.parentElement

	parent.classList.remove('slideInTop');
	parent.classList.add('slideOutDown');

	setTimeout(function() {
		parent.style.display = 'none';
		operations.removeResult(result);
	}, 1000);
}