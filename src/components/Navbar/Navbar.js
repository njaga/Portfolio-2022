import React, { useContext, useState } from "react";
import { NavHashLink as NavLink } from "react-router-hash-link";
import { motion, AnimatePresence } from "framer-motion";
import { IoMenuSharp, IoHomeSharp } from "react-icons/io5";
import { HiDocumentText } from "react-icons/hi";
import { BsFillGearFill } from "react-icons/bs";
import { MdPhone } from "react-icons/md";
import { FaUser, FaCode } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CloseIcon from "@material-ui/icons/Close";
import ThemeSwitch from '../../components/Themes/ThemeSwitch';

import "./Navbar.css";
import { headerData } from "../../data/headerData";
import { ThemeContext } from "../../contexts/ThemeContext";

function Navbar() {
    const { theme, handleDrawer } = useContext(ThemeContext);

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
        if (handleDrawer) {
            handleDrawer();
        }
    };

    const handleDrawerClose = () => {
        setOpen(false);
        if (handleDrawer) {
            handleDrawer();
        }
    };

    const useStyles = makeStyles((t) => ({
        navMenu: {
            fontSize: "2.5rem",
            color: theme.tertiary,
            cursor: "pointer",
            transform: "translateY(-10px)",
            transition: "color 0.3s",
            "&:hover": {
                color: theme.primary,
            },
            [t.breakpoints.down("sm")]: {
                fontSize: "2.5rem",
            },
            [t.breakpoints.down("xs")]: {
                fontSize: "2rem",
            },
        },
        MuiDrawer: {
            padding: "0em 1.8em",
            width: "14em",
            fontFamily: " var(--primaryFont)",
            fontStyle: " normal",
            fontWeight: " normal",
            fontSize: " 24px",
            background: theme.secondary,
            overflow: "hidden",
            borderTopRightRadius: "40px",
            borderBottomRightRadius: "40px",
            [t.breakpoints.down("sm")]: {
                width: "12em",
            },
        },
        closebtnIcon: {
            fontSize: "2rem",
            fontWeight: "bold",
            cursor: "pointer",
            color: theme.primary,
            position: "absolute",
            right: 40,
            top: 40,
            transition: "color 0.2s",
            "&:hover": {
                color: theme.tertiary,
            },
            [t.breakpoints.down("sm")]: {
                right: 20,
                top: 20,
            },
        },
        drawerItem: {
            margin: "1.5rem auto", // Réduit la marge verticale
            borderRadius: "78.8418px",
            background: theme.secondary,
            color: theme.primary,
            width: "85%",
            height: "50px", // Réduit la hauteur
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start", // Aligne les éléments à gauche
            padding: "0 20px", // Réduit le padding horizontal
            boxSizing: "border-box",
            border: "2px solid",
            borderColor: theme.primary,
            transition: "background-color 0.2s, color 0.2s",
            "&:hover": {
                background: theme.primary,
                color: theme.secondary,
            },
            [t.breakpoints.down("sm")]: {
                width: "100%",
                padding: "0 15px", // Réduit encore le padding sur petit écran
                height: "45px", // Réduit encore la hauteur sur petit écran
            },
        },
        drawerLinks: {
            fontFamily: "var(--primaryFont)",
            fontSize: "1.1rem", // Réduit légèrement la taille de la police
            fontWeight: 600,
            marginLeft: "10px", // Ajoute un espace entre l'icône et le texte
            whiteSpace: "nowrap", // Empêche le texte de passer à la ligne
            [t.breakpoints.down("sm")]: {
                fontSize: "1rem",
            },
        },
        drawerIcon: {
            fontSize: "1.3rem", // Réduit légèrement la taille de l'icône
            [t.breakpoints.down("sm")]: {
                fontSize: "1.15rem",
            },
        },
        themeSwitch: {
            position: "absolute",
            right: "80px",
            top: "50%",
            transform: "translateY(-50%)",
        },
        switchLabel: {
            color: theme.tertiary,
            marginRight: 10,
            fontSize: "1rem",
        },
    }));

    const classes = useStyles();

    const fadeVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="navbar">
            <div className="navbar--container">
                <h1 style={{ color: theme.secondary }}>
                    {headerData.name.length > 12
                        ? headerData.name.split(" ")[0]
                        : headerData.name}
                </h1>

                <IoMenuSharp
                    className={classes.navMenu}
                    onClick={handleDrawerOpen}
                    aria-label="Menu"
                />

                <div className={classes.themeSwitch}>
                <ThemeSwitch />
                </div>
            </div>
            <Drawer
                variant="temporary"
                onClose={handleDrawerClose}
                anchor="left"
                open={open}
                classes={{ paper: classes.MuiDrawer }}
                className="drawer"
                disableScrollLock={true}
            >
                <div className="div-closebtn">
                    <CloseIcon
                        onClick={handleDrawerClose}
                        onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                                e.preventDefault();
                                handleDrawerClose();
                            }
                        }}
                        className={classes.closebtnIcon}
                        role="button"
                        tabIndex="0"
                        aria-label="Close"
                    />
                </div>
                <br />

                <div onClick={handleDrawerClose}>
                    <div className="navLink--container">
                        <AnimatePresence>
                            {open && (
                                <>
                                    <motion.div
                                        variants={fadeVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        transition={{ duration: 0.2 }}
                                    >
                                        <NavLink to="/" smooth={true} spy="true" duration={2000}>
                                            <div className={classes.drawerItem}>
                                                <IoHomeSharp className={classes.drawerIcon} />
                                                <span className={classes.drawerLinks}>Accueil</span>
                                            </div>
                                        </NavLink>
                                    </motion.div>
                                    <motion.div
                                        variants={fadeVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        transition={{ duration: 0.2, delay: 0.1 }}
                                    >
                                        <NavLink to="/#about" smooth={true} spy="true" duration={2000}>
                                            <div className={classes.drawerItem}>
                                                <FaUser className={classes.drawerIcon} />
                                                <span className={classes.drawerLinks}>A Propos</span>
                                            </div>
                                        </NavLink>
                                    </motion.div>
                                    <motion.div
                                        variants={fadeVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        transition={{ duration: 0.2, delay: 0.2 }}
                                    >
                                        <NavLink to="/#resume" smooth={true} spy="true" duration={2000}>
                                            <div className={classes.drawerItem}>
                                                <HiDocumentText className={classes.drawerIcon} />
                                                <span className={classes.drawerLinks}>Etudes</span>
                                            </div>
                                        </NavLink>
                                    </motion.div>
                                    <motion.div
                                        variants={fadeVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        transition={{ duration: 0.2, delay: 0.3 }}
                                    >
                                        <NavLink to="/#projects" smooth={true} spy="true" duration={2000}>
                                            <div className={classes.drawerItem}>
                                                <FaCode className={classes.drawerIcon} />
                                                <span className={classes.drawerLinks}>Réalisations</span>
                                            </div>
                                        </NavLink>
                                    </motion.div>
                                    <motion.div
                                        variants={fadeVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        transition={{ duration: 0.2, delay: 0.4 }}
                                    >
                                        <NavLink to="/#services" smooth={true} spy="true" duration={2000}>
                                            <div className={classes.drawerItem}>
                                                <BsFillGearFill className={classes.drawerIcon} />
                                                <span className={classes.drawerLinks}>Services</span>
                                            </div>
                                        </NavLink>
                                    </motion.div>
                                    <motion.div
                                        variants={fadeVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        transition={{ duration: 0.2, delay: 0.5 }}
                                    >
                                        <NavLink to="/#contacts" smooth={true} spy="true" duration={2000}>
                                            <div className={classes.drawerItem}>
                                                <MdPhone className={classes.drawerIcon} />
                                                <span className={classes.drawerLinks}>Contact</span>
                                            </div>
                                        </NavLink>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>  
                </div>
            </Drawer>
        </div>
    );
}

export default Navbar;
