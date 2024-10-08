import React, { useContext, useEffect } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-scroll";
import { makeStyles } from "@material-ui/core/styles";

import "./Landing.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { headerData } from "../../data/headerData";
import { socialsData } from "../../data/socialsData";

import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

function Landing() {
    const { theme, drawerOpen } = useContext(ThemeContext);

    const useStyles = makeStyles((t) => ({
        resumeBtn: {
            color: theme.primary,
            borderRadius: "30px",
            textTransform: "inherit",
            textDecoration: "none",
            width: "150px",
            fontSize: "1rem",
            fontWeight: "500",
            height: "50px",
            fontFamily: "var(--primaryFont)",
            border: `3px solid ${theme.primary}`,
            transition: "100ms ease-out",
            "&:hover": {
                backgroundColor: theme.tertiary,
                color: theme.secondary,
                border: `3px solid ${theme.tertiary}`,
            },
            [t.breakpoints.down("sm")]: {
                width: "180px",
            },
        },
        contactBtn: {
            backgroundColor: theme.primary,
            color: theme.secondary,
            borderRadius: "30px",
            textTransform: "inherit",
            textDecoration: "none",
            width: "150px",
            height: "50px",
            fontSize: "1rem",
            fontWeight: "500",
            fontFamily: "var(--primaryFont)",
            border: `3px solid ${theme.primary}`,
            transition: "100ms ease-out",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
                backgroundColor: theme.secondary,
                color: theme.tertiary,
                border: `3px solid ${theme.tertiary}`,
            },
            [t.breakpoints.down("sm")]: {
                display: "none",
            },
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        document.documentElement.style.scrollBehavior = "smooth";
        return () => {
            document.documentElement.style.scrollBehavior = "";
        };
    }, []);

    return (
        <div className="landing">
            <div className="landing--container">
                <div
                    className="landing--container-left"
                    style={{ backgroundColor: theme.primary }}
                >
                    <div className="lcl--content">
                        {socialsData.github && (
                            <a href={socialsData.github} target="_blank" rel="noreferrer">
                                <FaGithub
                                    className="landing--social"
                                    style={{ color: theme.secondary }}
                                    aria-label="Github"
                                />
                            </a>
                        )}
                        {socialsData.linkedIn && (
                            <a href={socialsData.linkedIn} target="_blank" rel="noreferrer">
                                <FaLinkedin
                                    className="landing--social"
                                    style={{ color: theme.secondary }}
                                    aria-label="LinkedIn"
                                />
                            </a>
                        )}
                        {socialsData.twitter && (
                            <a href={socialsData.twitter} target="_blank" rel="noreferrer">
                                <FaTwitter
                                    className="landing--social"
                                    style={{ color: theme.secondary }}
                                    aria-label="Twitter"
                                />
                            </a>
                        )}
                        {socialsData.facebook && (
                            <a href={socialsData.facebook} target="_blank" rel="noreferrer">
                                <FaFacebook
                                    className="landing--social"
                                    style={{ color: theme.secondary }}
                                    aria-label="Facebook"
                                />
                            </a>
                        )}
                    </div>
                </div>
                <img
                    src={headerData.image}
                    alt="Ndiaga Ndiaye"
                    className="landing--img"
                    style={{
                        opacity: `${drawerOpen ? "0" : "1"}`,
                        borderColor: theme.secondary,
                    }}
                />
                <div
                    className="landing--container-right"
                    style={{ backgroundColor: theme.secondary }}
                >
                    <div className="lcr--content" style={{ color: theme.tertiary }}>
                        <h6>{headerData.title}</h6>
                        <h1>{headerData.name}</h1>
                        <p>{headerData.desciption}</p>

                        <div className="lcr-buttonContainer">
                            {headerData.resumePdf && (
                                <a
                                    href={headerData.resumePdf}
                                    download="CV Ndiaga"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Button className={classes.resumeBtn}>Voir mon CV</Button>
                                </a>
                            )}
                            <Link
                                to="contacts"
                                smooth={true}
                                duration={500}
                                className={classes.contactBtn}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
