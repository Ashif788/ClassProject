const express = require('express');
const router = express.Router();
const mysql = require('mysql');

module.exports = (db) => {

    router.post('/api/submitAttendance', (req, res) => {
        const { attendanceData, date ,ClassID,IID} = req.body;
        
        
        
        const sql = 'INSERT INTO Attendance(Attendance_Date, Status, AStudentID, AClassID, AInstituteID) VALUES (?, ?, ?, ?, ?)';

        
        
        attendanceData.forEach((attendance) => {
            const { regno, status } = attendance;


            const values = [date, status, regno, ClassID, IID];

            db.query(sql, values, (error, results) => {
                if (error) {
                    console.error('Error inserting attendance:', error);
                }
            });
        });

        res.status(200).json({ message: 'Attendance submitted successfully' });
    });

    router.get('/api/attendancecheck/:TId', (req, res) => {
      const { date } = req.query;
      const iid = req.params.TId;
      const cid = req.query.ClassID; 
      console.log("data" + cid);
    
      const sql = 'SELECT Attendance_Date FROM Attendance WHERE AClassID = ? AND Attendance_Date = ?';
    
      db.query(sql, [cid, date], (error, result) => {
        if (error) {
          console.error('Database error:', error);
          res.status(500).json({ error: 'Data retrieval failed' });
        } else {
          console.log('Data fetched successfully');
          res.json(result);
        }
      });
    });
    
    return router;
};
