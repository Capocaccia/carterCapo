var config = {
    apiKey: 'AIzaSyDt7EQc_GVKqPHWGtw_nT6osO63hOB4cIs',
    databaseURL: 'https://cartercapo-a6615.firebaseio.com/',
    storageBucket: 'cartercapo-a6615'
};

firebase.initializeApp(config);

firebase.database().ref().once('value').then(function(snapshot) {
	return snapshot.child('projects').val();
}).then((result) => {
	const buildData = result.page;
    const projectItems = result.projectItems;
	const display = `
	<div class="${buildData.contentClass}" style="background-image: url('${buildData.background}'); display: flex;">
		<h2>${buildData.title}</h2>
		<p class="tagline">${buildData.tagline}</p>
		<div class="main"></div>
		<div class="navicon"></div>
		<div class="project">
		  ${projectItems.map(item => `
		  	<a class="project--item__link" href="${item.link}" target="_blank">
	        	<div class="project--item">
					<h3 class="project--item__title">
						${item.title}
					</h3>
					<p class="project--item__description">
						${item.description}
					</p>
					<div class="background" style="background-image: url(${item.image});">
					</div>
				</div>
			</a>`).join('')}
		  </div>
	</div>
    `;
    document.querySelector('.mount').innerHTML = display;
});

