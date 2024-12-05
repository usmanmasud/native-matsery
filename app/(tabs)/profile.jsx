import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/UseAppwrite'
import { getUserPost, signOut } from '../../lib/appwrite'
import { StatusBar } from 'expo-status-bar'
import VideoCard from '../../components/VideoCard'
import { router, useLocalSearchParams } from 'expo-router'
import { useGlobalContex } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'

const Profile = () => {
    const { user, setUser, isLoggedIn } = useGlobalContex();
    const { data: posts } = useAppwrite(() => getUserPost(user.$id));

    const logout = async () => {
        await signOut();
        setUser(null);
        isLoggedIn(false)

        router.replace('/sign-in')
    }


    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard video={item} />
                )}
                ListHeaderComponent={() => (
                    <View className="w-full justify-center items-center mt-6 mb-12 px-4">
                        <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
                            <Image source={icons.logout} resizeMode='contain' className="w-6 h-6" />
                        </TouchableOpacity>
                        <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center ">
                            <Image source={{ uri: user?.avatar }} resizeMode='contain' className="w-[90%] h-[90%] rounded-lg" />
                        </View>
                        <InfoBox title={user?.username} containerStyles="mt-5" titleStyles="text-lg" />
                        <View className="mt-5 flex-row">
                            <InfoBox title={user?.length || 0} subtitle="Posts" containerStyles="mr-10" titleStyles="text-xl" />
                            <InfoBox title='1.2k' subtitle="Followers" titleStyles="text-xl" />
                        </View>
                    </View>
                )
                }
                ListEmptyComponent={() => (
                    <EmptyState title="No Videos Found" subtitle="No video for this query" />
                )}
            />
            < StatusBar />
        </SafeAreaView >
    )
}

export default Profile