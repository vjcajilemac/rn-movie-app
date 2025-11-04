import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieResponse/*, NowPlayingResponse*/ } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movie.entity";

export const moviesNowPlayingUseCase = async( fetcher: HttpAdapter): Promise<Movie[]> => {
    try{
        const nowPlaying = await fetcher.get<MovieResponse>(`/now_playing`);
        
        //console.log(nowPlaying.results.map(result => MovieMapper.fromMovieDBResultToEntity(result)));
        return nowPlaying.results.map(MovieMapper.fromMovieDBResultToEntity);

    }catch(error){
       console.error("Error Now Playing Use case:", error);
        throw "Error Now Playing Use case:"+ error; // o lanza uno nuevo si quieres: throw new Error("Error fetching Movies - Now Playing");
        
    }
}