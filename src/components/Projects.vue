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
            <div class="filters-title active-filters" v-if="projectItems.length === 0">
                {{ noMatchedItems }}
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
                filters: ['JavaScript', 'HTML5', 'CSS', 'Art', 'Game', 'Vue' ],
                currentFilters: [],
                noMatchedItems: ''
            }
        },
        methods: {
            toggleMobile: function(e){
                document.querySelector('.header').classList.toggle('open');
                e.srcElement.classList.toggle('active');
            },
            updateFilter: function(e) {
                if(this.currentFilters.includes(e.target.innerText)) {
                    e.target.classList.toggle('active')
                    let filterToRemove = this.currentFilters.indexOf(e.target.innerText)
                    this.currentFilters.splice(filterToRemove, 1)
                } else {
                    e.target.classList.toggle('active')
                    this.currentFilters.push(e.target.innerText)
                }

            },
            clearFilters: function(){

                let filters = document.querySelectorAll('.filters-group__filter');
                filters.forEach((filter) => {
                    filter.classList.remove('active')
                })
                this.currentFilters = []
                this.noMatchedItems = ''
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
                // if there are filters applied, then filter
                if (this.currentFilters.length > 0) {

                    let matchedItems = this.projectItemsStore.filter((project) => criteria.every((criteria) => project.categories.indexOf(criteria.toLowerCase()) >= 0))

                    //if there are no matched items, empty out filteredItems and add 'No items found' to current filters
                    if (matchedItems.length === 0) {
                        this.projectItems = []

                        // if there are no matches, display no matches message
                        this.noMatchedItems = 'No matches found.'
                    }

                    // if there are matched items, display them
                    if (matchedItems.length > 0) {
                        this.projectItems = matchedItems
                    }

                }

                // if there are no filters applied, display all items
                if (this.currentFilters.length === 0) {
                    this.projectItems = this.projectItemsStore
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../scss/style.scss';
</style>
