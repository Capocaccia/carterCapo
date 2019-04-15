import React, { Component } from 'react';

class projectsList extends Component {
    constructor() {
        super()
        this.state = {
            projectItems: [],
            filters: []
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.projectItems.length !== this.props.projectItems.length){
            this.setState({
                projectItems: nextProps.projectItems
            });
        }
    }

    componentDidMount() {
        this.setState( {
            projectItems: this.props.projectItems
        })
    }

    render() {

        const projects = this.state.projectItems.map((project, idx) =>
            <a className="project--item__link" href={project.link} target="_blank" rel="noopener noreferrer" key={idx}>
                <div className="project--item">
                    <h3 className="project--item__title">
                        {project.title}
                    </h3>
                    <p className="project--item__description">
                        {project.description}
                    </p>
                    <div className="background" style={{backgroundImage: `url(${project.image})`}}>
                    </div>
                </div>
            </a>
        )

        const filters = ['JavaScript', 'HTML5', 'PHP', 'MySQL', 'CSS', 'Art', 'Game', 'Vue' ]

        const removeFilter = (tag) => {
            //return all filters that dont match the tag
            let result = this.state.filters.filter((item) => item.toLowerCase() !== tag.toLowerCase())

            //if there are no filters applied after the removal, show all projects
            if(result.length === 0) {
                showAllProjects()
            } else {
                //if there are filters still applied, reset the filters
                this.setState({
                    filters: result
                })

                applyFilters(false)
            }
        }

        const showAllProjects = () => {
            this.setState({
                projectItems: this.props.projectItems
            })
        }

        const resetAll = () => {
            this.setState({
                projectItems: this.props.projectItems,
                filters: []
            })
        }

        const applyFilters = (tag) => {
            if(tag && this.state.filters.includes(tag)) {
                removeFilter(tag)
            } else if(tag) {
                this.state.filters.push(tag)
            }

            let criteria = this.state.filters
            // if there are filters applied, then filter

            if (criteria.length > 0) {

                let matchedItems = this.props.projectItems.filter((project) => criteria.every((criteria) => project.categories.indexOf(criteria.toLowerCase()) >= 0))

                console.log(matchedItems)

                this.setState({
                    projectItems: matchedItems
                })

            }

        }

        const filterClassName = (filter) => {
            let className = this.state.filters.includes(filter) ? 'filters-group__filter active' : 'filters-group__filter'
            return className
        }

        const filterComp = filters.map((filter, idx) =>
            <div className={filterClassName(filter)}
                 onClick={() => applyFilters(filter)}
                 key={idx}>
                {filter}
            </div>
        )

        return (
            <div className='projects-wrapper'>
                <div className="filters">
                    <div className="filters-title">
                        Filters:
                    </div>
                    <div className="filters-group">
                        {filterComp}
                        <div className="filters--clear filters-group__filter" onClick={resetAll}>
                            Clear Filters
                        </div>
                    </div>
                </div>
                <div className="project">
                    {projects.length > 0 ? projects : <div className="filters-title">No Matches Found</div>}
                </div>
            </div>
        )
    }
}

export default projectsList