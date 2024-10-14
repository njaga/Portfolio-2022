import React, { useContext } from 'react';
import { motion } from 'framer-motion';

import { ThemeContext } from '../../../contexts/ThemeContext';

import './SingleService.css'

function SingleService({id, title, icon}) {
    const { theme } = useContext(ThemeContext);
    
    return (
        <motion.div
            key={id}
            className="single-service"
            style={{backgroundColor:theme.primary400}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="service-content" style={{color:theme.tertiary}}>
                <i className="service-icon">{icon}</i>
                <h4 style={{color:theme.tertiary}}>{title}</h4>  
            </div>         
        </motion.div>
    )
}

export default SingleService
