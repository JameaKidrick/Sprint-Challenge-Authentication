/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization; // create variable 'token' that references the authorization header given by the server which should include the CORRECT token

  if(token){
    const secret = process.env.JWT || `shhh, it's a secret 🔐`; // create variable 'secret' that references the secret/signature that is signed onto the token

    jwt.verify(token, secret, (err, decodedToken) => {// verify the validity of the token
      if(err){ // if the token has been tampered with (hackers)...
        res.status(401).json({ message:'Invalid credentials' }) // throw an error
      }else{
        req.decodeJwt = decodedToken; // set decodedToken with new name
        next(); // go to the next step
      }
    })
  }else{
    res.status(400).json({ error:'Please provide credentials' });
  }
};