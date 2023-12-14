import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import CLOC2 from '../AdminComponent/Clock'
import '../AdminComponent/clock.css'

function TeacherHome() {


    const { TId } = useParams();
    const [Sdata, setSata] = useState(null);
  
    const [Tdata, setTData] = useState(null);
    const [data, setData] = useState(null);
    const [bardata, setbarData] = useState(null);
    const [value, setValue] = useState(new Date());
  
    useEffect(() => {
      Axios.get(`http://localhost:3003/api/teachertotalstudent2/${TId}`)
        .then(result => {
  
  
          setSata(result.data[0]);
  
  
        })
        .catch(error => {
          console.error(error);
          alert("Error");
        });
    }, [TId]);

    useEffect(() => {
      Axios.get(`http://localhost:3003/api/teacheruserdata/${TId}`)
        .then(result => {
          setData(result.data[0]);
  
        })
        .catch(error => {
          console.error(error);
          alert("Server Not Responding");
        });
    }, [TId]);
  
  
  
  
  
  

    return (
      <div>
  
        <div className="Dash-heading">
  
          <p className='DashHeadname'>
            Dashboard
          </p>
          {data ? (
            <p className='Dashname'>
            Class &nbsp; {data.Class_Name}  --------</p>
  
  
          ) : (
            <p>No data...</p>
          )}
          <CLOC2></CLOC2>
  
        </div>
  
        <div>
  
          <div className='homeContainer'>
  
  
  

            <div className='total'>
  
              <h3> Total Student</h3>
              <br></br>
  
              {Sdata ? (
                <div>
  
                  <p className='Number'> {Sdata.total}</p>
  
                </div>
              ) : (
                <p>Loading data...</p>
              )}
  
              <Link to={`/teacherhomepage/${TId}/teacherstudentdetails`} >Student Detail</Link>
  
  
            </div>
  
           
            <div className='total'>
  
              <h3> Total Teacher</h3>
              <br></br>
  
              {Tdata ? (
                <div>
  
                  <p className='Number'> </p>
  
                </div>
              ) : (
                <p>Loading data...</p>
              )}
  
              <Link to={`/adminhomepage/${TId}/teacherdetails`} >Teacher Detail</Link>
  
  
            </div>
  
          </div>
  
          
        </div>
  
  
  
      </div>
    )
  }

export default TeacherHome