const express=require('express')
const router=express.Router()


module.exports=(db)=>{
  router.post('/api/registration/:RIId', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const PhoneNo = req.body.pnumber;
    const iid = req.params.RIId;
  
    const sql = 'INSERT INTO user (Fname, Lname, Email, PhoneNo, InstituteFID) VALUES (?, ?, ?, ?, ?)';
  
    db.query(sql, [fname, lname, email, PhoneNo, iid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data insertion failed' });
      } else {
        console.log('Data inserted successfully');
        const sql2='update institute set Phone=? where InstitutePID=?'
        db.query(sql2,[PhoneNo,iid],(error2,result2)=>{
          if(error){
            console.error('Database error:', error);
            res.status(500).json({ error: 'Data insertion failed' });
            
          }
          else{
            console.log('Data inserted successfully');
            res.json({ message: 'Data inserted successfully2', result });
            
          }
        })
        
      }
    });
  });

  return router;

}

