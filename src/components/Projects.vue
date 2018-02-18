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
                <div class="filters--clear filters-group__filter" v-on:click="clearFilters()">
                    Clear Filters
                </div>
            </div>
            <div class="filters-title active-filters" v-if="currentFilters.length > 0">
                Active Filter: <span v-for="criteria in currentFilters"> {{ criteria }},</span>
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
                currentFilters: []
            }
        },
        methods: {
            toggleMobile: function(e){
                document.querySelector('.header').classList.toggle('open');
                e.srcElement.classList.toggle('active');
            },
            updateFilter: function(e) {
                this.currentFilters.includes(e.target.innerText) ? '' : this.currentFilters.push(e.target.innerText);
            },
            clearFilters: function(){
                this.currentFilters = []
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
            currentFilters: function(){
                let criteria = this.currentFilters
                let matchedItems = []
                for(let i = 0; i < this.projectItems.length; i++){
                    let match = criteria.every((criteria) => this.projectItems[i].categories.indexOf(criteria.toLowerCase()) >= 0)
                    match ? matchedItems.push(this.projectItems[i]) : '';
                }

                let filteredItems = matchedItems.length === 0 ? this.projectItemsStore : matchedItems;
                filteredItems.length === 0 ? this.filteredItems = this.projectItemsStore : this.projectItems = filteredItems;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../scss/style.scss';
</style>
