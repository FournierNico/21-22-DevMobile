import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import DisplayError from '../components/DisplayError';

import { getRestaurantDetails } from '../api/zomato';

const Restaurant = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    requestRestaurant();
  }, []); // Uniquement à l'initialisation

  // Pourrait être directement déclarée dans useEffect
  const requestRestaurant = async () => {
    try {
      const zomatoRestaurantResult = await getRestaurantDetails(route.params.restaurantID);
      setRestaurant(zomatoRestaurantResult);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }

  return (
    <View style={styles.container}>
      {isError ?
        (<DisplayError message='Impossible de récupérer les données du restaurants' />) :
        (isLoading ?
          (<View style={styles.containerLoading}>
            <ActivityIndicator size="large" />
          </View>) :
          (<Text>
            Je suis le restaurant {restaurant.name}
          </Text>)
        )}
    </View>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});