import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants/'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/UseAppwrite'
import { getAllPost, getLatestPosts } from '../../lib/appwrite'
import { StatusBar } from 'expo-status-bar'
import VideoCard from '../../components/VideoCard'

const Home = () => {
    const { data: posts, refetch } = useAppwrite(getAllPost);
    const { data: latestPosts } = useAppwrite(getLatestPosts);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        // recall videos
        await refetch();
        setRefreshing(false)
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
                    <View className="my-6 px-4 space-y-6">
                        <View className="justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                                <Text className="text-2xl font-psemibold text-white">Usman</Text>
                            </View>
                            <View className="mt-1.5">
                                <Image source={images.logoSmall} className="w-9 h-10" resizeMethod='contain' />
                            </View>
                        </View>

                        <SearchInput />
                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>
                            <Trending post={latestPosts ?? []} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title="No Videos Found" subtitle="No videos created yet" />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
            <StatusBar />
        </SafeAreaView>
    )
}

export default Home