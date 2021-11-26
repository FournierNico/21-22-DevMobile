import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Restaurant = () => {
  return (
    <View style={styles.container}>
      <Text>
        Je suis le composant restaurant
      </Text>
    </View>
  )
};

export default Restaurant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});