import React, { useCallback, useState } from 'react'
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native'
import { Stack, useRouter, useLocalSearchParams} from 'expo-router'
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'
import { COLORS, SIZES, icons } from '../../constants'
import useFetch from '../../hook/useFetch'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../../components/common/header/screenheader.style'

const tabs = ["About", "Qualifications", "Responsibilities"]
const JobDetails = () => {
    const router = useRouter()
    const params = useLocalSearchParams()
    const [refreshing,setRefreshing] = useState(false)
    const [activeTab,setActiveTab] = useState(tabs[0])
    
    const {data, isLoading, error, reFetch} = useFetch(`job-details`,{
        job_id: params.id
    })

    const onRefresh = ()=>{}
    // console.log(params);
    const displayTabContent = ()=>{
        switch(activeTab){
            case "Qualifications":
                return <Specifics 
                        title= "Qualifications"
                        points= {data[0].job_highlights?.Qualifications ?? ['N/A']}   
                />
            case "About":
                return <JobAbout 
                    info = {data[0].job_description ?? "No data Provided"}
                />
            case "Responsibilities":
                return <Specifics 
                title= "Responsibilities"
                points= {data[0].job_highlights?.Responsibilities ?? ['N/A']}   
        />
            default : break;
        }
    }


    return (
        <SafeAreaView style = {{flex: 1,backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen 
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn 
                            iconUrl = {icons.left}
                            dimension = "60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn 
                            iconUrl = {icons.share}
                            dimension = "60%"
                        />
                    ),
                    headerTitle: ""
                }}
            />
            
                <ScrollView showsVerticalScrollIndicator = {true} 
                    refreshControl={<RefreshControl refreshing = {refreshing} onRefresh={onRefresh}/>}>
                {
                    isLoading ? 
                    <ActivityIndicator size = "large" color = {COLORS.primary} />
                     : error ? 
                     <Text>Something went wrong...</Text> 
                     : data.length === 0 ?
                     <Text>No data found</Text>
                     : (
                        <View style = {{padding: SIZES.medium, paddingBottom: 100}}>
                            <Company 
                                companyLogo = {data[0].employer_logo}
                                jobTitle = {data[0].job_title}
                                companyName = {data[0].employer_name}
                                location = {data[0].job_country}

                            />
                            <JobTabs 
                                tabs = {tabs}
                                activeTab = {activeTab}
                                setActiveTab = {setActiveTab}
                            />

                            {
                                displayTabContent()
                            }
                        </View>
                     )
                }

                </ScrollView>
            
            <JobFooter url= {data[0]?.job_google_link ?? 'https:careers.google.com/jobs/results'}/>
        </SafeAreaView>
  )
}

export default JobDetails