const express = require('express');
const router = express.Router();

router.use(express.json());

module.exports = (db) => {
  router.put('/api/updateclass/:IId/:CId', (req, res) => {
    const classID = req.params.IId + "-" + req.body.ClassID;
    const classname = req.body.Classname;
    const teacherid = req.body.Teachername;
    const CId = req.params.CId;

    if (!classID || !classname || !teacherid) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const sqlUpdate = 'UPDATE `class` SET `Class_ID` = ?, `Class_Name` = ?, `Class_TeacherID` = ? WHERE `class`.`Class_ID` = ?';

    // You can directly perform the update without checking if the record exists
    db.query(sqlUpdate, [classID, classname, teacherid, CId], (error, updateResult) => {
      if (error) {
        console.error('Database error:', error);
        return res.json({ message: 'Data updated failed' });
      }

     
      console.log('Data updated successfully');
      return res.json({ message: 'Data updated successfully', updateResult });
    });
  });

  return router;
};
