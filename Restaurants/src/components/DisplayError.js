import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import Assets from '../definitions/Assets';
import Colors from '../definitions/Colors';

const DisplayError = ({ message = "Une erreur c'est produite" }) => (
  <View style={styles.container}>
    <Image source={Assets.icons.error} style={styles.icon} />
    <Text style={styles.errorText}>
      {message}
    </Text>
  </View>
);

export default DisplayError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    tintColor: Colors.mainGreen,
  },
  errorText: {
    fontSize: 16,
  },
});