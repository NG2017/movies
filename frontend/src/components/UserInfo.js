import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Userinfo({ user, deleteToken }) {


  

    
    return (
        <div id="userInfo" className="alert blue">



        {user && user.name}
        {user && <img src={user.photo} />}
        {user ?
        <button onClick={() => deleteToken()}>Logout</button> : 
                <li>
        <Link to={{ pathname: "https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20email%20profile%20&response_type=code&redirect_uri=http%3A//localhost:3000/google-login&client_id=1070605275401-p8644491ip8atg1sse0k8qnc3bqno6sa.apps.googleusercontent.com" }} target="_parent">Google Login</Link>
        </li>
        }
        </div>
    );
  }
  