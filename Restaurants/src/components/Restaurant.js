import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, Image } from 'react-native';
import DisplayError from '../components/DisplayError';

import { getRestaurantDetails } from '../api/zomato';

import Colors from '../definitions/Colors';
import Assets from '../definitions/Assets';

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

  const displayRestaurantImage = () => {
    if (restaurant.featured_image) {
      return (
        <Image style={styles.restaurantImage}
          source={{ uri: restaurant.featured_image }} />
      );
    };
    return (
      <View style={styles.containerNoRestaurantImage}>
        <Image source={Assets.icons.missingIMG} />
      </View>
    );
  };

  const displayTimings = () => {
    let timingsList = restaurant.timings.split(",");
    let timingsJSX = [];
    timingsList.forEach((timing, index) => {
      timingsJSX.push(<Text key={index} style={styles.textContent}>{timing}</Text>)
    });
    return (
      <View>
        {timingsJSX}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isError ?
        (<DisplayError message='Impossible de récupérer les données du restaurants' />) :
        (isLoading ?
          (<View style={styles.containerLoading}>
            <ActivityIndicator size="large" />
          </View>) :

          (<ScrollView style={styles.containerScroll}>
            {displayRestaurantImage()}
            <View style={styles.containerCardTop}>
              <View style={styles.containerEstab}>
                <Text style={styles.textName}>
                  {restaurant.name}
                </Text>
                <Text style={styles.textContent}
                  numberOfLines={1}>
                  {restaurant.establishment.join()}
                </Text>
              </View>
              <View style={styles.containerNoteAndVotes}>
                <View style={[styles.containerNote, { backgroundColor: ('#' + restaurant.user_rating.rating_color) }]}>
                  <Text style={styles.textNote}>
                    {restaurant.user_rating.aggregate_rating}
                  </Text>
                  <Text style={styles.textMaxNote}>
                    /5
                  </Text>
                </View>
                <Text style={styles.textVotes}>
                  {restaurant.user_rating.votes} votes
                </Text>
              </View>
            </View>
            <View style={styles.containerCardBottom}>
              <Text style={[styles.textTitle, { marginTop: 0 }]}>
                Cuisines
              </Text>
              <Text style={styles.textContent}>
                {restaurant.cuisines}
              </Text>
              <Text style={styles.textTitle}>
                Numéro(s) de téléphone
              </Text>
              <Text style={styles.textContent}>
                {restaurant.phone_numbers}
              </Text>
              <Text style={styles.textTitle}>
                Adresse
              </Text>
              <Text style={styles.textContent}>
                {restaurant.location.address}
              </Text>
              <Text style={styles.textTitle}>
                Horaires d'ouverture
              </Text>
              {displayTimings()}
            </View>
          </ScrollView>)
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
  },
  containerScroll: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  containerCardTop: {
    elevation: 1,
    borderRadius: 3,
    padding: 12,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  containerCardBottom: {
    elevation: 1,
    marginTop: 16,
    borderRadius: 3,
    padding: 12,
    backgroundColor: 'white',
  },
  containerNoRestaurantImage: {
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: 'white',
  },
  restaurantImage: {
    height: 180,
    backgroundColor: Colors.mainGreen,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  containerEstab: {
    flex: 4,
  },
  containerNoteAndVotes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerNote: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textNote: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 16,
  },
  textMaxNote: {
    fontSize: 12,
    marginLeft: 3,
    color: 'white',
  },
  textVotes: {
    fontStyle: "italic",
    fontSize: 12,
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textTitle: {
    fontWeight: 'bold',
    color: Colors.mainGreen,
    fontSize: 16,
    marginTop: 16,
  },
  textContent: {
    fontSize: 16,
  },
});