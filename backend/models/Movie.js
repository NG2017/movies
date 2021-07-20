const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const MovieSchema = mongoose.Schema({
  title: { type: String, required: true },
  movie_id: { type: Number, required: true },
  vote_average: { type: Number },
  overview: { type: String },
  backdrop_path: { type: String },
  poster_path: { type: String },

  reviews: [
    {
      user: { type: Schema.Types.ObjectId, ref: User },
      comment: { type: String },
      point: { type: Number }
    }
  ],
});

module.exports = mongoose.model("movies", MovieSchema);
