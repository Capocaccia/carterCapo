import {renderHeader} from '../header.js';

firebase.database().ref().once('value').then(function(snapshot) {
	return snapshot.child('home').val();
}).then((result) => {
	const buildData = result.page;
	const display = `
	${renderHeader()}
	<div class="${buildData.contentClass}" style="background-image: url('${buildData.background}'); display: flex;">
		<h2>${buildData.title}</h2>
		<p class="tagline">${buildData.tagline}</p>
		<div class="main"></div>
		<div class="navicon"></div>
	</div>
    `;
    document.querySelector('.mount').innerHTML = display;
}).then(() => {
	var navicon = document.querySelector('.navicon');
	navicon.addEventListener('click', () => {
		navicon.classList.toggle('active');
		document.querySelector('.header').classList.toggle('open');
	});
});