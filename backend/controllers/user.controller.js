const UserService = require("../services/user.service");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

exports.googleLogin = async (req, res) => {
  const showUserData = async (id_token) => {
    // console.log(`token from Google --- `, id_token);

    let userData = jwt.decode(id_token);
    // console.log(`userdata --- `, userData);

    let currentUser = await UserService.findOrCreateUser(userData);
    // console.log(`currentUser------`, currentUser);

    let token = jwt.sign({ user: currentUser }, process.env.JWT_SECRET_STRING, {
      expiresIn: 60 * 60,
    });
    res.json({ token });
  };

  let codeFromGoogle = req.body.code;
  //console.log(`codeFromGoogle ---> `, codeFromGoogle);

  body = {
    code: codeFromGoogle,
    client_id: process.env.GOOGLE_CLIENT_ID,
    //  client_secret: GOOGLE_CLIENT_SECRET,
    // ezzel csinálni kell valamit!!
    client_secret: "dPKZB-ehf6FEMmArTq1AvQAj",
    redirect_uri: "http://localhost:3000/google-login",
    //   redirect_uri: "http://localhost:3000/xxxxxxxxx",
    grant_type: "authorization_code",
  };

  fetch("https://oauth2.googleapis.com/token", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((json) => {
      //console.log(`ezt adta a google-- `, json);

      // ha error van, akkor visszaküldjük, hogy gáz van
      // ha nincs error a hitelesítéssel, akkor meg készítünk saját jwt-t, mentjük adatbázisba, stb
      if (json.error) {
        console.log("error van alljunk le");
        res.json({ error: "Nem sikerült a hitelesítés" });
      } else {
        showUserData(json.id_token);
      }
    });
};

exports.sendUserDataToFE = async (req, res) => {
  console.log(`req.user`, req.user);
  res.json({ user: req.user });
};
