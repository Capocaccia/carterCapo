<template>
  <div v-bind:class=pageData.contentClass v-bind:style='{ backgroundImage: "url(" + pageData.background + ")", }'>
    <h2>{{pageData.title}}</h2>
    <p class="tagline">{{pageData.tagline}}</p>
    <div class="main"></div>
    <div class="navicon" v-on:click="toggleMobile($event)"></div>
  </div>
</template>

<script>

import db from '../firebaseConfig'

export default {
  name: 'Home',
  data () {
    return {
      pageData: []
    }
  },
  methods: {
    toggleMobile: function(e){
      document.querySelector('.header').classList.toggle('open');
      e.srcElement.classList.toggle('active');
    }
  },
  mounted(){
    db.database().ref().once('value').then(function(snapshot){
      return snapshot.child('home').val();
    }).then((result) => {
      this.pageData = result.page;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../scss/style.scss';
</style>
