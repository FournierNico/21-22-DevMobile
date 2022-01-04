import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import RestaurantlistItem from '../components/RestaurantListItem';
import DisplayError from '../components/DisplayError';

import { getRestaurantDetails } from '../api/zomato';

const FavRestaurants = ({ navigation, favRestaurants }) => {

  const [restaurants, setRestaurants] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    refreshFavRestaurants();
  }, [favRestaurants]); // A chaque fois que les restaurants favoris changent

  const refreshFavRestaurants = async () => {
    setIsRefreshing(true);
    setIsError(false);
    let restaurants = [];
    try {
      for (const id of favRestaurants) {
        const zomatoSearchResult = await getRestaurantDetails(id)
        restaurants.push(zomatoSearchResult);
      };
      setRestaurants(restaurants);
    } catch (error) {
      setIsError(true);
      setRestaurants([]);
    }
    setIsRefreshing(false);
  };

  const navigateToRestaurantDetails = (restaurantID) => {
    navigation.navigate("ViewRestaurant", { restaurantID });
  };

  const amIaFavRestaurant = (restaurantID) => {
    if (favRestaurants.findIndex(i => i === restaurantID) !== -1) {
      return true;
    }
    return false;
  };

  return (
    <View style={styles.container}>
      {
        isError ?
          (<DisplayError message='Impossible de récupérer les restaurants favoris' />) :
          (<FlatList
            data={restaurants}
            extraData={favRestaurants}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <RestaurantlistItem
                restaurantData={item}
                onClick={navigateToRestaurantDetails}
                isFav={amIaFavRestaurant(item.id)} />
            )}
            refreshing={isRefreshing}
            onRefresh={refreshFavRestaurants}
          />)
      }
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    favRestaurants: state.favRestaurantsID
  }
}

export default connect(mapStateToProps)(FavRestaurants);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
});