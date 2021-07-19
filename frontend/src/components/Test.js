import { useState, useEffect } from 'react';


export default function Test({ match }) {

    const [test, setTest] = useState(null);

    useEffect(() => {
        fetschAllTest();
    }, []);


    useEffect(() => {

        if (test !== null) {
            console.log(test);
            createTestInfo();
        }

    }, [test]);


    const createTestInfo = () => {
        
        document.getElementById("testBlock").insertAdjacentHTML("afterbegin", `    
        <h1>${test.name}</h1>
        <p>${test.desc}</p>
        `);

        createTest();

    }

    const createTest = () => {

        console.log(`test.questions-- `, test.questions);
        console.log("jöhet a kérdéssor");

        //ki kellene szedni az X-eket a kódból a mapoknál
        //ki kellene szedni az X-eket a kódból a mapoknál
        //ki kellene szedni az X-eket a kódból a mapoknál
        //ki kellene szedni az X-eket a kódból a mapoknál
        //ki kellene szedni az X-eket a kódból a mapoknál
        //ki kellene szedni az X-eket a kódból a mapoknál
        //ki kellene szedni az X-eket a kódból a mapoknál

        test.questions.map((x, y) => {
           
            let title = x.title;
            // ez így maradjon, van bármi értelme?               
            let actualY = y + 1;
            let answers = ``;

            //véletlenné kell tenni a sorrrendet majd
            //véletlenné kell tenni a sorrrendet majd
            //véletlenné kell tenni a sorrrendet majd
            const randomAnswers = x.answers;
            randomAnswers.map((x, y) => {
                console.log(`ezaz X `, x);
                let ans = x.ans;

                /* answers += `<label class="container">
                <input type="radio" id="${axtualID}" name="wx${actualY}" value="${point}">
                <span class="checkmark"></span>
                <label for="${axtualID}">${ans}</label>
              </label>`; */

                answers += `<div class="container">
                    <input type="radio" id="${ans}" class="answInput" name="${title}" value="${ans}">
                    <label for="${ans}">${ans}</label><br>  
                </div>`;



            });
            
            
            let fullHTML = `<h3>${title}</h3><div class="csakans">` + answers + `</div>`;
            
           // console.log(`ayy`, actualY);

            document.getElementById("teszt-content").insertAdjacentHTML("beforeend", `
            <div id="yd-${actualY}" class="actualQuestion fadein">${fullHTML}</div>
            `);
        });


    }
        
    const fetschAllTest = async () => {
        const test = await fetch(`http://localhost:8000/api/test/name/${match.params.name}`)
        .then(result => result.json())
        .then(data => setTest(data))
    }


    const sendTheAnswers = async () => {

        let userAnswers = [];
        let answersDivArray = Array.from(document.querySelectorAll(".actualQuestion"))
        
        answersDivArray.map(div => {

            let originalQuestion = div.querySelector("h3").innerHTML;
 
            let allInputs = Array.from(div.querySelectorAll("div div input"));
           // console.log(`omg---`, allInputs);
            allInputs.map(input => {
                if (input.checked) {

                    let actualAnswer = {};
                    
                    actualAnswer.title = originalQuestion;
                    actualAnswer.ezmi = input.value;

                    userAnswers.push(actualAnswer);

                }
            })
        }) 


        let answersObject = {};
        answersObject.testName = test.alias;
        answersObject.user = document.getElementById("user").value;
        answersObject.userAnswers = userAnswers;

        let allInputsToDisable = Array.from(document.querySelectorAll("input"));
        allInputsToDisable.map(input => input.disabled = true)

        let response = await fetch('http://localhost:8000/api/test/check-the-answers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(answersObject)
          })
        .then(result => result.json())
        .then(data => {
            console.log(data);
            showCorrectAnswers(answersDivArray, data);
        })        
    }
    
    const showCorrectAnswers = (answersDivArray, data) => {
        console.log(`jo helyen`, answersDivArray);
        console.log(`jo helyen`, data);
        console.log(`jo helyen`, data);

         answersDivArray.map(div => {
            let theQuestion = div.querySelector("h3").innerHTML;

            console.log(`ezt keressük---`, theQuestion);
            console.log(`ez a tömb, amiben keressük---`, data.correctAnswers);
            console.log(`ez a div`, div);

            if (data.correctAnswers.indexOf(theQuestion) > -1) {
                console.log("ez lefut");
                div.classList.add("correctAnswer");
            }

        } ) 
    }
    
    
    return (
        <div id="testBlock" className="tests">

            <br />
            <br />
            ide ne küldjük el a válaszhoz tartozó pontszámot !!!
            Meg kellene egy teszt újrapróbálása is.. de csak miután jött eredmény
            <br />
            <br />
                <select name="user" id="user">
                <option value="user1----">User..1</option>
                <option value="user-22--">User..22...</option>
                <option value="user---33">User.....333</option>
                </select> 
{/* 
            rossz az id neve
                rossz az id neve
                    rossz az id neve */}
            <div id="teszt-blokk">
                <div id="teszt-header"></div>
                <div id="teszt-results"></div>
                <div id="teszt-content"></div>
                <div id="teszt-finish"></div>
            </div>

            <button onClick={() => sendTheAnswers()}>Válaszok beküldése</button>

        </div>
      
    );
  }
  