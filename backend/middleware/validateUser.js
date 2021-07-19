const jwt = require("jsonwebtoken");
const UserService = require("../services/user.service");


module.exports = async (req, res, next) => {

    //kellenek status kódok?
    //vagy mehet a sima error vissza, amit vizsgálunk, hogy van-e ilyen kulcs?
    let tokenFromUser = "null";
    let decodedInfo = {};

    let actualUser;
    
    // ha van a headerben megfelelő aut token, akkor kiszedjük belőle
    if (req.headers.authorization) {
        tokenFromUser = req.headers.authorization.split(" ")[1];    
    }

    // ha kaptunk tokent, megnézzük, érvényes-e  
    if (tokenFromUser !== "null") {        
        jwt.verify(tokenFromUser, process.env.JWT_SECRET_STRING, function(err, decoded) {
            decodedInfo = decoded;
        });
        
            //ha lejárt már a token..
            //ha lejárt a token, akkor decoded = undefined !! ??
            // ez mindig igaz ----- ??? ----- 
            // ez mindig igaz ----- ??? ----- 
            if (decodedInfo === undefined) {        
            res.json({"error": "expired token"})
            } else {

            console.log(`validatorban a decoded...`, decodedInfo);                

            const findUser = async () => {

                // meg kell keresni, van-e ilyen user- ha igen, hozzáférhet.. ha nem, akkor tiltva van
                // de ez nem írhatja felül a tokennel, csak amikor a G-től jon!!!
                const userFromDb = await UserService.findUser(decodedInfo.user.google_id);
                console.log(`validatorban --- userFromDb--`, userFromDb);

                //ha van user, akkor hozzáadjuk a req-hez
                // és jöhet a NEXT
                if (userFromDb) {
                    req.user = userFromDb;
                    next();
                } else {
                    res.json({"error": "user not found"})
                }
            }
            findUser();
        }

    } else {
        res.json({"error": "missing token"})
    }
 
};