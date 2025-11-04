import { MovieResult, MovieDBMovie } from '../interfaces/movie-db.responses';

export class MovieMapper{
    static fromMovieDBResultToEntity(result: MovieResult) {
        try{
            return {
                id: result.id,
                title: result.title,
                description: result.overview,
                releaseDate: new Date(result.release_date),
                rating: result.vote_average,
                poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
                backdrop: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
    
    
            };
        }catch(error){
            throw(error);

        }
    }

    static fromMovieDBToEntity(response: MovieDBMovie){
        try{

            return{
                id: response.id,
                title: response.title,
                description: response.overview,
                releaseDate: new Date(response.release_date),
                rating: response.vote_average,
                poster: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
                backdrop: `https://image.tmdb.org/t/p/w500${response.backdrop_path}`,
                
                genres: response.genres.map(genre => genre.name),
                duration: response.runtime,
                budget: response.budget,
                originalTitle: response.original_title,
                productionCompanies: response.production_companies.map(company => company.name)
            }

        }catch(error){
            throw(error)
        }

    }
}

//MovieMapper.fromMovieDBResultToEntity
//https://image.tmdb.org/t/p/w500