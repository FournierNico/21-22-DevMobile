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

```
npm install -g expo-cli
```

Si vous souhaitez utiliser l'émulateur Android, installez AndroidStudio

Installez un **éditeur de texte** pour développer en JavaScript. Je recommande Visual Studio Code mais vous êtes libre de choisir une autre solution (Atom, IntelliJ...)

Sur votre téléphone / la tablette, téléchargez **l'application Expo**.
Passez le téléphone en mode développeur

## Création du projet

Créez un dossier pour le projet. Dans ce dossier, créez le projet :

```
expo init Restaurants
```

Template : blank

## Lancer l'application

Placez-vous dans un terminal, dans le dossier de votre projet

```
expo start
```

Si vous êtes sur le même réseau WiFi, scannez le QR code avec Expo depuis la tablette  
Sinon passez en premier en mode tunnel dans l'interface web ouverte par Expo, puis scannez le QR code

## Menu des options de debug

Pour ouvrir le menu d'options de debug, secouez l'appareil

## Live reloading

Pas besoin de compiler du JS. Une application React Native se recharge dès que vous faites un changement  
Dans le fichier _App.js_, modifiez

```
<Text>Open up App.js to start working on your app!</Text>
```

par

```
<Text>Bonjour à vous les GI</Text>
```

puis sauvegardez. L'application est re-rendu et le changement s'affiche à l'écran

# Application restaurant

## Premier composant custom

Un composant = un fichier (pour mieux les réutiliser dans notre application)  
Créez un dossier _src_, puis un dossier _components_, puis le fichier _Search.js_ (par convention, on nomme un fichier contenant un composant avec une majuscule)  
Chemin final : src/components/Search.js

Il existe 2 façons pour écrire un composant : l'écrire sous forme de **class** ou sous forme de **function**.

```
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
```

Jusqu'à Mars 2019, je vous aurai fortement conseillé d'utiliser la forme de **class** (car cela permet de conserver un état, on verra cela plus tard). Mais depuis cette date les _Hooks_ nous permettent la même chose avec les composants sous forme de **function**. Je vous conseil donc d'utiliser cette méthode  
D'ailleurs, pour être correct j'ai utilisé une _arrow function_. Une fonction classique s'écrit :

```
function Search () {
  return (

  );
}
```

Et pour pousser encore plus loin, j'aurais pu enlever le _return()_ de mon arrow function, car il peut être implicite. Je n'aime pas faire cela car dans ce cas, tout le contenu de l'arrow function est un _return_ (ce qui nous empêche d'y mettre d'autres choses) :

```
const Search = () => (

);
```

Pour l'instant utiliser une _function_ ou une _arrow function_ ne change rien. Mais par la suite cela aura un impact. Par défaut, utilisez toujours des _arrow functions_ en JS avec React Native (et React tout court !)

Un dernier point : vous avez remarqué la première ligne de mon exemple plus haut ?

```
import React from 'react';
```

Elle est bien sur nécessaire pour l'écriture sous forme de **class**, car on extends de _React.Component_. Et bien même si on ne semble pas l'utiliser en écrivant notre composant sous forme de **function**, elle reste obligatoire. Ne l'oubliez pas !

Import des composants à utiliser _(voir cours pour explications export)_. Comme dit dans le cours, React Native exporte ses composants dans un seul fichier :

```
import React from 'react';
import { View, TextInput, Button } from 'react-native';
```

Définition du rendu : _(voir cours pour explications JSX)_

```
return (
  <View>
    <TextInput placeholder='Nom du restaurant'/>
    <Button
      title='Rechercher'
      onPress={() => { console.log('Coucou'); }}
    />
  </View>
);
```

La propriété _onPress_ attend une fonction à exécuter lors d'un appui sur le bouton. On aurait aussi pu écrire :

```
maFonction = function() {
  console.log('Coucou');
};

...
    <Button
      title='Rechercher'
      onPress={maFonction}
    />
...
```

Export de notre component :

```
export default Search;
```

Import et utilisation dans App.js :

