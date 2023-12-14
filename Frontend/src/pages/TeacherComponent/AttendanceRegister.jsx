import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

const AttendanceRegister = () => {
  const values={Class_ID:"0000"};
  const { TId } = useParams();
  const [data, setdata] = useState([]);
  const [Data, setData] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(0);
  const [attendanceDone, setAttendanceDone] = useState(false);
  const [dateCompleted, setDateCompleted] = useState(false);

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  useEffect(() => {
    Axios.get(`http://localhost:3003/api/teacheruserdata/${TId}`)
      .then(result => {
        if ( result.data.length > 0) {
          setData(result.data[0]);
        } else {
          setData(values);
        }
       
      })
      .catch(error => {
        console.error(error);
        alert("Server");
      });
  }, [TId]);

  useEffect(() => {
    Axios.get(`http://localhost:3003/api/attendance/${TId}`)
      .then((result) => {
        setdata(result.data);

        // Initialize attendance based on the data received
        const initialAttendance = result.data.map((student) => student.status);
        setAttendance(initialAttendance);
      })
      .catch((error) => {
        console.error(error);
        alert('Error');
      });
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:3003/api/attendancecheck/${TId}`, {
      params: { date: formattedDate, ClassID: Data.Class_ID },
    })
      .then(result => {
        console.log(result.data)
        if (result.data.length > 0) {
          setDateCompleted(true);
        }
      })
      .catch(error => {
        console.error(error);
        alert('Error');
      });
  }, [TId, formattedDate,Data.Class_ID]);

  const updateAttendance = (status) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[currentStudent] = status;
    setAttendance(updatedAttendance);

    // Move to the next student or finish the date
    if (currentStudent + 1 < data.length) {
      setCurrentStudent((prevStudent) => prevStudent + 1);
    } else {
      setAttendanceDone(true);
      setDateCompleted(true);

      // Ensure all attendance statuses are populated
      const allAttendancePopulated = updatedAttendance.every((status) => status !== null);

      if (allAttendancePopulated) {
        // Submit attendance data for all students
        const attendanceData = data.map((student, index) => ({
          regno: student.Regno,
          status: updatedAttendance[index],
        }));

        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

        Axios.post('http://localhost:3003/api/submitAttendance', {
          attendanceData,
          date: formattedDate,
          ClassID: Data.Class_ID,
          IID: Data.TInstituteID,
        })
          .then((response) => {
            console.log('Attendance submitted successfully:', response.data);
          })
          .catch((error) => {
            console.error('Error submitting attendance:', error);
          });
      }
    }
  };

  const handlePresent = () => {
    if (!attendanceDone && !dateCompleted) {
      updateAttendance('Present');
    }
  };

  const handleAbsent = () => {
    if (!attendanceDone && !dateCompleted) {
      updateAttendance('Absent');
    }
  };

  return (
    <div>
      <h2>Attendance Register</h2>
      {data.length > 0 ? (
        <div>
          {!attendanceDone && !dateCompleted && (
            <p>
              Marking attendance for: regno:{data[currentStudent].Regno} <br />
              name:{data[currentStudent].Name}
            </p>
          )}
          {!attendanceDone && !dateCompleted && (
            <div>
              <button onClick={handlePresent}>Present</button>
              <button onClick={handleAbsent}>Absent</button>
            </div>
          )}
        </div>
      ) : (
        <p>No data available for the specified teacher ID</p>
      )}
      {dateCompleted && (
        <div>
          <p>Attendance for all students has been marked.</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceRegister;
