import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Keyboard } from 'react-native';

import RestaurantlistItem from '../components/RestaurantListItem';
import DisplayError from '../components/DisplayError';

import Colors from '../definitions/Colors';

import { getRestaurants } from '../api/zomato';

const Search = () => {

  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextOffset, setNextOffset] = useState(0);
  const [isMoreResults, setIsMoreResults] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  const requestRestaurants = async (prevRestaurants, offset) => {
    setIsRefreshing(true);
    setIsError(false);
    try {
      const zomatoSearchResult = await getRestaurants(searchTerm, offset);
      setRestaurants([...prevRestaurants, ...zomatoSearchResult.restaurants]);
      if (zomatoSearchResult.results_start + zomatoSearchResult.results_shown < zomatoSearchResult.results_found) {
        setIsMoreResults(true);
        setNextOffset(zomatoSearchResult.results_start + zomatoSearchResult.results_shown);
      } else {
        setIsMoreResults(false);
      }
    } catch (error) {
      setIsError(true);
      setRestaurants([]);
      setIsMoreResults(true);
      setNextOffset(0);
    }
    setIsRefreshing(false);
  };

  const searchRestaurants = () => {
    Keyboard.dismiss();
    requestRestaurants([], 0);
  };

  const loadMoreRestaurants = () => {
    if (isMoreResults) {
      requestRestaurants(restaurants, nextOffset);
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Nom du restaurant'
          style={styles.inputRestaurantName}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={searchRestaurants}
        />
        <Button
          title='Rechercher'
          color={Colors.mainGreen}
          onPress={searchRestaurants}
        />
      </View>
      {
        isError ?
          (<DisplayError message='Impossible de récupérer les restaurants' />) :
          (<FlatList
            data={restaurants}
            keyExtractor={(item) => item.restaurant.id.toString()}
            renderItem={({ item }) => (
              <RestaurantlistItem restaurantData={item.restaurant} />
            )}
            onEndReached={loadMoreRestaurants}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            onRefresh={searchRestaurants}
          />)
      }
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputRestaurantName: {
    marginBottom: 8,
  },
});