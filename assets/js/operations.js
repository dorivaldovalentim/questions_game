const operations = {
	questions: [],
	questions_number: 0,
	
	question_position: 1,
	current_question: null,

	getQuestions: function() {
		var url = '/assets/json/questions.json';
		var ajax = new XMLHttpRequest();
		
		ajax.open('get', url, false);
		ajax.send();

		if(ajax.status == 200) {
			this.questions = JSON.parse(ajax.responseText);
			console.log(this.questions)
		} else if(ajax.status == 404) {
			console.log('Não encontrado')
		}
	},

	showQuestions: function(question) {
		this.current_question = question;

		document.querySelector('span.question-position').innerHTML = `Pergunta ${this.question_position} / 10`;

		var structure = `
			<div class="questions-section">
				<h1 class="question-text">${this.current_question.text}</h1>
			</div>

			<div class="answer-section">
				<ul class="answer-list">
					<li class="answer-item">
						<a href="#" class="answer-link" data-correct="${this.current_question.answers[0].status}">
							<span class="answer-line">A</span>
							${this.current_question.answers[0].text}
						</a>
					</li>

					<li class="answer-item">
						<a href="#" class="answer-link" data-correct="${this.current_question.answers[1].status}">
							<span class="answer-line">B</span>
							${this.current_question.answers[1].text}
						</a>
					</li>

					<li class="answer-item">
						<a href="#" class="answer-link" data-correct="${this.current_question.answers[2].status}">
							<span class="answer-line">C</span>
							${this.current_question.answers[2].text}
						</a>
					</li>

					<li class="answer-item">
						<a href="#" class="answer-link" data-correct="${this.current_question.answers[3].status}">
							<span class="answer-line">D</span>
							${this.current_question.answers[3].text}
						</a>
					</li>
				</ul>
			</div>
		`;

		document.querySelector('section.main-section').innerHTML = structure;
	},

	changeQuestion: function(question) {
		console.log(question)
		this.incrementQuestionPosition();
		this.current_question = question;
		this.showQuestions(question);
	},

	incrementQuestionPosition() {
		this.question_position++;
	},

	loadGame: function() {
		this.getQuestions();
		this.questions_number = this.questions.length;
		this.showQuestions(this.questions[0]);
	}
};