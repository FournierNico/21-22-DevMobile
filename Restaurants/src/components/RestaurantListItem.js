import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

import Assets from '../definitions/Assets';
import Colors from '../definitions/Colors';



const RestaurantListItem = ({ onClick, restaurantData, restaurantData: { user_rating } }) => {

  const getThumbnail = () => {
    if (restaurantData.thumb) {
      return (
        <Image style={styles.thumbnail} source={{ uri: restaurantData.thumb }} />
      );
    };
    return (
      <View style={styles.noThumbnailContainer}>
        <Image source={Assets.icons.missingIMG} />
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      {getThumbnail()}
      <View style={styles.informationContainer}>
        <Text style={styles.title}>
          {restaurantData.name}
        </Text>
        <Text style={[styles.data, styles.cuisine]}
          numberOfLines={1}>
          {restaurantData.cuisines}
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statContainer}>
            <Image style={styles.icon} source={Assets.icons.rate} />
            <Text style={[styles.data, styles.stat]}>
              {user_rating.aggregate_rating}
            </Text>
          </View>
          <View style={styles.statContainer}>
            <Image style={styles.icon} source={Assets.icons.review} />
            <Text style={[styles.data, styles.stat]}>
              {user_rating.votes}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  informationContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  statContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  noThumbnailContainer: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 128,
    height: 128,
    borderRadius: 12,
    backgroundColor: Colors.mainGreen,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16,
  },
  cuisine: {
    fontStyle: 'italic',
  },
  icon: {
    tintColor: Colors.mainGreen,
  },
  stat: {
    marginLeft: 4,
  },
});