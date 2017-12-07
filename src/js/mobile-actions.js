var navicon = document.querySelector('.navicon');
navicon.addEventListener('click', () => {
	console.log(this)
	document.querySelector('.header').classList.toggle('open');
	
});