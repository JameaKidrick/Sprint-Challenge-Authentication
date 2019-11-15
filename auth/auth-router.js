const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authDB = require('./auth-model');

function getJwtToken(id){
  const payload = {
    id
  };

  const secret = process.env.JWT_SECRET || `shhh, it's a secret 🔐`;

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secret, options);
}

router.post('/register', (req, res) => {
  const user = req.body;

  if(!user.username || !user.password){ // if there is no username or password given...
    return res.status(400).json({ error: 'Please provide a username and password' }); // throw error
  }else{ // otherwise...
    const hash = bcrypt.hashSync(user.password, 10); // hash password 
    user.password = hash; // set user.password as the hashed password
  };

  authDB.add(user)
    .then(store => {
      res.status(201).json({ message: 'New user stored:', user }); // will store the new user in db
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if(!username || !password){
    res.status(400).json({ error: 'Please provide a username and password' });
  }else{
    authDB.findBy({ username })
      .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){ // if the password given, matches the hashed password in the database...
          const token = getJwtToken(user.id); // create a token based on the user's id

          res.status(200).json({ message: `Welcome ${user.username}! Here's your token: ${token}.` }); // log in user then return token
        }else{
          res.status(401).json({ message: 'Invalid credentials. Try again later.' });
        }
      })
      .catch(error => {
        res.status(500).json(error)
      });
  }
});

module.exports = router;
