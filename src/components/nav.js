import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../views/home'
import Connect from '../views/connect'
import About from '../views/about'
import Projects from '../views/projects'

function AppRouter() {
    return (
        <Router>
            <header className="header">
                <Link to="/" className="section Carter Capocaccia section-home">
                    <p className="title"> Home </p>
                </Link>
                <Link to="/about" className="section Carter Capocaccia section-second">
                    <p className="title">About</p>
                </Link>
                <Link to='/projects' className="section Carter Capocaccia section-first">
                    <p className="title"> Projects </p>
                </Link>
                <Link to="/connect" className="section Carter Capocaccia section-third">
                    <p className="title"> Connect </p>
                </Link>
            </header>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/connect" component={Connect} />
            <Route path="/projects" component={Projects} />
        </Router>
    );
}

export default AppRouter;