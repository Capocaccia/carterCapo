<template>
    <div v-bind:class=pageData.contentClass v-bind:style="{ backgroundImage: 'url(' + pageData.background + ')' }">
        <h2>{{pageData.title}}</h2>
        <p class="tagline">{{pageData.tagline}}</p>
        <div class="main"></div>
        <div class="navicon"></div>
        <div class="project" v-for="item in projectItems">
            <a class="project--item__link" v-bind:href=item.link target="_blank">
                <div class="project--item">
                    <h3 class="project--item__title">
                        {{item.title}}
                    </h3>
                    <p class="project--item__description">
                        {{item.description}}
                    </p>
                    <div class="background" v-bind:style="{ backgroundImage: 'url(' + item.image + ')' }">
                    </div>
                </div>
            </a>
        </div>
    </div>

</template>

<script>

    import db from '../firebaseConfig'

    export default {
        name: 'Projects',
        data () {
            return {
                pageData: [],
                projectItems: []
            }
        },
        mounted(){
            db.database().ref().once('value').then(function(snapshot){
                return snapshot.child('projects').val();
            }).then((result) => {
                this.pageData = result.page;
                this.projectItems = result.projectItems;
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../scss/modules/_utility.scss';
    @import '../scss/modules/_header.scss';
    @import '../scss/modules/_mobile-nav.scss';
    @import '../scss/modules/_page-content.scss';
    @import '../scss/modules/_projects.scss';
</style>