```
import Search from './src/components/Search';

export default function App() {
  return (
    <View style={styles.container}>
      <Search />
      <StatusBar style="auto" />
    </View>
  );
}
```

<details>
<summary>Code complet</summary>

_Search.js_

```
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
```

_App.js_

```
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

```

</details>

Après sauvegarde des fichiers, vous pouvez observer le résultat suivant sur votre appareil (j'ai corrigé le soucis avec la barre d'états dans le _style_ du fichier _App.js_, on verra cela après) :

<img src="img/search1.png" height="400" />

### Exercice : s'entrainer sur un composant custom

Créez un nouveau composant _Test.js_ et affichez le résultat suivant :

<img src="img/test1.png" height="400" />

<details>
<summary>Correction</summary>

```
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

```

</details>

## Ajouter des styles

Permettent de contrôler le rendu graphique des composants  
Première version du code :

```
<View style={{ paddingHorizontal: 12, marginTop: 16 }}>
  <TextInput
    placeholder='Nom du restaurant'
    style={{ marginBottom: 16 }}
  />
  <Button
    title='Rechercher'
    color="#6b9c68"
    onPress={() => { console.log('Coucou'); }}
  />
</View>
```

A noter que la composant _Button_ n'a pas de props _style_ (voir la doc React). Il faut donc soit utiliser une props existante (ici _color_), soit utiliser un autre composant React Native (_ToucheableOpacity_ par exemple)

Rendu :

<img src="img/style1.png" height="400" />

Pour améliorer la lisibilité du code, il est possible (il faut toujours faire comme ça en fait) d'externaliser les styles du composant ; il faut utiliser _StyleSheet_ :

```
import { ..., StyleSheet } from 'react-native';
```

On peut ensuite définir les styles du composant (en dehors de ce dernier, mais dans le même fichier) :

```
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginTop: 16,
  },
  inputRestaurantName: {
    marginBottom: 16,
  },
});
```

Et enfin les appliquer à nos éléments :

```
return (
  <View style={styles.container}>
    <TextInput
      placeholder='Nom du restaurant'
      style={styles.inputRestaurantName}
    />
    <Button
      title='Rechercher'
      color="#6b9c68"
      onPress={() => { console.log('Coucou'); }}
    />
  </View>
);
```

**Gérer les couleurs dans l'application**

La couleur de notre bouton est définie dans ce composant, mais nous allons l'utiliser à plusieurs endroits de notre application ; il faudrait donc la définir une seule fois puis pouvoir l'utiliser quand on en a besoin.  
Pour cela, on va créer un fichier unique pour gérer l'ensemble des couleurs. Commençons par créer un dossier _src/definitions_ puis un fichier _Colors.js_.  
Dans ce dernier, on va définir la couleur :

```
const Colors = {
  mainGreen: '#6b9c68',
};

export default Colors;
```

Il suffit d'importer le fichier dans notre composant pour pouvoir utiliser la couleur :

```
...
import Colors from '../definitions/Colors';
...
  <Button
    title='Rechercher'
    color={Colors.mainGreen}
    onPress={() => { console.log('Coucou'); }}
  />
...
```

<details>
<summary>Code complet</summary>

_Search.js_

```
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

```

</details>

### Exercice : ajouter un style au composant custom

Reprenez le composant _Test.js_ et affichez le résultat suivant :

<img src="img/test2.png" height="400" />

<details>
<summary>Correction</summary>

_Test.js_

```
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

```

</details>

### Exercice : Flexbox

Créez un composant _Test2.js_ et affichez le résultat suivant :

<img src="img/test3.png" height="400" />

Essayez de visualiser le squelette du composant (les _boites_ dans les _boites_)

<details>
<summary>Correction</summary>

