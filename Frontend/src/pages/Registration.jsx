import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './registration.css';
import Axios from 'axios';

function Registration(props) {

  const { RIId } = useParams();
  const navigate = useNavigate();
 

  const inputvalues = { username: '', lastname: '', email: '', number: '' };
  const [formdata, setform] = useState(inputvalues);

  const errorvalues = { username: '', lastname: '', email: '', number: '' };
  const [errordata, seterror] = useState(errorvalues);

  const [loginerror,setloginerror]=useState("")
  const InputChange = (e) => {
    const { name, value } = e.target;
    setform({ ...formdata, [name]: value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const newerror = {};

    if (!formdata.username) {
      newerror.username = '*Username is Required*';
    }
    if (!formdata.lastname) {
      newerror.lastname = '*Lastname is Required*';
    }
    if (!formdata.email) {
      newerror.email = '*Email is Required*';
    }
    if (!formdata.number) {
      newerror.number = '*Phone-Number is Required*';
    }

    seterror(newerror);
    
 
    if (Object.keys(newerror).length === 0) {
      Axios.post(`http://localhost:3003/api/registration/${RIId}`, {
        fname: formdata.username,
        lname: formdata.lastname,
        email: formdata.email,
        pnumber: formdata.number,
      })
        .then((response) => {
          if (response.data.message === 'Data inserted successfully2') {
            navigate(`/${RIId}/createpassword`);  // Use backticks for template literal
          } else {
            setloginerror("PhoneNumber-Already-Exist");
          }
        })
        .catch((error) => {
          setloginerror("Server-Not-Found");
        });
    }
  }    

  return (
    <div>
      <div className='wrapper'>

      <div className='login-box'>
        <form onSubmit={HandleSubmit}>
        <p className='lerror'>{loginerror}</p>
          <h3>Register</h3>

          <div className='input-box'>
          <input
            type="text"
            name="username"
            placeholder='Firstname'
            value={formdata.username}
            onChange={InputChange}
          /><br></br>
          <p className='error'>{errordata.username}</p>
          </div>

          <div className='input-box'>
          <input
            type="text"
            name="lastname"
            placeholder='Lastname'
            value={formdata.lastname}
            onChange={InputChange}
          /><br></br>
          <p className='error'>{errordata.lastname}</p>
          </div>
          <div className='input-box'>
          <input
            type="email"
            name="email"
            placeholder='Email'
            value={formdata.email}
            onChange={InputChange}
          /><br></br>
          <p className='error'>{errordata.email}</p>
          </div>
          <div className='input-box'>
          <input
            type="number"
            name="number"
            placeholder='Phone-Number'
            value={formdata.number}
            onChange={InputChange}
          /><br></br>
          <p className='error'>{errordata.number}</p>
          </div>

          <button type="submit">Next</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Registration;
