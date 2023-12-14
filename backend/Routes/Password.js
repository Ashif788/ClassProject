const express=require('express')
const router=express.Router()

module.exports=(db)=>{


  router.post("/api/password/:RIId",(req,res)=>{

    const password=req.body.password;
    const Ifid=req.params.RIId;
  
    sql="update user set password=(?) where InstituteFID=(?)"
  
    db.query(sql, [password,Ifid], (error, result) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Data insertion failed' });
      } else {
        console.log('Data inserted successfully');
        res.json({ message: 'Data inserted successfully3', result });
      }
    });
  })
  return router;
}


  