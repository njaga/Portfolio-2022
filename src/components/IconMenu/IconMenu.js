import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TelegramIcon from '@material-ui/icons/Telegram';
import PhoneIcon from '@material-ui/icons/Phone';
import VideocamIcon from '@material-ui/icons/Videocam';
import ChatIcon from '@material-ui/icons/Chat';
import { ThemeContext } from '../../contexts/ThemeContext';

const useStyles = makeStyles((theme) => ({
  iconMenuContainer: {
    position: 'fixed',
    bottom: 20,
    right: 20, // Déplacé un peu plus à droite
    zIndex: 999,
  },
  menu: {
    position: 'relative',
    width: 180,
    height: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    position: 'absolute',
    left: 0,
    listStyle: 'none',
    transform: 'rotate(0deg) translateX(65px)',
    transformOrigin: '90px',
    transition: '0.5s',
    transitionDelay: 'calc(0.1s * var(--i))',
    opacity: 0,
    visibility: 'hidden',
  },
  menuLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    textDecoration: 'none',
    borderRadius: '50%',
    transform: 'rotate(calc(360deg / -5 * var(--i)))',
    transition: '1s',
    color: '#fff',
    position: 'relative',
    '& svg': {
      fontSize: 20,
    },
    '&:hover $tooltip': {
      opacity: 1,
      visibility: 'visible',
    },
  },
  menuToggle: {
    position: 'absolute',
    width: 40, // Même taille que les icônes
    height: 40, // Même taille que les icônes
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    borderRadius: '50%',
    boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
    '& svg': {
      fontSize: 20, // Même taille que les icônes
    },
  },
  activeMenu: {
    '& $menuItem': {
      transform: 'rotate(calc(360deg / 5 * var(--i)))',
      opacity: 1,
      visibility: 'visible',
    },
    '& $menuToggle': {
      transform: 'rotate(315deg)',
    },
  },
  tooltip: {
    position: 'absolute',
    background: '#fff',
    color: '#333',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '12px',
    bottom: '120%',
    left: '50%',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
    opacity: 0,
    visibility: 'hidden',
    transition: '0.3s',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    pointerEvents: 'none',
  },
  '@media screen and (max-width: 800px)': {
    iconMenuContainer: {
      right: 10, // Ajusté pour les petits écrans
      bottom: 15,
    },
    menu: {
      width: 160,
      height: 160,
    },
    menuItem: {
      transform: 'rotate(0deg) translateX(55px)',
      transformOrigin: '80px',
    },
    menuLink: {
      width: 35,
      height: 35,
      '& svg': {
        fontSize: 18,
      },
    },
    menuToggle: {
      width: 35, // Ajusté pour les petits écrans
      height: 35, // Ajusté pour les petits écrans
      '& svg': {
        fontSize: 18, // Ajusté pour les petits écrans
      },
    },
  },
}));

const IconMenu = () => {
  const [isActive, setIsActive] = useState(false);
  const { theme } = useContext(ThemeContext);
  const classes = useStyles();

  const toggleMenu = () => {
    setIsActive(!isActive);
  }

  const menuItems = [
    { icon: <WhatsAppIcon />, color: '#25D366', link: 'https://wa.me/221781633419', text: 'WhatsApp' },
    { icon: <TelegramIcon />, color: '#0088cc', link: 'https://t.me/221781633419', text: 'Telegram' },
    { icon: <PhoneIcon />, color: '#4285F4', link: 'tel:+221781633419', text: 'Appeler' },
    { icon: <VideocamIcon />, color: '#3E99D8', link: 'facetime:+221781633419', text: 'FaceTime' },
    { icon: <ChatIcon />, color: '#5865F2', link: 'https://discord.com/users/221781633419', text: 'Discord' },
  ];

  return (
    <div className={classes.iconMenuContainer}>
      <div className={`${classes.menu} ${isActive ? classes.activeMenu : ''}`}>
        <button 
          className={classes.menuToggle} 
          onClick={toggleMenu}
          style={{ color: theme.tertiary }}
        >
          <AddIcon />
        </button>
        {menuItems.map((item, index) => (
          <li key={index} className={classes.menuItem} style={{ '--i': index }}>
            <a 
              href={item.link} 
              className={classes.menuLink} 
              style={{ backgroundColor: item.color }}
              target="_blank" 
              rel="noopener noreferrer"
            >
              {item.icon}
              <span className={classes.tooltip}>{item.text}</span>
            </a>
          </li>
        ))}
      </div>
    </div>
  );
}

export default IconMenu;
