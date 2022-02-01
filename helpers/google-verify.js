//Aca se encuentran la validacion de la autenticacion de google

const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

async function googleVerify(token = '') {

  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Esta variable se encuentra declarada en las variables de entorno, solicitar al backend
  });
  const { name, picture, email} = ticket.getPayload();

  return {
    nombre: name,
    img: picture,
    correo: email,
    google: true,
    rol: "USER_ROL"
  }
}

module.exports = {
    googleVerify
}