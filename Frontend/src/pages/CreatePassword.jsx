import React ,{useState} from 'react';
import { useNavigate,useParams} from 'react-router-dom';
import Axios from 'axios';

function CreatePassword() {

  const { RIId } = useParams();
    const cformvalues={password1:"",password2:""};
    const [formdata,setformdata]=useState(cformvalues);

    const errorvalue={password1:"",password2:""};
      const [errordata,seterrordata]=useState(errorvalue);

      const navigate=useNavigate();
      

    const Handleinput =(e) => {
        const {name,value}=e.target;

        setformdata({...formdata,[name]:value});

      }
      const HandleSubmit =(e) => {
        e.preventDefault();

        const newerror={}

        if(!formdata.password1 || !formdata.password2)
        {
          newerror.password1="*Password cannot be empty*";
          newerror.password2="*password cannot be empty*"
        }
        
        else if(formdata.password1.length<8 || formdata.password2.length<8 )
        {
          newerror.password1="*Password should contain 8 character *"
          newerror.password2="*Password should contain 8 character *"
        }
        else if(formdata.password1!==formdata.password2 )
        {
            newerror.password1="*Password should match*"
            newerror.password2="*Password should match*"
        }

        seterrordata(newerror);

  
        if (Object.keys(newerror).length === 0) {
          Axios.post(`http://localhost:3003/api/password/${RIId}`, {
            password: formdata.password1,
            
            
          })
            .then((response) => {
              if (response.data.message === 'Data inserted successfully3') {
                navigate('/');
              } else {
                alert('Registration failed');
              }
            })
            .catch((error) => {
              alert('Registration failed');
            });
        }
      }



  return (
    <div className='wrapper'>

<div className='login-box'>
        <form onSubmit={HandleSubmit}>
            <h3>
                Create Password
            </h3>

            <div className='input-box'>
        <input 
        type="password"
        name="password1"
        placeholder='Create-Password'
        value={formdata.password1}
        onChange={Handleinput}></input><br></br>
         <p className='error'>{errordata.password1}</p>
         </div>

         <div className='input-box'>
         <input 
        type="password"
        name="password2"
        placeholder='Re-Enter-Password'
        value={formdata.password2}
        onChange={Handleinput}></input><br></br>
         <p className='error'>{errordata.password2}</p>
         </div>

         <button>Submit</button>
        </form>
        </div>
    </div>
  )
}

export default CreatePassword;