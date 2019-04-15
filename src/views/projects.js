import db from '../firebaseConfig'
import React, { Component } from 'react';
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
        db.database().ref().once('value').then(function(snapshot){
            return snapshot.child('projects').val();
        }).then((result) => {
            this.setState({
                pageData: result.page,
                projectItems: result.projectItems,
                projectItemsStore: result.projectItems
            });
        })
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