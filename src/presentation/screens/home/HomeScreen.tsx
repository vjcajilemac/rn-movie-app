import React from 'react'
import { Text, View } from 'react-native'
import { useMovies } from '../../hooks/useMovies'
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PosterCarousel } from '../../components/movies/PosterCarousel';
import { HorizontalCarousel } from '../../components/movies/HorizontalCarousel';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';

const HomeScreen = () => {

  const { top } = useSafeAreaInsets();
  const {isLoading, nowPlaying, popular, topRates, upcoming, popularNextPage} = useMovies();
  if(isLoading){
    return(<FullScreenLoader/>);
  }
  return (
    <ScrollView>
      <View style = {{marginTop: top + 20, paddingBottom: 30}} >
        {/*Principal - Presentadas ahora */}
        <PosterCarousel movies={nowPlaying}/>
        {/* Popular */}
        <HorizontalCarousel 
          movies={popular} 
          title='Peliculas Populares'
          loadNextPage={popularNextPage}
           
        />
        {/* Mejor calificadas */}
        <HorizontalCarousel 
          movies={topRates} 
          title='Mejor calificadas' 
        />
        {/* Proximamente */}
        <HorizontalCarousel 
          movies={upcoming} 
          title='Proximamente' 
        />

      </View>
    </ScrollView>

  )
}
export default HomeScreen;