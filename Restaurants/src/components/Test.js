import React from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';

const Test = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>
          Nouvelle recrue
        </Text>
        <TextInput placeholder='Entrez votre nom'
          style={styles.form} />
        <TextInput placeholder='Entrez votre prénom'
          style={[styles.form, { marginBottom: 12 }]} />
        <Button
          title='Ajouter'
          color='#005288'
          onPress={() => { }}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.title}>
          Composition de l'équipage
        </Text>
      </View>
    </View>
  );
}

export default Test;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
  subContainer: {
    paddingVertical: 16,
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  form: {
    marginBottom: 8,
  },
});
