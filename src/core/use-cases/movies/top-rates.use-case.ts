import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieResponse/*, NowPlayingResponse*/ } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movie.entity";

export const moviesTopRatesUseCase = async( fetcher: HttpAdapter): Promise<Movie[]> => {
    try{
        const topRates = await fetcher.get<MovieResponse>(`/top_rated`);
        
        return topRates.results.map(result => MovieMapper.fromMovieDBResultToEntity(result));

    }catch(error){
        throw new Error("Error fetching Movies - Top rates"+ error);
        
    }
}