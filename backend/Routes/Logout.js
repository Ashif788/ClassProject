const express = require('express');
const cookieParser = require('cookie-parser'); // Import the cookie-parser middleware
const router = express.Router();
const jstoken = require('jsonwebtoken');
const jswkey = "adminlogin";

module.exports = () => {
  router.get('/api/logout', (req, res) => {
   res.clearCookie('token')
   return res.json({status:true})

    
  });

 
  return router;
}
