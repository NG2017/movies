require("dotenv").config();
require("./db/connect")();

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const hostname = "localhost";

const fillDB = require("./db/fillDbWithMovies");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json());
app.use("/api", require("./routes/api.routes"));

//indulaskor filmeket tesz az adatbazisba, ha nincs benne elég
fillDB.createDatabase();


app.listen(port, hostname, () => {
  console.log(`Started Express app @ http://${hostname}:${port}/`);
});
