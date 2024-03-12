import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'

import styles from './welcome.style'
import { useRouter } from 'expo-router'
import { SIZES, icons } from '../../../constants'


const jobTypes = ['Full-time', 'Part-time', 'Internship', 'Contractor']

const Welcome = ({searchTerm,setSearchTerm,handleClick}) => {
  const router = useRouter()
  const [activeJobType,setActiveJobType] = useState('Full-time')


  return (
    <View>
      <View style = {styles.container}>
        <Text style = {styles.userName}>Hey Sid!!!</Text>
        <Text style = {styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style = {styles.searchContainer}>
        <View style = {styles.searchWrapper}>
          <TextInput 
            style = {styles.searchInput} 
            placeholder = "Search for jobs"
            value={searchTerm}
            onChangeText={(text)=> {setSearchTerm(text)} } />
        </View>
        <TouchableOpacity style = {styles.searchBtn} onPress={handleClick}>
          <Image source = {icons.search} style = {styles.searchBtnImage} />
        </TouchableOpacity>
      </View>
      <View style = {styles.tabsContainer}>
        <FlatList
          horizontal
          data={jobTypes}
          keyExtractor={(item) => item}
          contentContainerStyle = {{columnGap: SIZES.small}}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style= {styles.tab(activeJobType, item)} 
              onPress={()=>{ 
                setActiveJobType(item) 
                router.push(`/search/${item}`)
              }}
            >
              <Text style= {styles.tabText(activeJobType,item)}>{item}</Text>
            </TouchableOpacity>
            
            )}
            showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default Welcome