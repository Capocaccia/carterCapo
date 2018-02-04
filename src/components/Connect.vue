<template>
    <div v-bind:class=pageData.contentClass v-bind:style="{ backgroundImage: 'url(' + pageData.background + ')' }">
        <h2>{{pageData.title}}</h2>
        <p class="tagline">{{pageData.tagline}}</p>
        <div class="main"></div>
        <div class="navicon"></div>
        <div class="contact">
            <div class="contactItem" v-for="item in contactItems">
                <p class="title">
                    {{item.title}}
                </p>
                <a class="project--item__link" v-bind:href=item.link>
                    <img v-bind:src=item.icon v-bind:alt=item.email>
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
    @import '../scss/modules/_utility.scss';
    @import '../scss/modules/_header.scss';
    @import '../scss/modules/_mobile-nav.scss';
    @import '../scss/modules/_page-content.scss';
    @import '../scss/modules/_contact.scss';
</style>
