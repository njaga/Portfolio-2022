import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HiArrowRight } from "react-icons/hi";

import './Achievement.css';
import { ThemeContext } from '../../contexts/ThemeContext';
import { achievementData } from '../../data/achievementData'
import AchievementCard from './AchievementCard';

function Achievement() {
    const { theme } = useContext(ThemeContext);
    const [showAll, setShowAll] = useState(false); // État pour contrôler l'affichage des éléments

    const useStyles = makeStyles(() => ({
        viewAllBtn: {
            color: theme.tertiary,
            backgroundColor: theme.primary,
            transition: 'color 0.2s',
            padding: '0.6rem 1.5rem',
            border: 'none',
            borderRadius: '30px',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            margin: '0 auto',
            marginTop: '2rem',
            "&:hover": {
                color: theme.secondary,
                backgroundColor: theme.primary,
            }
        },
        viewArr: {
            color: theme.tertiary,
            backgroundColor: theme.secondary70,
            width: '30px',
            height: '30px',
            padding: '0.5rem',
            fontSize: '1.05rem',
            borderRadius: '50%',
            cursor: 'pointer',
            marginLeft: '0.5rem',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            "&:hover": {
                color: theme.tertiary,
                backgroundColor: theme.secondary,
            }
        },
        buttonContainer: {
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
        }
    }));

    const classes = useStyles();

    const handleViewMore = () => {
        setShowAll(!showAll); // Alterne l'état d'affichage
    };

    return (
        <>
            {achievementData.achievements.length > 0 && (
                <div className="achievement" id="achievement" style={{backgroundColor: theme.secondary, position: 'relative'}}>
                    <div className="achievement-body">
                        <h1 style={{color: theme.primary}}>Certifications</h1>
                        <h4 style={{color:theme.tertiary}}>{achievementData.bio}</h4>
                    </div>
                    <div className="achievement-cards">
                        {achievementData.achievements.slice(0, showAll ? achievementData.achievements.length : 3).map(achieve => ( 
                            <AchievementCard 
                                key={achieve.id}
                                id={achieve.id}
                                title={achieve.title}
                                details={achieve.details}
                                date={achieve.date}
                                field={achieve.field}
                                image={achieve.image}
                            />
                        ))}
                    </div>
                    {achievementData.achievements.length > 3 && (
                        <div className={classes.buttonContainer}>
                            <button className={classes.viewAllBtn} onClick={handleViewMore}>
                                {showAll ? "Voir Moins" : "Voir Plus"}
                                <span className={classes.viewArr}>
                                    <HiArrowRight />
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Achievement;
