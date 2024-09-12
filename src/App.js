import React, { useContext, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

import { ThemeContext } from "./contexts/ThemeContext";
import { Main, BlogPage, ProjectPage } from "./pages";
import { BackToTop } from "./components";
import ScrollToTop from "./utils/ScrollToTop";

import "./App.css";

function App() {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        console.log(
            "%cNdiaga Ndiaye",
            `color:${theme.primary}; font-size:50px`
        );
        console.log(
            "%chttps://github.com/njaga",
            `color:${theme.tertiary}; font-size:20px`
        );
    }, [theme]);

    return (
        <div className="app">
            <Router>
                <ScrollToTop />
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/blog" exact component={BlogPage} />
                    <Route path="/projects" exact component={ProjectPage} />

                    <Redirect to="/" />
                </Switch>
            </Router>
            <BackToTop />
        </div>
    );
}

export default App;
