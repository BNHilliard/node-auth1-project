// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!
const bcrypt = require('bcryptjs')
const router = require('express').Router()
const {checkUsernameFree, checkUsernameExists, checkPasswordLength} = require('./auth-middleware')
const Users = require('../users/users-model')




router.post('/register', checkPasswordLength, checkUsernameFree, async (req, res, next) => {
  Users.add({username: req.body.username, 
            password: bcrypt.hashSync(req.body.password, 12)})
  .then(resp => {
    res.json(resp);
  }).catch(err => {
    next(err);
  })
    
  // try { 
  //   const {username, password} = req.body;
  //   const hash= bcrypt.hashSync(password, 12
  //     )
  //   const user = {username, password:hash}
  //   await Users.add(user);
  //   res.status(201).json({ message: `You are now registered, ${username}`})
  //  }catch(err) {
  //       next(err);
  //  }
})

/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */
  router.post('/login', checkUsernameExists, (req, res, next) => {
    res.json('login achieved')
  })

/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */

  router.get('/logout', (req, res, next) => {
    if (!req.session) {
      res.status(200).json({message: "no session"})
    } else {
    req.session.destroy()
    res.status(200).json({message: 'logged out'})
    }
  })

  router.get('/', (req, res, next) => {
    res.json({message: 'auth-router up'})
   })

 
// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router