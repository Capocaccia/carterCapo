import React, { Component } from 'react';
import axios from 'axios';
import toggleMobile from '../mixins/toggleMobile'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            pageData: null
        }
    }
    componentDidMount() {
        axios({
            url: 'http://localhost:4000/',
            method: 'post',
            data: {
              query: `
              query {
                page(title: "Carter Capocaccia") {
                    background,
                    contentClass,
                    stylingClasses,
                    tagline,
                    title
                  }
              }
                `
            }
          }).then((result) => {
            this.setState({
                pageData: result.data.data.page
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
            </div>
        )
    }
}

export default Home