window.onload = function() {
	operations.loadGame();

	getReferences();

	function getReferences() {
		document.querySelectorAll('.answer-link').forEach(key => {
			key.addEventListener('click', answer);
		});
	}

	function answer(event) {
		var answer = event.target;
		answer.classList.toggle('animated');
		operations.giveAnswer(answer).then(response => {
			setTimeout(function() {
				if(response)
					operations.changeQuestion(operations.questions[operations.question_position]);
				else
					operations.restart();
			}, 1000);
			getReferences();
		}).catch(error => console.log(error));
		/* setTimeout(() => {
			if(answer.getAttribute('data-correct') == 'true') {
				answer.classList.toggle('animated');
				answer.classList.toggle('correct');
				operations.changeQuestion(operations.questions[operations.question_position]);
			} else {
				answer.classList.toggle('animated');
				answer.classList.toggle('wrong');
				document.querySelector('[data-correct="true"]').classList.toggle('correct');
				alert('Você errou! Você vai recomeçar o jogo')
				operations.restart();
			}
		}, 2000); */

	}

};