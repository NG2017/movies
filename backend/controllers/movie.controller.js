const movieService = require("../services/movie.service");

exports.findById = async (req, res) => {
  let id = req.params.id;
  const result = await movieService.findMovieById(id);
  res.json(result);
};

exports.findByTitle = async (req, res) => {
  let title = req.params.title;
  const result = await movieService.findMovieByTitle(title);
  res.json(result);
};

exports.findByPageNumber = async (req, res) => {
  let pageNumber = req.params.page;
  const result = await movieService.findByPageNumber(pageNumber);
  res.json(result);
};

exports.findMaxHundred = async (req, res) => {
  const result = await movieService.findMaxHundred();
  return result > 82 ? true : false;
};

exports.addNewReview = async (req, res) => {
  //ezt meg at kell irni!!
  // let userId = req.user.google_id;
  let userId = req.body.user_id;
  console.log(`userId`, userId);
  let movieId = Number(req.body.movie_id);
  let reviewObj = {}
  reviewObj.user = userId;
  reviewObj.comment = req.body.comment;
  reviewObj.point = Number(req.body.point);

  const result = await movieService.addReviewToMovie(movieId, reviewObj);
  result ? res.json({"info": "review added"}) : res.json({"error": "something went wrong.."})
}

// --- reviews
exports.findReviewByUser = async (req, res) => {
  let nameOfUser = req.params.nameofuser;
  let reviews = await movieService.findReviewByUser(nameOfUser);  
  res.json(reviews);
};

exports.findReviewByTitle = async (req, res) => {
  let title = req.params.movie_title;
  let reviews = await movieService.findReviewByTitle(title);  
  res.json(reviews);
};