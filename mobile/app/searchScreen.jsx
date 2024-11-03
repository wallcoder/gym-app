import { SafeAreaView, ScrollView, View } from 'react-native';
import React from 'react';
import SearchInput from '../components/SearchInput';

const SearchScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white pt-8">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <View className="mb-4">
          <SearchInput />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
