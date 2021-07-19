import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Tests() {

    const [tests, setTests] = useState([]);

    useEffect(() => {
        fetschAllTest()
    }, []);
        
    const fetschAllTest = async () => {
        const allTests = await fetch('http://localhost:8000/api/test/all')
        .then(result => result.json());

        setTests(allTests);

        console.log(allTests);
        console.log(`tesztek`, tests);
    }
    
    
    return (
        <div className="tests">

          nem ömlesztve kellene, hanem az adott leckéhez IS tartozóan.. vagy legalább szűrni

        {tests.length > 0 ? tests.map(test => {
          return <h3 key={test.alias}><Link to={`/tesztek/${test.alias}`}>{test.name}</Link></h3>

        }) : <div className="error">Nem található egy teszt sem pillanatnyilag</div>  } 

  

      
      </div>
    );
  }
  