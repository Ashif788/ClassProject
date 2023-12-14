const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (db) => {
  // Define your routes here and use the 'db' connection for database operations

  router.post('/api/institute', (req, res) => {
    const iid = req.body.iid;
    const iname = req.body.iname;
    const iaddress = req.body.iaddress;

    const sql = 'INSERT INTO institute (InstitutePID, Institute_Name, Institute_Address) VALUES (?, ?, ?)';

    db.query(sql, [iid, iname, iaddress], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data insertion failed' });
      } else {
        console.log('Data inserted successfully');
        res.json({ message: 'Data inserted successfully', result });
      }
    });
  });

  return router;
};
