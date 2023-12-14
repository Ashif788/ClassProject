const express=require('express')
const router=express.Router()


module.exports=(db)=>{
  router.put('/api/updateteacher/:TId', (req, res) => {
    const Regno = req.body.Regno;
    const Name = req.body.Name;
    const Dob = req.body.Dob;
    const email=req.body.email;
    const Address=req.body.Address;
    const password=req.body.password;
    


    const Tid = req.params.TId;
  
    const sql = 'UPDATE `teacher` SET `TeacherID` = ?, `Name` = ?, `TD_o_b` = ?, `Email` = ?, `Address` = ?, `Password` = ? WHERE `teacher`.`TeacherID` = ?';
  
    db.query(sql, [Regno, Name, Dob, email,Address,password,Tid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.json({ message: 'failed' });
      } else {
        console.log('Data inserted successfully');
        res.json({ message: 'updated', result });
       
        
        
      }
    });
  });

  return router;

}

