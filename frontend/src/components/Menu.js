import { NavLink } from 'react-router-dom';


export default function Menu({user}) {
    
    const menuOpenClose = () => {

        let menuicon = document.getElementById("bars");
        let menuUlBox = document.getElementById("menuUl-box");
      
         menuicon.classList.toggle("change");
         menuUlBox.classList.toggle("xDown");
    }



 //csak így most a menüknek ugyanaz az IDje, így össze fog akani a script is gondolom....
 //csak így most a menüknek ugyanaz az IDje, így össze fog akani a script is gondolom....
 //csak így most a menüknek ugyanaz az IDje, így össze fog akani a script is gondolom....
 //csak így most a menüknek ugyanaz az IDje, így össze fog akani a script is gondolom....
 //csak így most a menüknek ugyanaz az IDje, így össze fog akani a script is gondolom....
 //csak így most a menüknek ugyanaz az IDje, így össze fog akani a script is gondolom....


    return (
        <div className="menu">



<div className="mobMenu" id="ezFent">  
    	    <div className="menuTextOut" id="menuTextOut">
                <div id="menuText" onClick={() => menuOpenClose()}>
                    Főmenü
                </div>
                <div className="burgerMenu" id="bars" onClick={() => menuOpenClose()}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
     	    </div>
    	    <div id="menuUl-box">
                <div id="stickyLay" className="stickyClass">		
                    <ul>              

                        <li>
                            <NavLink to="/tesztek" onClick={() => menuOpenClose()}>Tesztek</NavLink>
                        </li>
                        <li>
                            <NavLink to="/leckek" onClick={() => menuOpenClose()}>Leckék</NavLink>
                        </li>


                    </ul>
                </div>
    	    </div>
        </div>




      
      </div>
    );
  }
  