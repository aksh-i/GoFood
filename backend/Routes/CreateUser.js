const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MyNameIsAkshitaSharmabeChannel$#"

router.post("/createuser", [
  body('email', 'Email format wrong').isEmail(),
  body('name', 'Name is too short').isLength({ min: 4 }),
  body('password', 'Weak Password').isLength({ min: 5 })],
  async (req, res) => {  //Through this new data is added to database (in atlas)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt)

    try {
      await User.create({
        name: req.body.name,  //request me ayega data 
        location: req.body.location,
        password: secPassword,
        email: req.body.email
      })
        .then(res.json({ success: true })); //response

    } catch (error) {
      console.log(error)
      res.json({ success: false })
    }
  })


router.post("/loginuser", [
  body('email', 'Email format wrong').isEmail(),
  body('password', 'Weak Password').isLength({ min: 5 })], async (req, res) => {  //Through this new data is added to database (in atlas)
   

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;

    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Incorrect credenttials" });
      }

      const pwdCompare = await bcrypt.compare(req.body.password,userData.password)

      if (!pwdCompare) {
        return res.status(400).json({ errors: "Incorrect credenttials" });
      }


      const data = {
        user: {
          id:userData.id
        }
      }


      const authToken = jwt.sign(data,jwtSecret) //authToken for signing
      //This will be sent to the front end and will be stored
      //in the local storage of the user
      return res.json({ success: true, authToken:authToken});

    } catch (error) {
      console.log(error)
      res.json({ success: true })
    }
  })

module.exports = router;