import sgMail from '@sendgrid/mail';
import 'dotenv/config';

// Configurez votre clé API SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmailWithTemplate = async (to, from, templateId, dynamicData) => {
    const msg = {
        to,
        from,
        templateId,
        dynamic_template_data: dynamicData,
    };

    try {
        const response = await sgMail.send(msg);
        console.log('Email sent successfully:', response);
    } catch (error) {
        console.error('Error sending email:', error.response ? error.response.body : error.message);
    }
};