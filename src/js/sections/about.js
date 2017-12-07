var config = {
    apiKey: 'AIzaSyDt7EQc_GVKqPHWGtw_nT6osO63hOB4cIs',
    databaseURL: 'https://cartercapo-a6615.firebaseio.com/',
    storageBucket: 'cartercapo-a6615'
};

firebase.initializeApp(config);

firebase.database().ref().once('value').then(function(snapshot) {
	return snapshot.child('about').val();
}).then((result) => {
	const buildData = result.page;
	const aboutItems = result.aboutItems;
	const display = `
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
		<button class="build_button">Build Your Own!</button>
		<div class="build_your_own">
			<input class="question" type="text" placeholder="Question">
			<input class="answer" type="text" placeholder="Answer">
			<button class="submitItem">
				Build
			</button>
		</div>
		<div class="main"></div>
		<div class="navicon"></div>
	</div>`
    document.querySelector('.mount').innerHTML = display;
}).then(() => {
	let questions = document.querySelectorAll('.content-item');
	questions.forEach((item) => {
		item.addEventListener('click', (item)=>{
			item.target.children[1].classList.toggle('open');
			item.target.children[0].classList.toggle('js_arrow_rotate');
		})
	})
});

