import React, { Component } from 'react';
import axios from 'axios';
import Projectlist from '../components/projectsList'
import toggleMobile from '../mixins/toggleMobile'

class Projects extends Component {
    constructor() {
        super()
        this.state = {
            pageData: null,
            projectItems: null,
            projectItemsStore: null
        }
    }
    componentDidMount() {
        axios({
            url: 'http://localhost:4000/',
            method: 'post',
            data: {
              query: `
              query {
                page(title: "Projects") {
                    background,
                    contentClass,
                    stylingClasses,
                    tagline,
                    title
                },
                projectItems {
                    description,
                    image,
                    link,
                    title
                }
              }
                `
            }
          }).then((result) => {
            this.setState({
                pageData: result.data.data.page,
                projectItems: result.data.data.projectItems
            });
          });
    }
    render() {
        return (
            <div className={this.state.pageData ? this.state.pageData.contentClass : ''}
                 style={{backgroundImage: `url(${this.state.pageData ? this.state.pageData.background : ''})`}}>
                <h2>{this.state.pageData ? this.state.pageData.title : ''}</h2>
                <p className="tagline">{this.state.pageData ? this.state.pageData.tagline : ''}</p>
                <div className="main"></div>
                <div className="navicon" onClick={() => toggleMobile()}></div>
                <Projectlist projectItems={this.state.projectItems ? this.state.projectItems : []}>
                </Projectlist>
            </div>
        )
    }
}

export default Projects