```
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Test2 = () => {
  return (
    <View style={styles.mainView}>

      <View style={styles.topView}>
        <View style={styles.topSecondaryFirstView}>
          <View style={styles.topBoxViews} />
          <View style={styles.topBoxViews} />
        </View>
        <View style={styles.topSecondarySecView}>
          <View style={styles.topBoxViews} />
        </View>
        <View style={styles.topSecondaryThirdView}>
          <View style={{ flex: 4 }} />
          <View style={{ flex: 1, backgroundColor: 'gold' }} />
        </View>
      </View>

      <View style={styles.bottomView}>
        <View style={styles.bottomSecondaryViews} />
        <View style={styles.bottomSecondaryViews}>
          <View style={styles.bottomThirdViews} />
          <View style={[styles.bottomThirdViews,
          { backgroundColor: 'gold' }]} />
          <View style={styles.bottomThirdViews} />
        </View>
        <View style={styles.bottomSecondaryViews} />
      </View>

    </View>
  );
}

export default Test2;

const styles = StyleSheet.create({
  mainView: { flex: 1 },
  topView: {
    flex: 2,
    flexDirection: 'row'
  },
  topSecondaryFirstView: {
    flex: 2,
    backgroundColor: 'dodgerblue',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topSecondarySecView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topSecondaryThirdView: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'flex-end'
  },
  topBoxViews: {
    height: 50,
    width: 50,
    backgroundColor: 'gold'
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row'
  },
  bottomSecondaryViews: {
    flex: 1,
    backgroundColor: 'skyblue'
  },
  bottomThirdViews: {
    flex: 1,
    backgroundColor: 'skyblue'
  },
});
```

</details>

## Aperçu des restaurants

### Exercice : composant pour afficher l'apercu d'un restaurant

Créez un nouveau composant _RestaurantListItem_ pour représenter un restaurant lors d'une recherche. Pour vous aider, voici quelques indications :

- taille de la maniature du restaurant : 128 / 128 ; borderRadius : 12
- taille de la police du nom du restaurant : 20 ; type de cuisines / stats : 16

Pour afficher les icones et la miniature du restaurant, utilisez le composant _Image_ de react. Pour charger le fichier à afficher il utilise une propriété _source_ (le chemin) ; dans le cas de la miniature, ne l'utilisez pas pour le moment. Pour les autres images, créez un fichier _src/definitions/Assets.js_ pour centraliser le chargement des images :

```
import iconRate from '../../assets/rate.png';
import iconReview from '../../assets/review.png';

const Assets = {
  icons: {
    rate: iconRate,
    review: iconReview,
  },
};

export default Assets;

```

Vous devez obtenir le résultat suivant :

<img src="img/RestaurantListItem1.png" height="400" />

<details>
<summary>Correction</summary>

_RestaurantListItem.js_

```
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import Assets from '../definitions/Assets';
import Colors from '../definitions/Colors';

const RestaurantListItem = () => (
  <View style={styles.container}>
    <Image style={styles.thumbnail} />
    <View style={styles.informationContainer}>
      <Text style={styles.title}>
        Nom du restaurant
      </Text>
      <Text style={[styles.data, styles.cuisine]}
        numberOfLines={1}>
        Type(s) de cuisine
      </Text>
      <View style={styles.statsContainer}>
        <View style={styles.statContainer}>
          <Image style={styles.icon} source={Assets.icons.rate} />
          <Text style={[styles.data, styles.stat]}>
            5.0
          </Text>
        </View>
        <View style={styles.statContainer}>
          <Image style={styles.icon} source={Assets.icons.review} />
          <Text style={[styles.data, styles.stat]}>
            1000
          </Text>
        </View>
      </View>
    </View>
  </View>
);

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

```

</details>

Rien de nouveau ici  
_numberOfLines={ 1 }_ pour la liste des types de cuisine permet de forcer le texte à s'afficher sur une ligne : si la ligne est plus longue, le texte sera coupé avec "..." affiché

### Les propriétés (props) des composants

Pour utiliser le destructuring, déclarer la liste des propriétés attendues dans le composant :

```
const Cat = ({name}) => {
  return (
    <View>
      <Text>
        Je suis {name} !
      </Text>
    </View>
  );
}

const App = () => {
  return (
    <View>
      <Cat name="Kiki"/>
    </View>
  );
}
```

