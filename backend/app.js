require("dotenv").config();
require("./db/connect")();

//ez mashova
const fetch = require('node-fetch');
const movieService = require("./services/movie.service");
//----

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const hostname = "localhost";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});  

app.use(express.json());
app.use("/api", require("./routes/api.routes"));



//ez mashova




fetch('https://api.themoviedb.org/3/discover/movie?api_key=a9d0e2bbc6b3dd9b65346fb68b4f67f4&sort_by=popularity.desc&language=hu-HU', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
})
.then(res => res.json())
.then(json => {
      json.results.map(movie => {
        movieService.findOrCreateMovie(movie);
        console.log(`atadva a movieService részére--> `, movie.title);
    })
    
});
    
    






app.listen(port, hostname, () => {
  console.log(`Started Express app @ http://${hostname}:${port}/`);
});
