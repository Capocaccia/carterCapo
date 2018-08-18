<template>
    <div :class=pageData.contentClass :style='{ backgroundImage: "url(" + pageData.background + ")", }'>
        <h2>{{pageData.title}}</h2>
        <p class="tagline">{{pageData.tagline}}</p>
        <div class="main"></div>
        <div class="navicon" v-on:click="toggleMobile($event)"></div>
        <div class="contact">
            <div class="contactItem" v-for="item in contactItems">
                <p class="title">
                    {{item.title}}
                </p>
                <a class="project--item__link" v-bind:href=item.link>
                    <img :src=item.icon :alt=item.email>
                </a>
            </div>
        </div>
    </div>
</template>

<script>

    import db from '../firebaseConfig'

    export default {
        name: 'Connect',
        data () {
            return {
                pageData: [],
                contactItems: []
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
                return snapshot.child('contact').val();
            }).then((result) => {
                this.pageData = result.page;
                this.contactItems = result.contactItems;
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/style.scss';
</style>
