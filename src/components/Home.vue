<template>
  <div v-bind:class=pageData.contentClass v-bind:style="{ backgroundImage: 'url(' + pageData.background + ')' }">
    <h2>{{pageData.title}}</h2>
    <p class="tagline">{{pageData.tagline}}</p>
    <div class="main"></div>
    <div class="navicon"></div>
  </div>
</template>

<script>

import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDt7EQc_GVKqPHWGtw_nT6osO63hOB4cIs',
  databaseURL: 'https://cartercapo-a6615.firebaseio.com/',
  storageBucket: 'cartercapo-a6615'
}


let app = firebase.initializeApp(config);
export default {
  name: 'HelloWorld',
  data () {
    return {
      pageData: []
    }
  },
  mounted(){
    app.database().ref().once('value').then(function(snapshot){
      return snapshot.child('home').val();
    }).then((result) => {
      this.pageData = result.page;
  })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
