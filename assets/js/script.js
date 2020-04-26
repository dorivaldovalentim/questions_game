window.onload = function() {
	operations.loadGame();
	var i = 1;

	document.querySelectorAll('.answer-link').forEach(key => {
		do {

			key.addEventListener('click', function() {
				this.classList.toggle('animated');
				setTimeout(() => {
					if(this.getAttribute('data-correct') == 'true') {
						i++;
						this.classList.toggle('animated');
						this.classList.toggle('correct');
						operations.changeQuestion(operations.questions[i]);
					} else {
						this.classList.toggle('animated');
						this.classList.toggle('wrong');
						document.querySelector('[data-correct="true"]').classList.toggle('correct');
					}
				}, 2000);
			});
			i++;
		} while(i < operations.questions_number);
	});
};