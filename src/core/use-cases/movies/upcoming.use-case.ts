import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieResponse/*, NowPlayingResponse*/ } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movie.entity";

export const moviesUpcomingUseCase = async( fetcher: HttpAdapter): Promise<Movie[]> => {
    try{
        const upcoming = await fetcher.get<MovieResponse>(`/upcoming`);
        
        return upcoming.results.map(result => MovieMapper.fromMovieDBResultToEntity(result));

    }catch(error){
        throw new Error("Error fetching Movies - Upcoming");
        
    }
}