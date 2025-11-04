import React from 'react'
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { FullMovie } from '../../../../core/entities/movie.entity';
import { Formatter } from '../../../../config/helpers/formatter';
import { Cast } from '../../../../core/entities/cast.entity';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import CastActor from '../cast/CastActor';


interface Props {
    movie: FullMovie,
    cast: Cast[]
   
}

export const MovieDetails = ({movie, cast}: Props) => {
  const { height: screenHeight } = useWindowDimensions();
  const navigation = useNavigation();  
  
  return (
    <>
        <View style={{ marginHorizontal: 20}}>
          <View style = {{flexDirection: 'row'}}>
            <Text> { movie.rating } </Text>
            <Text style={{marginLeft: 5}}>
              {movie.genres.join(', ')}
            </Text>
          </View>
          <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
            Historia
          </Text>
          <Text style={{fontSize: 16}}> {movie.description} </Text>
          <Text style={{fontSize: 23, marginTop:10, fontWeight: 'bold'}}>
            Presupuesto
          </Text>
          <Text style={{fontSize: 18}}>
            { Formatter.currency(movie.budget)}
          </Text>

          {/**Casting */}
          <View style={{marginTop: 10, marginBottom: 50}}>
            <Text style={{
              fontSize: 23,
              marginVertical: 10,
              fontWeight: 'bold',
              marginHorizontal: 20
            }}>
              Actores
            </Text>
            
            <FlatList 
              data={cast}
              keyExtractor = {(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator = {false}
              renderItem={({item}) => <CastActor actor={item}/>}

            />

          </View>


        </View>
    </>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,

    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },

  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  posterImage: {
    flex: 1,
  },

  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 35,
    left: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.55)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});