// Server code (server.js)
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mysql = require('mysql');


const db = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root',
  password: '',
  database: 'digital_class',
});

// Attempt to connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database');
  
  // Now you can perform database operations here

  // Don't forget to close the connection when you're done with it
 
});



const institute=require('./Routes/Institute')
const user=require('./Routes/user')
const password=require('./Routes/Password')
const logincheck=require('./Routes/login')
const userdata=require('./Routes/Userdata')
const addstudent=require('./Routes/AddStudent')
const deletestudent=require("./Routes/DeleteStudent")
const totalstudent=require("./Routes/TotalStudent")
const totalteacher=require("./Routes/TotalTeacher")
const addteacher=require('./Routes/Addteacher')
const deleteteacher=require('./Routes/DeleteTeacher')
const deleteclass=require('./Routes/DeleteClass')
const Studentdetail=require('./Routes/StudentDetail')
const teacherdetail=require('./Routes/TeacherDetail')
const addclass=require('./Routes/Addclass')
const classdetails=require('./Routes/Classdetails')
const updateStudent=require('./Routes/UpdateStudent')
const updateteacher=require('./Routes/updateteacher')
const updateclass=require('./Routes/UpdateClass')
const onestudentdetails=require('./Routes/UpdateStudentdetails');
const oneteacherdetails = require('./Routes/updateteacherdetail');
const oneclassdetails = require('./Routes/UpdateclassDetails');
const attendance = require('./Routes/AttendanceStudent');
const addattendance = require('./Routes/Attendance');
const log = require('./Routes/Logout');

app.use('/',user(db));
app.use('/',institute(db));

app.use('/',password(db));
app.use('/',logincheck(db));
app.use('/',userdata(db))
app.use('/',addstudent(db))
app.use('/',deletestudent(db))
app.use('/',totalstudent(db))
app.use('/',totalteacher(db))
app.use('/',addteacher(db))
app.use('/',deleteteacher(db))
app.use('/',deleteclass(db))
app.use('/',Studentdetail(db))
app.use('/',teacherdetail(db))
app.use('/',addclass(db))
app.use('/',classdetails(db))
app.use('/',updateStudent(db))
app.use('/',updateteacher(db))
app.use('/',updateclass(db))
app.use('/',onestudentdetails(db))
app.use('/',oneteacherdetails(db))
app.use('/',oneclassdetails(db))
app.use('/',attendance(db))
app.use('/',addattendance(db))
app.use('/',log())

app.listen(3003, () => {
  console.log('Server is running on port 3001');
});
