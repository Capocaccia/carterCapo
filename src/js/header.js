var config = {
    apiKey: 'AIzaSyDt7EQc_GVKqPHWGtw_nT6osO63hOB4cIs',
    databaseURL: 'https://cartercapo-a6615.firebaseio.com/',
    storageBucket: 'cartercapo-a6615'
};

firebase.initializeApp(config);

export const renderHeader = () => {
	return `<header class="header">
		    <a href="/index.html" class="section Carter Capocaccia section-home">
		      <p class="title">Carter Capocaccia</p>
		    </a>
		    <a href="/about.html" class="section About section-second">
		      <p class="title">About</p>
		    </a>
		    <a href="/projects.html" class="section Projects section-third">
		      <p class="title">Projects</p>
		    </a>
		    <a href="/connect.html" class="section Connect section-first">
		      <p class="title">Connect</p>
		    </a>
		  </header>
			<!-- Global site tag (gtag.js) - Google Analytics -->
			<script async src="https://www.googletagmanager.com/gtag/js?id=UA-112016254-1"></script>
			<script>
			  window.dataLayer = window.dataLayer || [];
			  function gtag(){dataLayer.push(arguments);}
			  gtag('js', new Date());

			  gtag('config', 'UA-112016254-1');
			</script>
		  `;
}