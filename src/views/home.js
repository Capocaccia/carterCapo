import db from '../firebaseConfig'
import React, { Component } from 'react';
import toggleMobile from '../mixins/toggleMobile'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            pageData: null
        }
    }
    componentDidMount() {
        db.database().ref().once('value').then(function(snapshot){
            return snapshot.child('home').val();
        }).then((result) => {
            this.setState({
                pageData: result.page
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
            </div>
        )
    }
}

export default Home