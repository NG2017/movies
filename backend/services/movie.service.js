const Movie = require("../models/Movie");


exports.findOrCreateMovie = async (data) => {
        //console.log(`db-be mentés előtt --- `, data);

        let existingMovie = await Movie.findOne({movie_id: data.id});

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
            console.log(`answFromDb`, answFromDb);
            return answFromDb;
        }

}

exports.findMovieById = async (id) => {
    let existingMovie = await Movie.findOne({movie_id: id});
    return existingMovie;
}

exports.findMovieByTitle = async (title) => {
    let query = { title: new RegExp('^' + title, 'i') };
    let existingMovie = await Movie.find(query);
    return existingMovie;
}



