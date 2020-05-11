/**************************************************************************
 * Operations.css
 *
 * Folha de script responsável pelas funcionalidades avançadas da aplicação
 **************************************************************************
 *
 * Esta é uma class responsável pelas operações avançadas da aplicação. 
 */

const operations = {
	/**
	 * @class Operations
	 * 
	 * @property questions: armazena todas as perguntas do jogo
	 * @property questions_number: número de perguntas que o jogo contém
	 * @property question_position: armazena a posição da pergunta actual
	 * @property current_question: armazena a pergunta actual
	 */

	questions: [],
	questions_number: 0,
	question_position: 1,
	current_question: null,

	/**
	 * @method getQuestions()
	 * 
	 * Este método acessa um arquivo json por meio de ajax, retorna todo
	 * o seu conteúdo e armazena-o no atributo questions já convertendo-o
	 * usando JSON.parse()
	 * 
	 * @params any
	 * @return void
	 */
	getQuestions: function() {
		var url = './assets/json/questions.json';
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

	/**
	 * @method showQuestions()
	 * 
	 * Este método recebe um parâmetro (sendo este uma pergunta e suas
	 * respostas). O que o método faz é somente apresentar a pergunta
	 * e as respostas no navegador para que o jogador possa ver
	 * 
	 * @param {Object} question
	 * @return void
	 */
	showQuestions: function(question) {
		this.current_question = question;

		document.querySelector('span.question-position').innerHTML = `Pergunta ${this.question_position} / ${this.questions.length - 1}`;

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

	/**
	 * @method giveAnswer()
	 * 
	 * Como podem ver não sei bem o tipo de parâmetro que passei aqui,
	 * HTMLSelector é só uma opção.
	 * Este método recebe um selector (tag) e verifica se um certo atributo
	 * deste selector tem valor true. Caso tenha retorna true, caso contrário,
	 * false
	 * 
	 * @param {HTMLSelector} answer
	 * @return boolean
	 */
	giveAnswer: function(answer) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if(answer.getAttribute('data-correct') == 'true') {
					answer.classList.toggle('animated');
					answer.classList.toggle('correct');
					resolve(true);
				} else {
					answer.classList.toggle('animated');
					answer.classList.toggle('wrong');
					document.querySelector('[data-correct="true"]').classList.toggle('correct');
					resolve(false);
				}
			}, 2000);
		});
	},

	/**
	 * @method changeQuestion()
	 * 
	 * Este método, assim como o showQuestions() e muitos outros, recebe
	 * um objecto contendo uma pergunta. E logo depois altera o atributo 
	 * current_question para a pergunta de parâmetro e chama o método
	 * showQuestions() para apresentar a nova pergunta na tela.
	 * 
	 * @param {Object} question
	 * @return void
	 */
	changeQuestion: function(question) {
		console.log(question);
		this.current_question = question;
		this.showQuestions(question);
	},

	/**
	 * @method nextQuestion()
	 * 
	 * Este método, não recebe nenhum parâmetro e sua função principal
	 * é de avançar para a próxima pergunta. Normalmente é chamada quando
	 * o jogador acerta uma pergunta ou pula usando a ajuda do jogo
	 * 
	 * @params any
	 * @return void
	 */
	nextQuestion: function() {
		this.incrementQuestionPosition();

		if(!(this.question_position > this.questions_number - 1)) {
			this.changeQuestion(this.questions[this.question_position]);
		} else {
			alert('Está de parabéns por ter terminado o jogo');
		}
	},

	/**
	 * @method incrementQuestionPosition()
	 * 
	 * Este método nada mais faz do que incrementar o question_position
	 * 
	 * @params any
	 * @return void
	 */
	incrementQuestionPosition: function() {
		this.question_position++;
	},

	/**
	 * @method loadGame()
	 * 
	 * Este método nada mais faz do que iniciar o jogo
	 * 
	 * @params any
	 * @return void
	 */
	loadGame: function() {
		this.getQuestions();
		this.questions_number = this.questions.length;
		this.showQuestions(this.questions[0]);
	},

	/**
	 * @method restart()
	 * 
	 * Este método nada mais faz do que reiniciar o jogo quando o 
	 * jogador responde de forma incorrecta uma pergunta.
	 * 
	 * @params any
	 * @return void
	 */
	restart: function() {
		alert('Errou! Recomeçando')
		this.question_position = 1;
		this.showQuestions(this.questions[0]);
	},

	// AJUDAS DO JOGO
	/**
	 * @method skip()
	 * 
	 * Este método é uma ajuda do jogo e pula para a pergunta a seguir
	 * 
	 * @params any
	 * @return boolean
	 */
	skip: function() {
		if(!((this.question_position + 1) == this.questions_number)) {
			this.incrementQuestionPosition();
			this.changeQuestion(this.questions[this.question_position]);
			return true;
		} else {
			alert('Não pode pular');
			return false;
		}
	},

	/**
	 * @method idea()
	 * 
	 * Este método é uma ajuda do jogo e apresenta a resposta correcta
	 * 
	 * @params any
	 * @return boolean
	 */
	idea: function() {
		var answer = document.querySelector("[data-correct=true]");
		
		answer.classList.toggle('idea');

		return true;
	}
};