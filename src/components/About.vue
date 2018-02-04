<template>
    <div v-bind:class=pageData.contentClass :style="{'background-image': `url(${require('../assets/images/blue_blocks.jpg')})`}">
        <h2>{{pageData.title}}</h2>
        <p class="tagline">{{pageData.tagline}}</p>
        <div class="main"></div>
        <div class="navicon"></div>
    </div>
</template>

<script>

    import db from '../firebaseConfig'

    export default {
        name: 'About',
        data () {
            return {
                pageData: []
            }
        },
        mounted(){
            db.database().ref().once('value').then(function(snapshot){
                return snapshot.child('about').val();
            }).then((result) => {
                this.pageData = result.page;
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../scss/modules/_utility.scss';
    @import '../scss/modules/_page-content.scss';
    @import '../scss/modules/_content-items-qa.scss';
</style>
