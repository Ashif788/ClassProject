import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registration.css';
import Axios from 'axios';

function InstituteRegistration() {
  const navigate = useNavigate();

  const inputValues = { instituteid: '', institutename: '', instituteaddress: '' };
  const [formData, setForm] = useState(inputValues);

  const errorValues = { instituteid: '', institutename: '', instituteaddress: '' };
  const [errorData, setError] = useState(errorValues);

  const [loginerror,setloginerror]=useState("")

  const InputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...formData, [name]: value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const newError = {};

    if (!formData.instituteid) {
      newError.instituteid = '*Institute-Id is Required*';
    }
    if (!formData.institutename) {
      newError.institutename = '*Institute-Name is Required*';
    }
    if (!formData.instituteaddress) {
      newError.instituteaddress = '*Institute-Address is Required*';
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      Axios.post('http://localhost:3003/api/institute', {
        iid: formData.instituteid,
        iname: formData.institutename,
        iaddress: formData.instituteaddress,
      })
        .then((response) => {
          if (response.data.message === 'Data inserted successfully') {
            navigate('/registration/'+formData.instituteid);
          } else {
            setloginerror("Institute-Already-Exist")
          }
        })
        .catch((error) => {
          setloginerror("Server-Not-Found")
        });
    }
  };

  return (
    <div>
      <div className="wrapper">

      <div className='login-box'>
        <form onSubmit={HandleSubmit}>
        <p className='lerror'>{loginerror}</p>
          <h3>Register</h3>

          <div className='input-box'>
          <input
            type="text"
            name="instituteid"
            placeholder="Institute-Id"
            value={formData.instituteid}
            onChange={InputChange}
          />
          <br />
          <p className="error">{errorData.instituteid}</p>
          </div>
          <div className='input-box'>
          <input
            type="text"
            name="institutename"
            placeholder="Institute-Name"
            value={formData.institutename}
            onChange={InputChange}
          />
          <br />
          <p className="error">{errorData.institutename}</p>
          </div>
          <div className='input-box'>
          <input
            type="text"
            name="instituteaddress"
            placeholder="Institute-Address"
            value={formData.instituteaddress}
            onChange={InputChange}
          />
          <br />
          <p className="error">{errorData.instituteaddress}</p>
          </div>

          <button type="submit">Next</button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default InstituteRegistration;
