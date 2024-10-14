import React, { useContext, useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet";
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    useMediaQuery,
    Typography,
    Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles, withStyles, useTheme as useMaterialTheme } from "@material-ui/core/styles";
import { AiOutlineHome } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { motion } from 'framer-motion';

import "./ProjectPage.css";
import { SingleProject } from "../../components";
import { ThemeContext } from "../../contexts/ThemeContext";
import { projectsData } from "../../data/projectsData";
import { headerData } from "../../data/headerData";

function ProjectPage() {
    const { theme, isDarkMode } = useContext(ThemeContext);
    const [, forceUpdate] = useState();

    // Forcer une mise à jour du composant lorsque le thème change
    useEffect(() => {
        forceUpdate({});
    }, [theme, isDarkMode]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [technology, setTechnology] = useState("all");
    const materialTheme = useMaterialTheme();
    const isMobile = useMediaQuery(materialTheme.breakpoints.down("sm"));
    const pageTopRef = useRef(null);

    const projectsPerPage = 9;

    const filteredProjects = useMemo(() => {
        return projectsData
            .filter((project) => {
                const content =
                    project.projectName + project.projectDesc + project.tags.join(" ");
                return (
                    content.toLowerCase().includes(search.toLowerCase()) &&
                    (category === "all" || project.category === category) &&
                    (technology === "all" || project.tags.includes(technology))
                );
            })
            .sort((a, b) => {
                if (sortBy === "newest") {
                    return new Date(b.date) - new Date(a.date);
                } else {
                    return new Date(a.date) - new Date(b.date);
                }
            });
    }, [search, category, technology, sortBy]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredProjects]);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(
        indexOfFirstProject,
        indexOfLastProject
    );

    const pageNumbers = useMemo(() => {
        const numbers = [];
        for (let i = 1; i <= Math.ceil(filteredProjects.length / projectsPerPage); i++) {
            numbers.push(i);
        }
        return numbers;
    }, [filteredProjects.length]);

    const handlePageChange = useCallback((number) => {
        setCurrentPage(number);
        pageTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const useStyles = makeStyles((t) => ({
        search: {
            color: theme.tertiary,
            width: "100%",
            height: "2.75rem",
            outline: "none",
            border: "none",
            borderRadius: "20px",
            padding: "0.95rem 1rem",
            fontFamily: "'Noto Sans TC', sans-serif",
            fontWeight: 500,
            fontSize: "0.9rem",
            backgroundColor: theme.secondary,
            boxShadow:
                theme.type === "dark"
                    ? "inset 3px 3px 6px #ffffff10, inset -3px -3px 6px #00000060"
                    : "inset 3px 3px 6px #ffffffbd, inset -3px -3px 6px #00000030",
            "&::placeholder": {
                color: theme.tertiary80,
            },
        },
        home: {
            color: theme.secondary,
            position: "absolute",
            top: 25,
            left: 25,
            padding: "7px",
            borderRadius: "50%",
            boxSizing: "content-box",
            fontSize: "2rem",
            cursor: "pointer",
            boxShadow:
                theme.type === "dark"
                    ? "3px 3px 6px #ffffff40, -3px -3px 6px #00000050"
                    : "3px 3px 6px #ffffff40, -3px -3px 6px #00000050",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
                color: theme.tertiary,
                transform: "scale(1.1)",
            },
            [t.breakpoints.down("sm")]: {
                fontSize: "1.8rem",
            },
        },
        formControl: {
            margin: t.spacing(1),
            minWidth: 120,
            width: "100%",
        },
        inputLabel: {
            color: theme.tertiary,
        },
        select: {
            color: theme.tertiary,
            '&:before': {
                borderColor: theme.tertiary,
            },
            '&:after': {
                borderColor: theme.tertiary,
            },
        },
        icon: {
            fill: theme.tertiary,
        },
        pagination: {
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
        },
        pageButton: {
            margin: "0 0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: theme.primary,
            color: theme.secondary,
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: theme.tertiary,
            },
        },
        filterContainer: {
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: isMobile ? "1rem" : 0,
        },
        noProjectsFound: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50vh',
            width: '100%',
            color: theme.tertiary,
            textAlign: 'center',
            padding: '2rem',
        },
        searchIcon: {
            fontSize: '5rem',
            marginBottom: '2rem',
            color: theme.primary,
        },
        noProjectsText: {
            fontWeight: 'bold',
            marginBottom: '1rem',
        },
        suggestionText: {
            opacity: 0.8,
        },
    }));

    const classes = useStyles();

    const WhiteTextTypography = withStyles({
        root: {
            color: theme.tertiary
        }
    })(InputLabel);

    const technologies = useMemo(() => {
        const techs = new Set();
        projectsData.forEach(project => {
            project.tags.forEach(tag => techs.add(tag));
        });
        return Array.from(techs);
    }, []);

    return (
        <div className="projectPage" style={{ backgroundColor: theme.secondary }}>
            <Helmet>
                <title>{headerData.name} | Réalisations</title>
            </Helmet>
            <div
                className="projectPage-header"
                style={{ backgroundColor: theme.primary }}
                ref={pageTopRef}
            >
                <Link to="/">
                    <AiOutlineHome className={classes.home} />
                </Link>
                <h1 style={{ color: theme.secondary }}>Réalisations</h1>
            </div>
            <div className="projectPage-container">
                <div className="projectPage-search">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher projet..."
                        className={classes.search}
                    />
                </div>
                <div className={classes.filterContainer}>
                    <FormControl className={classes.formControl}>
                        <WhiteTextTypography>Catégorie</WhiteTextTypography>
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={classes.select}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                            }}
                        >
                            <MenuItem value="all">Toutes</MenuItem>
                            <MenuItem value="application">Application</MenuItem>
                            <MenuItem value="site">Site</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <WhiteTextTypography>Trier par</WhiteTextTypography>
                        <Select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={classes.select}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                            }}
                        >
                            <MenuItem value="newest">Plus récent</MenuItem>
                            <MenuItem value="oldest">Plus ancien</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <WhiteTextTypography>Technologie</WhiteTextTypography>
                        <Select
                            value={technology}
                            onChange={(e) => setTechnology(e.target.value)}
                            className={classes.select}
                            inputProps={{
                                classes: {
                                    icon: classes.icon,
                                },
                            }}
                        >
                            <MenuItem value="all">Toutes</MenuItem>
                            {technologies.map((tech) => (
                                <MenuItem key={tech} value={tech}>
                                    {tech}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="project-container">
                    <Grid
                        className="project-grid"
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        spacing={4}
                    >
                        {currentProjects.length > 0 ? (
                            currentProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Grid item>
                                        <SingleProject
                                            theme={theme}
                                            id={project.id}
                                            name={project.projectName}
                                            desc={project.projectDesc}
                                            tags={project.tags}
                                            code={project.code}
                                            demo={project.demo}
                                            image={project.image}
                                        />
                                    </Grid>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Box className={classes.noProjectsFound}>
                                    <FaSearch className={classes.searchIcon} />
                                    <Typography variant="h4" className={classes.noProjectsText}>
                                        Aucune réalisation trouvée
                                    </Typography>
                                    <Typography variant="body1" className={classes.suggestionText}>
                                        Essayez de modifier vos critères de recherche ou de filtrage
                                    </Typography>
                                </Box>
                            </motion.div>
                        )}
                    </Grid>
                </div>
                <div className={classes.pagination}>
                    {pageNumbers.map((number) => (
                        <Button
                            key={number}
                            className={classes.pageButton}
                            onClick={() => handlePageChange(number)}
                        >
                            {number}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProjectPage;
