const express = require('express');
const cookieParser = require('cookie-parser'); // Import the cookie-parser middleware
const router = express.Router();
const jstoken = require('jsonwebtoken');
const jswkey = "adminlogin";

module.exports = (db) => {
  router.post('/api/login', (req, res) => {
    const InsId = req.body.Iid;
    const password = req.body.password;

    const sql = "SELECT * FROM user WHERE InstituteFID = ? AND Password = ?";

    db.query(sql, [InsId, password], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Data Fetch failed' });
      }
      if (result.length > 0) {
        jstoken.sign({ result }, jswkey, { expiresIn: "1d" }, (error, token) => {
          if (error) {
            return res.status(500).json({ error: 'Token generation failed' });
          }
          // Set the token as a cookie
          res.cookie('token', token, { httpOnly: true });
          res.json({ message: 'Success', IId:result[0].InstituteFID });
          
        });
      } else {
        res.json({ message: 'Fail', result });
      }
    });
  });

  router.post('/api/Teacherlogin', (req, res) => {
    const InsId = req.body.Iid;
    const password = req.body.password;

    const sql = "SELECT * FROM teacher WHERE TeacherID = ? AND Password = ?";

    db.query(sql, [InsId, password], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Data Fetch failed' });
      }
      if (result.length > 0) {
        jstoken.sign({ result }, jswkey, { expiresIn: "1d" }, (error, token) => {
          if (error) {
            return res.status(500).json({ error: 'Token generation failed' });
          }
          // Set the token as a cookie
          res.cookie('token', token, { httpOnly: true });
          res.json({ message: 'Success', TId:result[0].TeacherID });
          
        });
      } else {
        res.json({ message: 'Fail', result });
      }
    });
  });
  return router;
}
