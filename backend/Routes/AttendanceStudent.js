const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (db) => {
  

  router.get('/api/attendance/:TId', (req, res) => {
    const iid = req.params.TId;
    const sql = "SELECT Regno,Name from Student  where SClassID IN  (SELECT Class_ID FROM class WHERE Class_TeacherID=?) " ;
  
    db.query(sql,[iid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data insertion failed' });
      } else {
        console.log('Data fetched successfully');
        res.json(result);
        
       
        
      }
    });
  });
  
  return router;
};
