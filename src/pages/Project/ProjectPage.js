import React, { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { AiOutlineHome } from "react-icons/ai";

import "./ProjectPage.css";
import { SingleProject } from "../../components";
import { ThemeContext } from "../../contexts/ThemeContext";
import { projectsData } from "../../data/projectsData";
import { headerData } from "../../data/headerData";

function ProjectPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const { theme } = useContext(ThemeContext);

    const projectsPerPage = 9;

    useEffect(() => {
        const filtered = projectsData.filter((project) => {
            const content =
                project.projectName + project.projectDesc + project.tags.join(" ");
            return (
                content.toLowerCase().includes(search.toLowerCase()) &&
                (category === "all" || project.category === category)
            );
        });

        const sorted = filtered.sort((a, b) => {
            if (sortBy === "newest") {
                return new Date(b.date) - new Date(a.date);
            } else {
                return new Date(a.date) - new Date(b.date);
            }
        });

        setFilteredProjects(sorted);
        setCurrentPage(1);
    }, [search, category, sortBy]);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(
        indexOfFirstProject,
        indexOfLastProject
    );

    const pageNumbers = [];
    for (
        let i = 1;
        i <= Math.ceil(filteredProjects.length / projectsPerPage);
        i++
    ) {
        pageNumbers.push(i);
    }

    const useStyles = makeStyles((t) => ({
        search: {
            color: theme.tertiary,
            width: "40%",
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
            [t.breakpoints.down("sm")]: {
                width: "350px",
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
        },
        inputLabel: {
            color: '#ffffff',
        },
        select: {
            color: '#ffffff',
            '&:before': {
                borderColor: '#ffffff',
            },
            '&:after': {
                borderColor: '#ffffff',
            },
        },
        icon: {
            fill: '#ffffff',
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
    }));

    const classes = useStyles();

    const WhiteTextTypography = withStyles({
        root: {
            color: "#FFFFFF"
        }
    })(InputLabel);

    return (
        <div className="projectPage" style={{ backgroundColor: theme.secondary }}>
            <Helmet>
                <title>{headerData.name} | Projects</title>
            </Helmet>
            <div
                className="projectPage-header"
                style={{ backgroundColor: theme.primary }}
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
                </div>
                <div className="project-container">
                    <Grid
                        className="project-grid"
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {currentProjects.map((project) => (
                            <SingleProject
                                theme={theme}
                                key={project.id}
                                id={project.id}
                                name={project.projectName}
                                desc={project.projectDesc}
                                tags={project.tags}
                                code={project.code}
                                demo={project.demo}
                                image={project.image}
                            />
                        ))}
                    </Grid>
                </div>
                <div className={classes.pagination}>
                    {pageNumbers.map((number) => (
                        <Button
                            key={number}
                            className={classes.pageButton}
                            onClick={() => setCurrentPage(number)}
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