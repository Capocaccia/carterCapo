<template>
    <div v-bind:class=pageData.contentClass v-bind:style='{ backgroundImage: "url(" + pageData.background + ")", }'>
        <h2>{{pageData.title}}</h2>
        <p class="tagline">{{pageData.tagline}}</p>
        <div class="main"></div>
        <div class="navicon"></div>
        <div class="qa">
            <div v-for="item in qa" class="content-item" v-on:click="toggleAnswer($event)">
                <div class="content-item--question">
                    {{item.question}}
                </div>
                <div class="content-item--answer">
                    {{item.answer}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import db from '../firebaseConfig'

    export default {
        name: 'About',
        data () {
            return {
                pageData: [],
                qa: []
            }
        },
        methods: {
            toggleAnswer: function(e){
                e.srcElement.children[1].classList.toggle('open');
                e.srcElement.children[0].classList.toggle('js_arrow_rotate');
            }
        },
        mounted(){
            db.database().ref().once('value').then(function(snapshot){
                return snapshot.child('about').val();
            }).then((result) => {
                this.pageData = result.page;
                this.qa = result.aboutItems;
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../scss/style.scss';
</style>
