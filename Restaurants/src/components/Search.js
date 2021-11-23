import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList } from 'react-native';

import RestaurantlistItem from '../components/RestaurantListItem';

import Colors from '../definitions/Colors';
import fakeRestaurants from '../helpers/fakeRestaurants';

const Search = () => {

  const [restaurants, setRestaurants] = useState(fakeRestaurants);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Nom du restaurant'
          style={styles.inputRestaurantName}
        />
        <Button
          title='Rechercher'
          color={Colors.mainGreen}
          onPress={() => { console.log('Coucou'); }}
        />
      </View>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.restaurant.id.toString()}
        renderItem={({ item }) => (
          <RestaurantlistItem restaurantData={item.restaurant} />
        )}
      />
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