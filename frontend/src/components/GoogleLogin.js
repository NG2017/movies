import React, { useEffect, useState } from 'react'
import {useLocation, Link, useHistory} from 'react-router-dom';
import LoadingMask from "./LoadingMask";
import jwt_decode from "jwt-decode";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Callback() {

    const [errorMessage, setErrorMessage] = useState(false);
    const [loadingMask, setLoadingMask] = useState(false);

    const history = useHistory();
    const query = useQuery();
    
    useEffect(() => {
        const validateUser = async () => {
            
            setLoadingMask(true)
            
            const code = query.get("code")


            const response = await fetch("http://localhost:8000/api/google-login", {
                method: "POST",
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify({code})
            })
            console.log(response);
    
            //ha jött válasz normálisan
            if (response.ok) {
                const data = await response.json();

                if (!data.error) {
                   // console.log(`innen megy a token bele a cuccba`, data);
                    localStorage.setItem("token", data.token); 
                    let infoFromToken = jwt_decode(data.token);
                    console.log(infoFromToken);   
                    window.location.replace("http://localhost:3000");
                    //history.push("/")
                } else {
                    setErrorMessage(data);
                }
            } else {
                // ha nincs válasz
                const data = await response.json()
                const message = data.message

                console.log(message);
            }

            setLoadingMask(false)

        }

        validateUser()

    }, [])

    return (
        <div className="Callback">
            
            { loadingMask && <LoadingMask />}
            <p>
                ide kellene valami loading meg gy átriányítás, ha jött válasz a szervertől
            </p>

            { errorMessage && <p>Hiba történt: <strong>{errorMessage.error}</strong></p>}
        </div>
    )
}