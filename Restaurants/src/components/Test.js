import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';

const Test = () => {
  return (
    <View>
      <Text>
        Nouvelle recrue
      </Text>
      <TextInput placeholder='Entrez votre nom' />
      <TextInput placeholder='Entrez votre prénom' />
      <Button title='Ajouter'
        onPress={() => { }}
      />
      <Text>
        Composition de l'équipage :
      </Text>
    </View>
  );
}

export default Test;