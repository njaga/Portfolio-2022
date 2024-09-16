const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { verifyConnection, sendEmail } = require('./mailer');
const path = require('path');

// Charger les variables d'environnement
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Servir les fichiers statiques depuis le dossier 'build'
app.use(express.static(path.join(__dirname, 'build')));

// Route pour toutes les autres requêtes, renvoie index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Vérifier la connexion SMTP au démarrage
verifyConnection()
    .then(() => console.log('Connexion SMTP vérifiée avec succès'))
    .catch((error) => console.error('Erreur lors de la vérification de la connexion SMTP:', error));

// Route pour envoyer un email
app.post('/send-email', async (req, res) => {
    console.log('Requête reçue sur /send-email');
    console.log('Corps de la requête:', req.body);

    try {
        const { name, email, message } = req.body;
        
        // Vérifiez que tous les champs nécessaires sont présents
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        const mailOptions = {
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
            to: 'contact@ndiagandiaye.com',
            subject: `Message de ${name}`,
            text: `Nom : ${name}\nEmail : ${email}\nMessage :\n${message}`,
            replyTo: email,
        };

        const info = await sendEmail(mailOptions);
        console.log('E-mail envoyé avec succès:', info);
        res.status(200).json({ message: 'E-mail envoyé avec succès.', info });
    } catch (error) {
        console.error('Erreur détaillée lors de l\'envoi de l\'e-mail:', error);
        res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail.', error: error.message });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

console.log('MAIL_HOST:', process.env.MAIL_HOST);
console.log('MAIL_PORT:', process.env.MAIL_PORT);
console.log('MAIL_USERNAME:', process.env.MAIL_USERNAME);
console.log('MAIL_PASSWORD:', process.env.MAIL_PASSWORD);
console.log('MAIL_ENCRYPTION:', process.env.MAIL_ENCRYPTION);