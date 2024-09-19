import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#212121", // secondary
      color: "#eaeaea", // tertiary
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "8rem",
      marginBottom: "1rem",
      color: "#545fc4", // primary
    },
    subtitle: {
      fontSize: "2rem",
      marginBottom: "2rem",
    },
    text: {
      fontSize: "1.2rem",
      marginBottom: "2rem",
      textAlign: "center",
    },
    link: {
      padding: "10px 20px",
      backgroundColor: "#545fc4", // primary
      color: "#eaeaea", // tertiary
      textDecoration: "none",
      borderRadius: "5px",
      fontSize: "1.1rem",
      transition: "background-color 0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <h2 style={styles.subtitle}>Page non trouvée</h2>
      <p style={styles.text}>
        Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/" style={styles.link}>
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;
