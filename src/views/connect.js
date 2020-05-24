import React, {Component} from 'react'
import axios from 'axios';
import toggleMobile from "../mixins/toggleMobile";

class Connect extends Component {
    constructor() {
        super()
        this.state = {
            pageData: null,
            contactItems: []
        }
    }
    componentDidMount() {
        axios({
            url: 'http://localhost:4000/',
            method: 'post',
            data: {
              query: `
              query {
                page(title: "Connect") {
                    background,
                    contentClass,
                    stylingClasses,
                    tagline,
                    title
                },
                contactItems {
                    icon,
                    link,
                    title
                }
              }
                `
            }
          }).then((result) => {
            this.setState({
                pageData: result.data.data.page,
                contactItems: result.data.data.contactItems
            });
          });
    }
    render() {
        let items = this.state.contactItems.map((item, idx) => {
            return  <div key={idx} className='contactItem'>
                <p className="title">
                    {item.title}
                </p>
                <a className="project--item__link" href={item.link}>
                    <img src={item.icon} alt={item.email}></img>
                </a>
            </div>
        })

        return (
            <div className={this.state.pageData ? this.state.pageData.contentClass : ''}
                 style={{backgroundImage: `url(${this.state.pageData ? this.state.pageData.background : ''})`}}>
                <h2>{this.state.pageData ? this.state.pageData.title : ''}</h2>
                <p className="tagline">{this.state.pageData ? this.state.pageData.title : ''}</p>
                <div className="main"></div>
                <div className="navicon" onClick={() => toggleMobile()}></div>
                <div className="contact">
                    {items}
                </div>
            </div>
        )
    }
}

export default Connect