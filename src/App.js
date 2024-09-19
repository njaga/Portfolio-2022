import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContext } from './contexts/ThemeContext';
import { Main, ProjectPage, NotFound } from './pages';
import { BackToTop } from './components';
import ScrollToTop from './utils/ScrollToTop';

import './App.css';

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
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/projects" element={<ProjectPage />} />
                    
                    {/* 404 page */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
            <BackToTop />
        </div>
    );
}

export default App;