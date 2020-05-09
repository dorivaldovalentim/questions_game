operations.loadGame();

getReferences();

function getReferences() {
	document.querySelectorAll('.answer-link').forEach(key => {
		key.addEventListener('click', answer);
	});

	console.log(document.querySelectorAll('.answer-link'))
}

function answer(event) {
	var answer = event.target;
	answer.classList.toggle('animated');
	operations.giveAnswer(answer).then(response => {
		if(response)
			operations.nextQuestion();
		else
			operations.restart();
		
		getReferences();
	}).catch(error => console.log(error));
}

function skip(event) {
	var element = event.target;
	var parent = element.parentElement;
	
	if(operations.skip())
		parent.disabled = 'disabled';
		
	getReferences();
}