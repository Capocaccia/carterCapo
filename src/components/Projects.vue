<template>
    <div v-bind:class=pageData.contentClass v-bind:style='{ backgroundImage: "url(" + pageData.background + ")", }'>
        <h2>{{pageData.title}}</h2>
        <p class="tagline">{{pageData.tagline}}</p>
        <div class="main"></div>
        <div class="navicon" v-on:click="toggleMobile($event)"></div>
        <div class="filters">
            <div class="filters-title">
                Filters:
            </div>
            <div class="filters-group">
                <div class="filters-group__filter" v-for="filter in filters" v-on:click="updateFilter($event)">
                    {{ filter }}
                </div>
                <div class="filters--clear filters-group__filter" v-on:click="clearFilter()">
                    Clear Filters
                </div>
            </div>
            <div class="filters-title active-filters" v-if="currentFilter !== ''">
                Active Filter: {{ currentFilter }}
            </div>
        </div>
        <div class="project">
            <a v-for="item in projectItems" class="project--item__link" v-bind:href=item.link target="_blank">
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
                projectItems: [],
                projectItemsStore: [],
                filters: ['JavaScript', 'HTML5', 'CSS', 'Art', 'Game' ],
                currentFilter: ''
            }
        },
        methods: {
            toggleMobile: function(e){
                document.querySelector('.header').classList.toggle('open');
                e.srcElement.classList.toggle('active');
            },
            updateFilter: function(e) {
                this.currentFilter = e.target.innerText;
            },
            clearFilter: function(){
                this.currentFilter = ''
            }
        },
        mounted(){
            db.database().ref().once('value').then(function(snapshot){
                return snapshot.child('projects').val();
            }).then((result) => {
                this.pageData = result.page;
                this.projectItems = result.projectItems;
                this.projectItemsStore = result.projectItems;
            })
        },
        watch: {
            currentFilter: function(){
                let filteredItems = this.projectItemsStore.filter((projectItem) => projectItem.categories.includes(this.currentFilter.toLowerCase()))
                filteredItems.length === 0 ? this.projectItems = this.projectItemsStore : this.projectItems = filteredItems;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../scss/style.scss';
</style>