Possibilité de mettre une valeur par défaut à la propriété :

```
const Cat = ({name="Chichi"}) => {
  ...

const App = () => {
  return (
    <View>
      <Cat />
    </View>
  );
}
```

Dans une application, il est conseillé de déclarer le type des propriétés attendu pour chaque composant, s'il est obligatoire ou non... Pour cela on peut utiliser TypeScript ou PropTypes (plus simple à mettre en place dans une application déjà existante)

### Exercice : utiliser des props dans le formulaire de test

Dans la page de test _Test.js_, ajoutez un composant affichant le nom et le prénom d'un membre d'équipage. Pour le moment, passez la valeur comme propriété :

```
<Text style={styles.title}>
  Composition de l'équipage
</Text>
<CrewMember firstName="John" lastName="Doe" />
```

Résultat attendu :

<img src="img/test4.png" height="400" />

<details>
<summary>Correction</summary>

_Test.js_

```
import React from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';

const CrewMember = ({ firstName, lastName }) => {
  return (
    <View>
      <Text>
        Membre d'équipage {firstName} {lastName} au rapport !
      </Text>
    </View>
  );
}

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
        <CrewMember firstName="John" lastName="Doe" />
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

```

</details>

### Le state des composants

Représente la "base de données" du composant. Lorsque le state change, le composant va visuellement se rendre à nouveau. Utilisation du Hook _useState_ sous la forme :  
const [**Variable**, **Modificateur**] = useState(_ValeurParDéfaut_);

Exemple :

```
import React, { useState } from "react";
import { Button, Text, View } from "react-native";

import React, { useState } from "react";
import { Button, Text, View } from "react-native";

const Test = () => {

  const [name, setName] = useState("Paul");

  const changeName = () => {
    console.log("Current name is : " + name);
    setName("Jean");
    console.log("New name is : " + name);
  }

  return (
    <View>
      <Text>
        I am {name}
      </Text>
      <Button
        title="No, your name is Jean !"
        onPress={changeName}/>
    </View>
  );
}

```

**Attention :** modifier le state est une opération asynchrone

### Exercice : utiliser le state dans le formulaire de test

Affichez le nombre de membres d'équipage. Pour l'instant, il s'agit du nombre de fois ou le boutton "Ajouter" a été appuyé

Résultat attendu :

<img src="img/test5.png" height="400" />

<details>
<summary>Correction</summary>

_Test.js_

```
import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';

const CrewMember = ({ firstName, lastName }) => {
  return (
    <View>
      <Text>
        Membre d'équipage {firstName} {lastName} au rapport !
      </Text>
    </View>
  );
}

const Test = () => {

  const [crewSize, setCrewSize] = useState(0);

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
          onPress={() => { setCrewSize(crewSize + 1); }}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.title}>
          Composition de l'équipage ({crewSize})
        </Text>
        <CrewMember firstName="John" lastName="Doe" />
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

```

</details>

### Les listes (FlatList)

3 props à passer au minimum au composant FlatList :

- data : le tableau de données (1 élément = 1 entrée dans la liste)
- keyExtractor : une fonction qui retourne la propriété à utiliser comme ID unique pour chaque élément de la liste
- renderItem : un fonction qui retourne un composant pour afficher chaque élément de la liste

Exemple :

```
const DATA = [
  { id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item'},
  { id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item'},
  { id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item'},
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={ ({ item }) => <Item title={item.title}/> }
        keyExtractor={item => item.id}
      />
    </View>
  );
}

```

### Exercice : la liste des membres d'équipage

Vous avez maintenant tous les éléments nécessaires pour gérer correctement la liste des membres d'équipage. Lors d'un clique sur le bouton _Ajouter_, si les deux champs du formulaire sont remplis un nouveau membre est ajouté à la liste. Pensez également à gérer de la bonne manière l'affichage du nombre de personnes dans l'équipage.  
Pensez à regarder la documentation des composants pour vous aider. Pour l'ID, générez un string unique avec _Date.now().toString()_

Rendu attendu :

<img src="img/test6.png" height="400" />
