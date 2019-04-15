import db from '../firebaseConfig'
import React, {Component} from 'react'
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
        db.database().ref().once('value').then(function(snapshot){
            return snapshot.child('contact').val();
        }).then((result) => {
            this.setState({
                pageData: result.page,
                contactItems: result.contactItems
            });
        })
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