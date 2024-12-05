import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/UseAppwrite'
import { searchPosts } from '../../lib/appwrite'
import { StatusBar } from 'expo-status-bar'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
    const { query } = useLocalSearchParams()
    const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

    const [refreshing, setRefreshing] = useState(false);

    // console.log(posts, query)

    useEffect(() => {
        refetch()
    }, [query])

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard video={item} />
                )}
                ListHeaderComponent={() => (
                    <View className="my-6 px-4">
                        <Text className="font-pmedium text-sm text-gray-100">Search Result</Text>
                        <Text className="text-2xl font-psemibold text-white">{query}</Text>
                        <View className="mt-6 mb-8">
                            <SearchInput inititialQuery={query} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title="No Videos Found" subtitle="No video for this query" />
                )}
            />
            <StatusBar />
        </SafeAreaView>
    )
}

export default Search