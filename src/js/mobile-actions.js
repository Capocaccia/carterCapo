var navicon = document.querySelector('.navicon');
navicon.addEventListener('click', () => {
	document.querySelector('.header').classList.toggle('open');
});