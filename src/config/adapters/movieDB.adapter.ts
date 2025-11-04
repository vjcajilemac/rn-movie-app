import { THE_MOVIE_API_KEY } from "@env";
import { AxiosAdapter } from "./http/axios.adapter";

export const movieDBFetcher = new AxiosAdapter({
    baseUrl: 'https://api.themoviedb.org/3/movie',
    params: {
        //api_key: 'b0f0f4937be1b33b5cc0751fa4c823c7',
        api_key: THE_MOVIE_API_KEY?? 'no-key',
        language: 'es'
    }
})