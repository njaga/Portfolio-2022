const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10),
    secure: process.env.MAIL_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

console.log('Transporter configuration:', {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_PORT === '465',
    auth: {
        user: process.env.MAIL_USERNAME,
    }
});

const verifyConnection = async () => {
    return transporter.verify();
};

const sendEmail = async (mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        throw error;
    }
};

module.exports = { verifyConnection, sendEmail };