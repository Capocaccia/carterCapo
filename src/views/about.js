import db from '../firebaseConfig'
import React, { Component } from 'react';
import Qaitems from '../components/qaItem'
import toggleMobile from "../mixins/toggleMobile";

class About extends Component {
    constructor() {
        super()
        this.state = {
            pageData: null,
            qa: null
        }
    }
    componentDidMount() {
        db.database().ref().once('value').then(function(snapshot){
            return snapshot.child('about').val();
        }).then((result) => {
            this.setState({
                pageData: result.page,
                qa: result.aboutItems
        });
        })
    }
    render() {
        return (
            <div className={this.state.pageData ? this.state.pageData.contentClass : ''}
                 style={{backgroundImage: `url(${this.state.pageData ? this.state.pageData.background : ''})`}}>
                <h2>{this.state.pageData ? this.state.pageData.title : '' }</h2>
                <p className="tagline">{this.state.pageData ? this.state.pageData.tagline : '' }</p>
                <div className="main"></div>
                <div className="navicon" onClick={() => toggleMobile()}></div>
                <div className="qa">
                    <Qaitems qas={this.state.qa ? this.state.qa : []}/>
                </div>
            </div>
        )
    }
}

export default About


