import './App.css';
import { useState, useEffect } from 'react';
import Menu from './components/Menu';
import Userinfo from './components/UserInfo';
import GoogleLogin from './components/GoogleLogin';

import { BrowserRouter as Router, Route } from 'react-router-dom';


export default function App() {

  const [validatedUser, setValidatedUser] = useState({});

  const userValidator = async () => {

    let token = localStorage.getItem("token");
    console.log(`token...`, token);

    const response = await fetch('http://localhost:8000/api/validate', {
      method: 'POST',
      headers: {'Content-Type': 'application/json','Authorization': `Bearer ${token}`}
    })
    .then(response => response.json())
    .then(result => {  
      console.log('Success:', result);
      setValidatedUser(result.user);
    })
    .catch(error => {console.error('Error:', error);});
  }

  useEffect(() => {
    userValidator();
  }, [])
 
  useEffect(() => {
  }, [validatedUser])
 


  const deleteToken = () => {
    console.log(`törölni kell a tokent`);
    localStorage.removeItem("token"); 
    setValidatedUser({});
  //  setLoggedOut(true);
    window.location.replace("http://localhost:3000");
  }





  return (
    <div className="App">
      
      <Router>

 
          <Menu user={validatedUser} />
          <Userinfo user={validatedUser} deleteToken={deleteToken}  />

          <div className="content">
        

            <Route exact path="/google-login" component={GoogleLogin} />




          </div>


      </Router>





    </div>
  );
}

