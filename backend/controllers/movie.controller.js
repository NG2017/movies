const movieService = require('../services/movie.service');

exports.findById = async (req, res) => {
    let id = req.params.id;
    const result = await movieService.findMovieById(id);
    res.json(result)
}

exports.findByTitle = async (req, res) => {
    let title = req.params.title 
    const result = await movieService.findMovieByTitle(title);
    res.json(result)
}
