import React from 'react'
import { Helmet } from 'react-helmet'
import ThemeContextProvider from '../../contexts/ThemeContext'
import { Navbar, Footer, Landing, About, Skills, Education, Experience, Contacts, Projects, Services, Achievement } from '../../components'
import { headerData } from '../../data/headerData'
import ThemeSwitch from '../../components/Themes/ThemeSwitch';

function Main() {
    return (
        <ThemeContextProvider>
            <div>
                <Helmet>
                    <title>{headerData.name} - Portfolio</title>
                </Helmet>

                <Navbar />        
                <Landing />
                <About />
                <Education />
                <Skills />
                <Experience />
                <Projects />
                <Achievement />
                <Services />
                <Contacts />
                <Footer />
                <ThemeSwitch />
            </div>
        </ThemeContextProvider>
    )
}

export default Main