import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

import Colors from '../definitions/Colors';

const Search = () => {

  return (
    <View style={styles.container}>
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
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginTop: 16,
  },
  inputRestaurantName: {
    marginBottom: 16,
  },
});