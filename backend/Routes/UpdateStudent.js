const express=require('express')
const router=express.Router()


module.exports=(db)=>{
  router.put('/api/updatestudent/:SId', (req, res) => {
    const Regno = req.body.Regno;
    const Name = req.body.Name;
    const Dob = req.body.Dob;
    const Fname = req.body.Fname;
    const Mname = req.body.Mname;
    const Address=req.body.Address;
    const classname=req.body.classname;
    


    const SId = req.params.SId;
  
    const sql = 'UPDATE `student` SET `Regno` = ?, `Name` = ?, `StudentDOB` = ?, `Father_name` = ?, `Mother_name` = ? , `Address` = ?, `SClassID` = ? WHERE `student`.`Regno` = ?';
  
    db.query(sql, [Regno, Name, Dob,Fname,Mname,Address,classname,SId], (error, result) => {
      if (error) {
        console.error('Database error:', error)
        res.json({ message: 'failed', result });
      } else {
        console.log('Data inserted successfully');
        res.json({ message: 'updated', result });
       
        
        
      }
    });
  });

  return router;

}

