window.onload = function() {
	document.querySelectorAll('.answer-link').forEach(key => {
		key.addEventListener('click', function() {
			this.classList.toggle('animated');
			setTimeout(() => {
				console.log(this)
				if(this.getAttribute('data-correct') == 'true') {
					this.classList.toggle('animated');
					this.classList.toggle('correct');
				} else {
					this.classList.toggle('animated');
					this.classList.toggle('wrong');
				}
			}, 2000);
		});
	});
};