const User = require("../models/User");

exports.findUser = async (id) => {
  let existingUser = await User.findOne({ google_id: id });
  return existingUser;
};

exports.findOrCreateUser = async (userObject) => {
  // console.log(`db-be mentés előtt --- `, userObject);

  //megnézzük, hogy van már
  let existingUser = await User.findOne({ google_id: userObject.sub });
  console.log(`existingUser--------------`, existingUser);

  //ha igen, akkor felülírjuk, mert változhatott azóta valami
  //visszaküldjük a módosított adathalmazt
  if (existingUser) {
    let updatedUser = await User.findOneAndUpdate(
      { google_id: existingUser.google_id },
      {
        $set: {
          name: userObject.name,
          email: userObject.email,
          photo: userObject.picture,
        },
      },
      { new: true }
    );
    return updatedUser;
  } else {
    //ha nincs, akkor létrehozzuk
    let user = new User();
    user.google_id = userObject.sub;
    user.email = userObject.email;
    user.name = userObject.name;
    user.photo = userObject.picture;

    let answFromDb = await user.save();
    console.log(`answFromDb`, answFromDb);
    return answFromDb;
  }
};
