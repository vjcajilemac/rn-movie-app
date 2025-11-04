import { useEffect, useState } from "react";
//import { Movie } from "../../infrastructure/interfaces/movie-db.responses";

import * as UseCases from '../../core/use-cases'
import { movieDBFetcher } from "../../config/adapters/movieDB.adapter";
import { Movie } from "../../core/entities/movie.entity";


let popularPageNumber = 1;

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([])
    const [popular, setPopular] = useState<Movie[]>([])
    const [topRates, setTopRates] = useState<Movie[]>([])
    const [upcoming, setUpcoming] = useState<Movie[]>([])


    useEffect(() => {
        initialLoad()
    }, [])
    
    const initialLoad = async() => {
        try {
            console.log('Loadeed');
            const nowPlayingPromise = UseCases.moviesNowPlayingUseCase(movieDBFetcher);
            const popularPromise = UseCases.popularUseCase(movieDBFetcher);
            const topRatesPromise = UseCases.moviesTopRatesUseCase(movieDBFetcher);
            const upcomingPromise = UseCases.moviesUpcomingUseCase(movieDBFetcher);
            
            const [
                nowPlayingMovies,
                popularMovies,
                topRatesMovies,
                upcomingMovies
            ] = await Promise.all([
                nowPlayingPromise,
                popularPromise,
                topRatesPromise,
                upcomingPromise
            ])
            console.log(nowPlayingMovies);
            setNowPlaying(nowPlayingMovies);
            setPopular(popularMovies);
            setTopRates(topRatesMovies);
            setUpcoming(upcomingMovies);

            setIsLoading(false);

            console.log({
                nowPlayingMovies,
                popularMovies,
                topRatesMovies,
                upcomingMovies,
                
            });
            console.log(isLoading);


        } catch (error) {
            console.error('❌ Error en initialLoad:', error);
            // Opcional: setIsLoading(false); para salir del estado de carga
        }
        

    }

    return {
        isLoading,
        nowPlaying,
        popular,
        topRates,
        upcoming,

        popularNextPage: async() => {
            popularPageNumber++;
            const popularMovies = await UseCases.popularUseCase(movieDBFetcher,{
                page: popularPageNumber
            });
            setPopular(prev => [...prev, ...popularMovies]);

        }
    };
}