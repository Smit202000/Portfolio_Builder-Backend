const nodemailer = require('nodemailer');
const { default: axios } = require('axios');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const getAccessToken = async () => {
  try {
    let tokenDetails = await axios.post(
      'https://accounts.google.com/o/oauth2/token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }
    );
    const accessToken = tokenDetails.data.access_token;
    return accessToken;
  } catch (error) {
    return error;
  }
};

const createMail = async (to, link, subject, text, html) => {
  try {
    const accessToken = await getAccessToken();
    console.log(accessToken);
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'pkbkmb@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: 'pkbkmb@gmail.com',
      to: to,
      subject,
      text,
      html,
    };

    const email = await transport.sendMail(mailOptions);
    // console.log(email);
    return email;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = createMail;
