import React, { useState } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native'
import styles from './popularjobs.style'
import { useRouter } from 'expo-router'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hook/useFetch'
const Popularjobs = () => {

  const router = useRouter();
  const {data ,isLoading, error, reFetch} = useFetch(
    
    'search' , 
    {
      query: 'fresher React Developer',
      num_pages: 1
    }
    );
    
    const handleCardPress = (item)=>{
      
      router.push(`/job-details/${item.job_id}`)
      
    }
  return (
    <View style = {styles.container}>
      <View style = {styles.header}>
        <Text style = {styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style = {styles.headerBtn}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.cardsContainer}>
        {
          isLoading ? 
          
          <ActivityIndicator size = "large" color = {COLORS.primary} />
          :
          error ? <Text>Something went wrong...</Text> 
          :
          <FlatList
            data={data}
            renderItem={({item})=> (
              <PopularJobCard item= {item} handleCardPress = {() => handleCardPress(item)} />
            )}
            keyExtractor={item => item?.job_id}
            contentContainerStyle = {{columnGap: SIZES.medium}}
            horizontal
          />
        }
      </View>
      
    </View>
  )
}
export default Popularjobs