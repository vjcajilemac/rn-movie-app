import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieResponse/*, NowPlayingResponse*/ } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movie.entity";

interface Options{
    page?: number;
    limit?: number;
}

export const popularUseCase = async( fetcher: HttpAdapter, options?: Options): Promise<Movie[]> => {
    try{
        console.log(options?.page);
        const popular = await fetcher.get<MovieResponse>(`/popular`, {
            params: {
                page: options?.page??1
            }
        });
        
        console.log('popular');
        return popular.results.map(result => MovieMapper.fromMovieDBResultToEntity(result));

    }catch(error){
        throw new Error("Error fetching Movies - Popular Playing");
        
    }
}