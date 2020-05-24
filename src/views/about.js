import React, { Component } from 'react';
import axios from 'axios';
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
        axios({
            url: 'http://localhost:4000/',
            method: 'post',
            data: {
              query: `
              query {
                page(title: "About") {
                    background,
                    contentClass,
                    stylingClasses,
                    tagline,
                    title
                },
                aboutItems {
                    answer,
                    question
                }
              }
                `
            }
          }).then((result) => {
            this.setState({
                pageData: result.data.data.page,
                qa: result.data.data.aboutItems
            });
          });
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


