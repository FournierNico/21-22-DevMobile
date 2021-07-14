# Liens utiles
 
[Télécharger NodeJS](https://nodejs.org/en/download/)  
[Télécharger Visual Studio Code](https://code.visualstudio.com/)

[Lien de l'API Zomato](https://developers.zomato.com/api?lang=en)  
[Documentation API Fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)

[Documentation de React Native](https://facebook.github.io/react-native/)  
[Documentation des composants React Native](https://facebook.github.io/react-native/docs/components-and-apis.html#basic-components)  
[Documentation Flexbox ReactNative](https://facebook.github.io/react-native/docs/flexbox)  
[Documentation de la FlatList React Native](https://facebook.github.io/react-native/docs/flatlist.html)  
[Documentation des Hooks React Native](https://fr.reactjs.org/docs/hooks-intro.html)

[Documentation de react-navigation](https://reactnavigation.org/docs/en/getting-started.html)

[Feuille récap des propriétés pour les styles](https://github.com/vhpoet/react-native-styling-cheat-sheet)

# Get started - CRNA

## Les outils

Installez **Node.js** (LTS)

Installez **Expo** :
~~~
npm install -g expo-cli
~~~

Si vous souhaitez utiliser l'émulateur Android, installez AndroidStudio

Installez un **éditeur de texte** pour développer en JavaScript. Je recommande Visual Studio Code mais vous êtes libre de choisir une autre solution (Atom, IntelliJ...)

Sur votre téléphone / la tablette, téléchargez **l'application Expo**.
Passez le téléphone en mode développeur

## Création du projet

Créez un dossier pour le projet. Dans ce dossier, créez le projet :
~~~
expo init Restaurants
~~~
Template : blank

## Lancer l'application

Placez-vous dans un terminal, dans le dossier de votre projet
~~~
expo start
~~~

Si vous êtes sur le même réseau WiFi, scannez le QR code avec Expo depuis la tablette  
Sinon passez en premier en mode tunnel dans l'interface web ouverte par Expo, puis scannez le QR code

## Menu des options de debug

Pour ouvrir le menu d'options de debug, secouez l'appareil 

## Live reloading

Pas besoin de compiler du JS. Une application React Native se recharge dès que vous faites un changement  
Dans le fichier *App.js*, modifiez

~~~
<Text>Open up App.js to start working on your app!</Text>
~~~

par

~~~
<Text>Bonjour à vous les GI</Text>
~~~

puis sauvegardez. L'application est re-rendu et le changement s'affiche à l'écran

# Application restaurant

## Premier composant custom

Un composant = un fichier (pour mieux les réutiliser dans notre application)  
Créez un dossier *src*, puis un dossier *components*, puis le fichier *Search.js* (par convention, on nomme un fichier contenant un composant avec une majuscule)  
Chemin final : src/components/Search.js

Il existe 2 façons pour écrire un composant : l'écrire sous forme de **class** ou sous forme de **function**.  

~~~
import React from 'react';

//Sous forme de class : 

class Search extends React.Component {
  render() {
    return (

    );
  }
}

//Sous forme de function : 

const Search = () => {
  return (

  );
}
~~~

Jusqu'à Mars 2019, je vous aurai fortement conseillé d'utiliser la forme de **class** (car cela permet de conserver un état, on verra cela plus tard). Mais depuis cette date les *Hooks* nous permettent la même chose avec les composants sous forme de **function**. Je vous conseil donc d'utiliser cette méthode   
D'ailleurs, pour être correct j'ai utilisé une *arrow function*. Une fonction classique s'écrit : 

~~~
function Search () {
  return (

  );
}
~~~

Et pour pousser encore plus loin, j'aurais pu enlever le *return()* de mon arrow function, car il peut être implicite. Je n'aime pas faire cela car dans ce cas, tout le contenu de l'arrow function est un *return* (ce qui nous empêche d'y mettre d'autres choses) :

~~~
const Search = () => (

);
~~~

Pour l'instant utiliser une *function* ou une *arrow function* ne change rien. Mais par la suite cela aura un impact. Par défaut, utilisez toujours des *arrow functions* en JS avec React Native (et React tout court !)

Un dernier point : vous avez remarqué la première ligne de mon exemple plus haut ?

~~~
import React from 'react';
~~~

Elle est bien sur nécessaire pour l'écriture sous forme de **class**, car on extends de *React.Component*. Et bien même si on ne semble pas l'utiliser en écrivant notre composant sous forme de **function**, elle reste obligatoire. Ne l'oubliez pas !

Import des composants à utiliser *(voir cours pour explications export)*. Comme dit dans le cours, React Native exporte ses composants dans un seul fichier :

~~~
import React from 'react';
import { View, TextInput, Button } from 'react-native';
~~~

Définition du rendu : *(voir cours pour explications JSX)*

~~~
return (
  <View>
    <TextInput placeholder='Nom du restaurant'/>
    <Button
      title='Rechercher'
      onPress={() => { console.log('Coucou'); }}
    />
  </View>
);
~~~

La propriété *onPress* attend une fonction à exécuter lors d'un appui sur le bouton. On aurait aussi pu écrire :

~~~
maFonction = function() {
  console.log('Coucou');
};

...
    <Button
      title='Rechercher'
      onPress={maFonction}
    />
...
~~~

Export de notre component : 

~~~
export default Search;
~~~

Import et utilisation dans App.js :

~~~
import Search from './src/components/Search';

export default function App() {
  return (
    <View style={styles.container}>
      <Search />
      <StatusBar style="auto" />
    </View>
  );
}
~~~

<details>
<summary>Code complet</summary>

*Search.js*
~~~
import React from 'react';
import { View, TextInput, Button } from 'react-native';

const Search = () => {

  return (
    <View>
      <TextInput
        placeholder="Nom du restaurant"
      />
      <Button
        title="Rechercher"
        onPress={() => { console.log('Coucou'); }}
      />
    </View>
  );
};

export default Search;
~~~

*App.js*
~~~
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Search from './src/components/Search';

export default function App() {
  return (
    <View style={styles.container}>
      <Search />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 24, // correction barre d'état
  },
});

~~~

</details>

Après sauvegarde des fichiers, vous pouvez observer le résultat suivant sur votre appareil (j'ai corrigé le soucis avec la barre d'états dans le *style* du fichier *App.js*, on verra cela après) : 

<img src="img/search1.png" height="400" />

### Exercice : s'entrainer sur un composant custom

Créez un nouveau composant *Test.js* et affichez le résultat suivant : 

<img src="img/test1.png" height="400" />