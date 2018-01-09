import {renderHeader} from '../header.js';

firebase.database().ref().once('value').then(function(snapshot) {
	return snapshot.child('about').val();
}).then((result) => {
	const buildData = result.page;
	const aboutItems = Array.isArray(result.aboutItems) ? result.aboutItems : Object.values(result.aboutItems);
	const display = `
	${renderHeader()}
	<div class="${buildData.contentClass}" style="background-image: url('${buildData.background}'); display: flex;">
		<h2>${buildData.title}</h2>
		<p class="tagline">${buildData.tagline}</p>
		<div class="qa">
			  ${aboutItems.map((item) => `
        	<div class="content-item">
				<div class="content-item--question">
					${item.question}
				</div>
				<div class="content-item--answer">
					${item.answer}
				</div>
			</div>`).join('')};
		</div>
		<div class="main"></div>
		<div class="navicon"></div>
	</div>`
    document.querySelector('.mount').innerHTML = display;
}).then(() => {
	let questions = document.querySelectorAll('.content-item');
	questions.forEach((item) => {
		item.addEventListener('click', (item)=>{
			item.currentTarget.children[1].classList.toggle('open');
			item.currentTarget.children[0].classList.toggle('js_arrow_rotate');
		})
	})
}).then(() => {
	var navicon = document.querySelector('.navicon');
	navicon.addEventListener('click', () => {
		navicon.classList.toggle('active');
		document.querySelector('.header').classList.toggle('open');
	});
});

