
//ez mashova
const fetch = require("node-fetch");
const movieService = require("../services/movie.service");
const movieController = require("../controllers/movie.controller");
//----

let pageNumber = 1;
let maxPageNumber = 6;

const fetchAndSave = (pageNumber = 1) =>{
    console.log(`pageNumber a fetch-hez ---- `, pageNumber);
    fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=a9d0e2bbc6b3dd9b65346fb68b4f67f4&sort_by=popularity.desc&language=hu-HU&page=${pageNumber}`,
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        }
    )
    .then((res) => res.json())
    .then((json) => {
        json.results.map((movie) => {
        movieService.findOrCreateMovie(movie);
       // console.log(`atadva a movieService részére--> `, movie.title);
        });
    });
}



exports.createDatabase = async () => {

    const dbFilled = await movieController.findMaxHundred();
    console.log(`dbFilled---`, dbFilled);

    if(dbFilled) {
        console.log("--- DB is already filled. ---");
    } else {

        for (let i = 1; i <= maxPageNumber; i++) {
            fetchAndSave(i)
        }

    }



};