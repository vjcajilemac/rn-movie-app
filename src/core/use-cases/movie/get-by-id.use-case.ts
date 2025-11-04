import { HttpAdapter } from '../../../config/adapters/http/http.adapter'
import { FullMovie } from '../../entities/movie.entity'
import { MovieDBMovie } from '../../../infrastructure/interfaces/movie-db.responses'
import { MovieMapper } from '../../../infrastructure/mappers/movie.mapper'

export const getMovieByIdUseCase = async (fetcher: HttpAdapter, movieId: number): Promise<FullMovie> => {
  try{
    const movie = await fetcher.get<MovieDBMovie>(`/${movieId}`);
    return MovieMapper.fromMovieDBToEntity(movie);

  }catch(error){
    throw new Error("No movie " + movieId);
    
  }
}
