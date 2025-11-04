//import { useRoute } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { RootStackParams } from '../../navigation/Navigation';
import { useMovie } from '../../hooks/useMovie';
import { MovieHeader } from '../../components/movies/movie/MovieHeader';
import { MovieDetails } from '../../components/movies/movie/MovieDetails';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';

interface Props extends StackScreenProps<RootStackParams, 'Details'>{};

const DetailsScreen = ({route}: Props) => {
  //const {movieId} = useRoute().params;
  const {movieId} = route.params;
  const {isLoading, movie, cast = []} = useMovie(movieId);
  const { top } = useSafeAreaInsets();
  console.log(movie)

  if(isLoading){
    return(<FullScreenLoader/>);
  }
  return (
    <SafeAreaView >
      <ScrollView>
        <MovieHeader 
          poster = {movie!.poster} 
          originalTitle={movie!.originalTitle} 
          title={movie!.title}
          
        />
        <MovieDetails movie={movie!} cast = {cast}/>

      </ScrollView>
    </SafeAreaView>
  )
}
export default DetailsScreen;