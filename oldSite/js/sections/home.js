import {renderHeader} from '../header.js';

firebase.database().ref().once('value').then(function(snapshot) {
	return snapshot.child('home').val();
}).then((result) => {
	const buildData = result.page;
	const display = `
	${renderHeader()}

    `;
    document.querySelector('.mount').innerHTML = display;
}).then(() => {
	var navicon = document.querySelector('.navicon');
	navicon.addEventListener('click', () => {
		navicon.classList.toggle('active');
		document.querySelector('.header').classList.toggle('open');
	});
});