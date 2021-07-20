const Movie = require("../models/Movie");
const User = require("../models/User");

exports.findOrCreateMovie = async (data) => {
  //console.log(`db-be mentés előtt --- `, data);

  let existingMovie = await Movie.findOne({ movie_id: data.id });

  if (!existingMovie) {
    //ha nincs, akkor létrehozzuk
    let movie = new Movie();

    movie.title = data.title;
    movie.movie_id = data.id;
    movie.vote_average = data.vote_average;
    movie.overview = data.overview;
    movie.backdrop_path = data.backdrop_path;
    movie.poster_path = data.poster_path;

    let answFromDb = await movie.save();
    return answFromDb;
  }
};

exports.findMovieById = async (id) => {
  let existingMovie = await Movie.findOne({ movie_id: id }).populate('reviews.user', '-_id name photo');
  return existingMovie;
};

exports.findMovieByTitle = async (title) => {
  let query = { title: new RegExp(title, "i") };
  let existingMovie = await Movie.find(query);
  return existingMovie;
};


exports.findByPageNumber = async (pageNumber) => {
  console.log(`pageNumber a service fájlban `, pageNumber);

  let skipThese = (pageNumber-1)*20;
  console.log(`skipThese`, skipThese);

  let movies = await Movie.find({}).skip(skipThese).limit(20);
  return movies;
};

exports.findMaxHundred = async (title) => {
  let existingMovie = await Movie.find({}).limit(100);
  return existingMovie.length;
};


exports.addReviewToMovie = async (movie_id, reviewObj) => {
  console.log(movie_id, reviewObj);
  const selectedMovie = await Movie.findOne({movie_id: movie_id});
  console.log(`selectedMovie.. `, selectedMovie);

  if (selectedMovie) {
    selectedMovie.reviews.push(reviewObj);
    // meg lehet ezt úgy oldani, hogy ne kelljen kiszedni a tömböt belőle, hanem egyből belenyomjuk?
    const updated = await Movie.updateOne({ movie_id: movie_id }, {reviews : selectedMovie.reviews} );
    return updated.nModified > 0 ? true : false;
  } else {
    return false;
  }
}

// --- reviews
exports.findReviewByUser = async (user) => { 
  let nameRegex = new RegExp(user, "i")
  let allMovie = await Movie.find({}).populate('reviews.user', '-_id name photo');
  let reviewsArray = [];
  allMovie.map(movie => {  
    movie.reviews.map(review => {
        if (review.user) {
          if(review.user.name.match(nameRegex)) {
          let newReview = JSON.parse(JSON.stringify(review));
          newReview.movie_id = movie.movie_id;
          newReview.movie_title = movie.title;
          newReview.backdrop_path = movie.backdrop_path;       
          reviewsArray.push(newReview)
        }
      }
    })
  });
  return reviewsArray;
};

exports.findReviewByTitle = async (movie) => { 
  let movieRegex = new RegExp(movie, "i")
  let allMovie = await Movie.find({}).populate('reviews.user', '-_id name photo');
  let reviewsArray = [];
  allMovie.map(movie => {  
    movie.reviews.map(review => {
        if (review.user) {
          if(movie.title.match(movieRegex)) {
          let newReview = JSON.parse(JSON.stringify(review));
          newReview.movie_id = movie.movie_id;
          newReview.movie_title = movie.title;
          newReview.backdrop_path = movie.backdrop_path;       
          reviewsArray.push(newReview)
        }
      }
    })
  });
  return reviewsArray;
};