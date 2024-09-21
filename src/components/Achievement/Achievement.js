import React, { useState, useContext, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HiArrowRight, HiArrowUp } from "react-icons/hi";

import './Achievement.css';
import { ThemeContext } from '../../contexts/ThemeContext';
import { achievementData } from '../../data/achievementData'
import AchievementCard from './AchievementCard';

function Achievement() {
    const { theme } = useContext(ThemeContext);
    const [showAll, setShowAll] = useState(false);
    const achievementRef = useRef(null);
    const fourthElementRef = useRef(null);

    const useStyles = makeStyles(() => ({
        viewAllBtn: {
            color: theme.tertiary,
            backgroundColor: theme.primary,
            transition: 'color 0.2s',
            padding: '0.6rem 0.6rem',
            border: 'none',
            borderRadius: '45px',
            fontSize: '1.05rem',
            fontFamily: 'var(--primaryFont)',
            fontWeight: 500,
            cursor: 'pointer',
            textTransform: 'inherit',
            width: '150px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            "&:hover": {
                color: theme.secondary,
                backgroundColor: theme.primary,
            }
        },
        viewArr: {
            color: theme.tertiary, 
            backgroundColor: theme.secondary70,
            width: '40px',
            height: '40px',
            padding: '0.5rem',
            fontSize: '1.05rem',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
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
            alignItems: 'center',
            '@media (max-width: 600px)': {
                position: 'relative',
                bottom: 'auto',
                right: 'auto',
                justifyContent: 'center',
                marginTop: '2rem',
            }
        }
    }));

    const classes = useStyles();

    const handleViewToggle = () => {
        setShowAll(!showAll);
    };

    useEffect(() => {
        if (showAll && fourthElementRef.current) {
            // Scroll to the fourth element when "Voir Plus" is clicked
            fourthElementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (!showAll && achievementRef.current) {
            // Scroll to the top of the achievement section when "Voir Moins" is clicked
            achievementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [showAll]);

    return (
        <>
            {achievementData.achievements.length > 0 && (
                <div ref={achievementRef} className="achievement" id="achievement" style={{backgroundColor: theme.secondary, position: 'relative'}}>
                    <div className="achievement-body">
                        <h1 style={{color: theme.primary}}>Certifications</h1>
                        <h4 style={{color:theme.tertiary}}>{achievementData.bio}</h4>
                    </div>
                    <div className="achievement-cards">
                        {achievementData.achievements.slice(0, showAll ? achievementData.achievements.length : 3).map((achieve, index) => ( 
                            <div key={achieve.id} ref={index === 3 ? fourthElementRef : null}>
                                <AchievementCard 
                                    id={achieve.id}
                                    title={achieve.title}
                                    details={achieve.details}
                                    date={achieve.date}
                                    field={achieve.field}
                                    image={achieve.image}
                                />
                            </div>
                        ))}
                    </div>
                    {achievementData.achievements.length > 3 && (
                        <div className={classes.buttonContainer}>
                            <button className={classes.viewAllBtn} onClick={handleViewToggle}>
                                <span className={classes.buttonText}>
                                    {showAll ? 'Voir Moins' : 'Voir Plus'}
                                </span>
                                {showAll ? (
                                    <HiArrowUp className={classes.viewArr} />
                                ) : (
                                    <HiArrowRight className={classes.viewArr} />
                                )}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Achievement;