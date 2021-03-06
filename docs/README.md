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

<details>
<summary>Correction</summary>

_Test.js_

```
import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, FlatList } from 'react-native';

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

  const [crews, setCrews] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const addCrewMember = () => {
    if (firstName && lastName) {
      setCrews([...crews, { id: Date.now().toString(), firstName: firstName, lastName: lastName }]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>
          Nouvelle recrue
      </Text>
        <TextInput placeholder='Entrez votre nom'
          style={styles.form}
          onChangeText={(text) => setLastName(text)} />
        <TextInput placeholder='Entrez votre prénom'
          style={[styles.form, { marginBottom: 12 }]}
          onChangeText={(text) => setFirstName(text)} />
        <Button
          title='Ajouter'
          color='#005288'
          onPress={addCrewMember}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.title}>
          Composition de l'équipage ({crews.length})
        </Text>
        <FlatList
          data={crews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CrewMember firstName={item.firstName} lastName={item.lastName} />)}
        />
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

### Créer la liste des restaurants

Nous pouvons maintenant reprendre notre application de restaurants et appliquer ce que nous avons vu (props, state et liste) dans le composant _Search_. Pour le moment nous allons utiliser de fausses données (par la suite elle nous les récupèrerons d'une API)

Créez le fichier _src/helpers/fakeRestaurants.js_ et copiez le contenu suivant :

<details>
<summary>Code</summary>

```
const fakeRestaurants = [
  {
    restaurant: {
      id: 16774318,
      name: 'La mama Pizza',
      average_cost: 15,
      user_rating: {
        aggregate_rating: 3.7,
        votes: 1063,
      },
      cuisines: 'Cafes, Italian',
    },
  },
  {
    restaurant: {
      id: 16774319,
      name: 'Le soleil du desert',
      average_cost: 25,
      user_rating: {
        aggregate_rating: 4.9,
        votes: 333,
      },
      cuisines: 'Middle Eastern, Moroccan',
    },
  },
  {
    restaurant: {
      id: 16774320,
      name: 'Le noodle',
      average_cost: 10,
      user_rating: {
        aggregate_rating: 4.1,
        votes: 1380,
      },
      cuisines: 'Asian, Ramen',
    },
  },
];

export default fakeRestaurants;

```

</details>

Votre objectif est d'afficher cette liste de restaurants dans le composant Search. Je vous conseil de procéder en 2 étapes :

- mettre en place la liste pour afficher le bon nombre d'objets _RestaurantListItem_
- modifier le composant _RestaurantListItem_ pour lui passer les props afin d'afficher les bonnes données

Dans le composant _RestaurantListItem_, je vous déconseil de déclarer chaque props ; passez plutôt l'objet contenant toutes les données :

```
const RestaurantListItem = ({ restaurantData}) => {
```

Rendu attendu :

<img src="img/search2.png" height="400" />

<details>
<summary>Correction</summary>

_Search.js_

```
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList } from 'react-native';

import RestaurantlistItem from '../components/RestaurantListItem';

import Colors from '../definitions/Colors';
import fakeRestaurants from '../helpers/fakeRestaurants';

const Search = () => {

  const [restaurants, setRestaurants] = useState(fakeRestaurants);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
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
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.restaurant.id.toString()}
        renderItem={({ item }) => (
          <RestaurantlistItem restaurantData={item.restaurant} />
        )}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputRestaurantName: {
    marginBottom: 8,
  },
});

```

_RestaurantListItem.js_

```
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import Assets from '../definitions/Assets';
import Colors from '../definitions/Colors';

const RestaurantListItem = ({ restaurantData, restaurantData: { user_rating } }) => (
  <View style={styles.container}>
    <Image style={styles.thumbnail} />
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

Afin d'alléger mon code dans le JSX, j'ai profité du destructuring pour assigner une variable supplémentaire contenant l'objet _user_rating_ pour le manipuler directement :

```
const RestaurantItem = ( {restaurant, restaurant : {user_rating}} ) => {
  ...
  <Text style={ styles.restaurantDataText }>
              { user_rating.aggregate_rating }
  </Text>
  ...
  <Text style={ styles.restaurantDataText }>
              { user_rating.votes }
  </Text>
  ...
```

Au lieu de :

```
...
<Text style={ styles.restaurantDataText }>
            { restaurant.user_rating.aggregate_rating }
</Text>
...
<Text style={ styles.restaurantDataText }>
            { restaurant.user_rating.votes }
</Text>
```

### Requêtes internet : fetch

Exemple de call en utilisant l'api fetch :

```
const getMoviesFromApiAsync = async () => {
  try {
    const response = await fetch('https://reactnative.dev/movies.json');
    const json = await response.json();
    return json.movies;
  } catch (error) {
    console.error(error);
  }
};

```

Eléments importants :

- fetch est asynchrone ; on doit attendre le retour de la fonction (utilisation des mots clés _await/async_)
- pour traiter la réponse, il est plus simple de convertir en format json
- bien penser à mettre le tout dans un _try/catch_ et gérer les erreurs

Utilisation :

```
export default App = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await getMoviesFromApiAsync();
    setData(res);
    console.log(res);
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Button
        title="load"
        onPress={loadData}/>
      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <Text>{item.title}, {item.releaseYear}</Text>) }
        />
    </View>
  );
};

```

L'API _fetch_ permet de gérer bien plus de paramètres pour les requêtes (la méthode, les headers...) en fonction des besoins. Regardez la documentation pour plus d'infos

### Récupérer les restaurants depuis l'API Zomato

Votre prochaine mission est de remplacer les fausses données des restaurants par un appel à l'API Zomato. On va utiliser la requête _/search_ sur la ville de Londres  
Créez un fichier src/api/zomato.js\* pour centraliser les requêtes à l'API Zomato. Sauvegardez votre clé ainsi que l'ID de la ville de Londres :

```
const API_KEY = '';
const LONDON_ID = 61;
```

A l'aide de la documentation, regardez comment construire la requête ; les paramètres attendu (et le header), le retour... afin de charger les restaurants de la ville de Londres. Créez la fonction dans le fichier _zomato.js_ et utilisez la dans le composant _Search_ lors d'un appui sur le bouton de recherche pour peupler la liste. Ne prennez pour l'instant pas en compte la pagination ou le texte de recherche

Vous devriez obtenir un résultat semblable à ceci après un appui sur la recherche :

<img src="img/search3.png" height="400" />

<details>
<summary>Correction</summary>

_zomato.js_

```
const API_KEY = '';
const LONDON_ID = '61';

export async function getRestaurants() {
  try {
    const myHeaders = new Headers({ 'user-key': API_KEY });
    const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${LONDON_ID}&entity_type=city`;
    const response = await fetch(url, { headers: myHeaders });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getRestaurants ${error.message}`);
    throw error;
  }
};

```

_Search.js_

```
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList } from 'react-native';

import RestaurantlistItem from '../components/RestaurantListItem';

import Colors from '../definitions/Colors';

import { getRestaurants } from '../api/zomato';

const Search = () => {

  const [restaurants, setRestaurants] = useState([]);

  const searchRestaurants = async () => {
    try {
      const zomatoSearchResult = await getRestaurants();
      setRestaurants(zomatoSearchResult.restaurants);
    } catch (error) {

    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Nom du restaurant'
          style={styles.inputRestaurantName}
        />
        <Button
          title='Rechercher'
          color={Colors.mainGreen}
          onPress={searchRestaurants}
        />
      </View>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.restaurant.id.toString()}
        renderItem={({ item }) => (
          <RestaurantlistItem restaurantData={item.restaurant} />
        )}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputRestaurantName: {
    marginBottom: 8,
  },
});

```

</details>

### Utiliser le texte de recherche

Jusqu'à présent, la recherche des restaurants se fait sans paramètres. Vous avez tout à disposition pour ajouter cette fonctionnalité !

Rendu attendu :

<img src="img/search4.png" height="400" />

<details>
<summary>Correction</summary>

_zomato.js_

```
const API_KEY = '';
const LONDON_ID = '61';

export async function getRestaurants(searchTerm = '') {
  try {
    const myHeaders = new Headers({ 'user-key': API_KEY });
    const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${LONDON_ID}&entity_type=city&q=${searchTerm}`;
    const response = await fetch(url, { headers: myHeaders });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getRestaurants ${error.message}`);
    throw error;
  }
};

```

_Search.js_

```
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList } from 'react-native';

import RestaurantlistItem from '../components/RestaurantListItem';

import Colors from '../definitions/Colors';

import { getRestaurants } from '../api/zomato';

const Search = () => {

  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchRestaurants = async () => {
    try {
      const zomatoSearchResult = await getRestaurants(searchTerm);
      setRestaurants(zomatoSearchResult.restaurants);
    } catch (error) {

    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Nom du restaurant'
          style={styles.inputRestaurantName}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <Button
          title='Rechercher'
          color={Colors.mainGreen}
          onPress={searchRestaurants}
        />
      </View>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.restaurant.id.toString()}
        renderItem={({ item }) => (
          <RestaurantlistItem restaurantData={item.restaurant} />
        )}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputRestaurantName: {
    marginBottom: 8,
  },
});

```

</details>

### Récupérer plus de résultats

L'API zomato renvoie au maximum 20 résultats à chaque requête. Il faudrait que lorsque l'utilisateur scroll sur le bas de la liste, s'il reste des résultats à charger l'application fasse une nouvelle requête à l'API

Première étape, voir comment l'API Zomato gère la pagination. Dans la documentation, on trouve ceci : _(start) fetch results after offset_. Il est possible de spécifier à partir de quel élément on souhaite obtenir les résultats. Vous pourrez donc modifier la requête pour prendre en compte ce paramêtre  
De plus, en observant le retour de la requête à _/search_, on peut observer les informations nécessaires à la pagination :

```
{
  "results_found": 28692,
  "results_start": 0,
  "results_shown": 20,
  "restaurants": [ ...
  ]
}
```

Seconde étape, détecter lorsque l'utilisateur arrive en bas de la liste pour charger d'avantage de résultats. La documentation de FlatList nous donne les deux infos suivantes :

- **onEndReached** (function): call when the scroll position gets within onEndReachedThreshold of the rendered content
- **onEndReachedThreshold** (number): How far from the end (in units of visible length of the list) the bottom edge of the list must be from the end of the content to trigger the onEndReached callback. Thus a value of 0.5 will trigger onEndReached when the end of the content is within half the visible length of the list

Pour faire simple, la fonction définie dans la propriété _onEndReached_ sera appelée lorsque l'utilisateur attendra la fin de la liste - la taille d'écran défini dans _onEndReachedThreshold_ (en pratique, definissez cette valeur à 0.5)  
On peut donc faire :

```
...
_loadMoreRestaurants = () => {
  console.log("End of the list");
}
...
      <FlatList
        data={ restaurants }
        keyExtractor={ (item) => item.restaurant.id.toString() }
        renderItem={ ({item}) => <RestaurantItem
                                    restaurant={ item.restaurant }
                                 /> }
        onEndReached={ _loadMoreRestaurants }
        onEndReachedThreshold={ 0.5 }
      />
```

Lorsque vous arrivez en bas de la liste, vous devriez avoir un log dans la console

On avance ! Il faudrait maintenant :

- stocker les variables de pagination ; offset actuel et s'il y a plus de résultats (pour ne pas faire de call s'il n'y a plus de résultats)
- initialiser / réinitialiser ces variables à chaque nouvelle recherche (lors de l'appui sur le bouton)
- lorsque l'utilisateur arrive en fin de liste, si besoin effectuer un nouvel appel à l'API (et bien mettre à jour les variables)

Vous êtes capable d'effectuer toutes ces étapes. N'oubliez pas que modifier le state est asynchrone, qu'il faut parfois ajouter les anciens résultats et parfois tout remettre à 0...

<details>
<summary>Correction</summary>

_zomato.js_

```
const API_KEY = '';
const LONDON_ID = '61';

export async function getRestaurants(searchTerm = '', offset = 0) {
  try {
    const myHeaders = new Headers({ 'user-key': API_KEY });
    const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${LONDON_ID}&entity_type=city&start=${offset}&q=${searchTerm}`;
    const response = await fetch(url, { headers: myHeaders });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getRestaurants ${error.message}`);
    throw error;
  }
};

```

_Search.js_

```
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList } from 'react-native';

import RestaurantlistItem from '../components/RestaurantListItem';

import Colors from '../definitions/Colors';

import { getRestaurants } from '../api/zomato';

const Search = () => {

  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextOffset, setNextOffset] = useState(0);
  const [isMoreResults, setIsMoreResults] = useState(true);

  const requestRestaurants = async (prevRestaurants, offset) => {
    try {
      const zomatoSearchResult = await getRestaurants(searchTerm, offset);
      setRestaurants([...prevRestaurants, ...zomatoSearchResult.restaurants]);
      if (zomatoSearchResult.results_start + zomatoSearchResult.results_shown < zomatoSearchResult.results_found) {
        setIsMoreResults(true);
        setNextOffset(zomatoSearchResult.results_start + zomatoSearchResult.results_shown);
      } else {
        setIsMoreResults(false);
      }
    } catch (error) {
    }
  };

  const searchRestaurants = () => {
    requestRestaurants([], 0);
  };

  const loadMoreRestaurants = () => {
    if (isMoreResults) {
      requestRestaurants(restaurants, nextOffset);
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Nom du restaurant'
          style={styles.inputRestaurantName}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <Button
          title='Rechercher'
          color={Colors.mainGreen}
          onPress={searchRestaurants}
        />
      </View>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.restaurant.id.toString()}
        renderItem={({ item }) => (
          <RestaurantlistItem restaurantData={item.restaurant} />
        )}
        onEndReached={loadMoreRestaurants}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputRestaurantName: {
    marginBottom: 8,
  },
});

```

</details>

_Limitation de l'API Zomato : en version gratuite, on ne peut pas obtenir les résultats après 100 éléments retournés. Si je commence ma requête à l'élément 101, j'obtiendrai un tableau vide en retour_

### Ajout de quelques fonctionnalités

#### Icone de chargement + Pull to resfresh

Le retour du call à l'API n'est pas instantané. Pendant ces quelques secondes, il ne se passe rien à l'écran : ce n'est vraiment pas une bonne expérience utilisateur. Il faudrait que la liste affiche une icône de chargement pendant que l'API retourne le résultat. Nous pouvons également implémenter une fonctionnalité de _pull to resfresh_  
La documentation de FlatList nous renseigne sur 2 props : _refreshing_ et _onRefresh_

Commportement attendu :

- lors d'une requête à l'API, la liste affiche une icone de chargement
- si l'utilisateur utilise le _pull to refresh_, une nouvelle requête est émise (comme s'il appuyait sur le bouton)

<img src="img/search5.png" height="400" />

<details>
<summary>Correction</summary>

_Search.js_

```
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList } from 'react-native';

import RestaurantlistItem from '../components/RestaurantListItem';

import Colors from '../definitions/Colors';

import { getRestaurants } from '../api/zomato';

const Search = () => {

  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextOffset, setNextOffset] = useState(0);
  const [isMoreResults, setIsMoreResults] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const requestRestaurants = async (prevRestaurants, offset) => {
    setIsRefreshing(true);
    try {
      const zomatoSearchResult = await getRestaurants(searchTerm, offset);
      setRestaurants([...prevRestaurants, ...zomatoSearchResult.restaurants]);
      if (zomatoSearchResult.results_start + zomatoSearchResult.results_shown < zomatoSearchResult.results_found) {
        setIsMoreResults(true);
        setNextOffset(zomatoSearchResult.results_start + zomatoSearchResult.results_shown);
      } else {
        setIsMoreResults(false);
      }
    } catch (error) {
    }
    setIsRefreshing(false);
  };

  const searchRestaurants = () => {
    requestRestaurants([], 0);
  };

  const loadMoreRestaurants = () => {
    if (isMoreResults) {
      requestRestaurants(restaurants, nextOffset);
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Nom du restaurant'
          style={styles.inputRestaurantName}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <Button
          title='Rechercher'
          color={Colors.mainGreen}
          onPress={searchRestaurants}
        />
      </View>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.restaurant.id.toString()}
        renderItem={({ item }) => (
          <RestaurantlistItem restaurantData={item.restaurant} />
        )}
        onEndReached={loadMoreRestaurants}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={searchRestaurants}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputRestaurantName: {
    marginBottom: 8,
  },
});

```

*Petit bug de React Native : utiliser la propriété *refreshing* de la FlatList sans définir la propriété *onRefresh* ne fonctionne pas*

</details>

#### Affichage en cas d'erreur lors du call API

Actuellement nous ne traitons pas les erreurs lors du call API. Le comportement attendu est le suivant :

- Si je n'ai pas d'erreur, comportement actuel (affichage de la liste de restaurants)
- Si j'ai une erreur lors du call :
  - remise à 0 des données
  - la liste est remplacée par un autre composant affichant un message d'erreur

La seule chose que vous ne savez pour l'instant pas faire, c'est un affichage conditionnel dans le JSX. Rien de bien compliqué :

```
{ isError ? (
    // Afficher le composant erreur ici
  ) : (
    <FlatList
      ...
    />
)}
```

Faite bien un composant séparé pour afficher l'erreur (_src/components/DisplayError.js_), pour qu'il puisse être réutilisé par la suite. Le mieux est même que ce composant prenne en props le message d'erreur à afficher. Pour tester le comportement, vous pouvez simplement toujours retourner une erreur dans la fonction qui effectue la requête

Résultat attendu :

<img src="img/error1.png" height="400" />

<details>
<summary>Correction</summary>

_Assets.js_

```
import iconRate from '../../assets/rate.png';
import iconReview from '../../assets/review.png';
import iconError from '../../assets/error.png';

const Assets = {
  icons: {
    rate: iconRate,
    review: iconReview,
    error: iconError,
  },
};

export default Assets;

```

_DisplayError.js_

```
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

```

_Search.js_

```
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList } from 'react-native';

import RestaurantlistItem from '../components/RestaurantListItem';
import DisplayError from '../components/DisplayError';

import Colors from '../definitions/Colors';

import { getRestaurants } from '../api/zomato';

const Search = () => {

  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextOffset, setNextOffset] = useState(0);
  const [isMoreResults, setIsMoreResults] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  const requestRestaurants = async (prevRestaurants, offset) => {
    setIsRefreshing(true);
    setIsError(false);
    try {
      const zomatoSearchResult = await getRestaurants(searchTerm, offset);
      setRestaurants([...prevRestaurants, ...zomatoSearchResult.restaurants]);
      if (zomatoSearchResult.results_start + zomatoSearchResult.results_shown < zomatoSearchResult.results_found) {
        setIsMoreResults(true);
        setNextOffset(zomatoSearchResult.results_start + zomatoSearchResult.results_shown);
      } else {
        setIsMoreResults(false);
      }
    } catch (error) {
      setIsError(true);
      setRestaurants([]);
      setIsMoreResults(true);
      setNextOffset(0);
    }
    setIsRefreshing(false);
  };

  const searchRestaurants = () => {
    requestRestaurants([], 0);
  };

  const loadMoreRestaurants = () => {
    if (isMoreResults) {
      requestRestaurants(restaurants, nextOffset);
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Nom du restaurant'
          style={styles.inputRestaurantName}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <Button
          title='Rechercher'
          color={Colors.mainGreen}
          onPress={searchRestaurants}
        />
      </View>
      {
        isError ?
          (<DisplayError message='Impossible de récupérer les restaurants' />) :
          (<FlatList
            data={restaurants}
            keyExtractor={(item) => item.restaurant.id.toString()}
            renderItem={({ item }) => (
              <RestaurantlistItem restaurantData={item.restaurant} />
            )}
            onEndReached={loadMoreRestaurants}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            onRefresh={searchRestaurants}
          />)
      }
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputRestaurantName: {
    marginBottom: 8,
  },
});

```

Pour faire les choses vraiment bien, on aurait du gérer le type d'erreur retourné pour afficher le bon message à l'utilisateur (service indisponible, erreur réseau etc...). Il est très important, surtout dans les applications mobile, d'avoir un feedback utilisateur le plus précis possible

</details>

#### Améliorer le clavier

2 fonctionnalités à ajouter sur le clavier :

- lancer la recherche avec le bouton "OK"
- fermer le clavier lorsqu'une recherche est lancée

<details>
<summary>Correction</summary>

_Search.js_

```
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Keyboard } from 'react-native';

import RestaurantlistItem from '../components/RestaurantListItem';
import DisplayError from '../components/DisplayError';

import Colors from '../definitions/Colors';

import { getRestaurants } from '../api/zomato';

const Search = () => {

  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextOffset, setNextOffset] = useState(0);
  const [isMoreResults, setIsMoreResults] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  const requestRestaurants = async (prevRestaurants, offset) => {
    setIsRefreshing(true);
    setIsError(false);
    try {
      const zomatoSearchResult = await getRestaurants(searchTerm, offset);
      setRestaurants([...prevRestaurants, ...zomatoSearchResult.restaurants]);
      if (zomatoSearchResult.results_start + zomatoSearchResult.results_shown < zomatoSearchResult.results_found) {
        setIsMoreResults(true);
        setNextOffset(zomatoSearchResult.results_start + zomatoSearchResult.results_shown);
      } else {
        setIsMoreResults(false);
      }
    } catch (error) {
      setIsError(true);
      setRestaurants([]);
      setIsMoreResults(true);
      setNextOffset(0);
    }
    setIsRefreshing(false);
  };

  const searchRestaurants = () => {
    Keyboard.dismiss();
    requestRestaurants([], 0);
  };

  const loadMoreRestaurants = () => {
    if (isMoreResults) {
      requestRestaurants(restaurants, nextOffset);
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Nom du restaurant'
          style={styles.inputRestaurantName}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={searchRestaurants}
        />
        <Button
          title='Rechercher'
          color={Colors.mainGreen}
          onPress={searchRestaurants}
        />
      </View>
      {
        isError ?
          (<DisplayError message='Impossible de récupérer les restaurants' />) :
          (<FlatList
            data={restaurants}
            keyExtractor={(item) => item.restaurant.id.toString()}
            renderItem={({ item }) => (
              <RestaurantlistItem restaurantData={item.restaurant} />
            )}
            onEndReached={loadMoreRestaurants}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            onRefresh={searchRestaurants}
          />)
      }
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputRestaurantName: {
    marginBottom: 8,
  },
});

```

</details>

#### Affichage de l'image du restaurant

Il est temps d'ajouter le vrai aperçu des restaurants. Chaque objet restaurant renvoyé par Zomato contient la propriété suivante :

```
"thumb": "https://b.zmtcdn.com/data/res_imagery/6114718_CHAIN_4a57080b96c0041bce378791a73d7395_c.JPG?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A"
```

La documentation du composant _Image_ indique qu'il est possible de charger la source depuis internet comme ceci :

```
<Image
  source={{
    uri: 'https://reactnative.dev/img/tiny_logo.png',
  }}
/>
```

Le problème est que les restaurants de Zomato ne contiennent pas tous de miniature. L'application ne va pas s'arrêter si URI est vide mais va retourner un warning. Il faudrait donc avoir le comportement suivant :

- si une miniature existe, l'afficher
- sinon, avoir une icone pour la remplacer

Mettez en place ce comportement. Voici un indice pour gérer l'affichage :

```
  const getThumbnail = () => {
    if (restaurantData.thumb) {
      return (
        ...
      );
    };
    return (
      ...
    );
  };

  return (
    <View style={styles.container}>
      {getThumbnail()}
      <View style={styles.informationContainer}>
        ...
```

Résultat attendu :

<img src="img/restaurantListItem2.png" height="400" />

<details>
<summary>Correction</summary>

_Assets.js_

```
import iconRate from '../../assets/rate.png';
import iconReview from '../../assets/review.png';
import iconError from '../../assets/error.png';
import iconMissingIMG from '../../assets/missingImage.png';

const Assets = {
  icons: {
    rate: iconRate,
    review: iconReview,
    error: iconError,
    missingIMG: iconMissingIMG,
  },
};

export default Assets;

```

_RestaurantListItem.js_

```
import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import Assets from '../definitions/Assets';
import Colors from '../definitions/Colors';



const RestaurantListItem = ({ restaurantData, restaurantData: { user_rating } }) => {

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
  }

  return (
    <View style={styles.container}>
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
    </View>
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

```

</details>

## Détails d'un restaurant

### React navigation

Installation :

```
npm install @react-navigation/native
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm install @react-navigation/stack
```

Créer un _StackNavigator_ :

```
const StackNavigator = createStackNavigator();

function RootStack() {
  return (
    <StackNavigator.Navigator
      initialRouteName="ScreenName1"
    >
      <StackNavigator.Screen
        name="ScreenName1"
        component={Screen}
      />
      ...
    </StackNavigator.Navigator>
  );
}

export default RootStack;
```

Mise en place :

```
export default function App() {
  return (
    <NavigationContainer>
      <RootStack /> // composant importé
      ...
    </NavigationContainer>
  );
}
```

Navigation :

```
// Pour naviguer vers un autre écran, utilisez la prop 'navigate'
navigation.navigate('screenName', {
  paramName: paramValue,
  ...
});

//Pour récupérer les paramètres, utilisez la prop 'route'
const { paramName } = route.params;
```

### Naviguer de l'aperçu à la page d'un restaurant

Votre prochain objectif est de mettre en place le comportement suivant : lorsque l'utilisateur clique sur un élément de la liste, il navigue vers une nouvelle page. Pour résumer, voici les étapes à effectuer :

- Créez un nouveau composant _Restaurant_
- Modifiez le composant _RestaurantListItem_ pour détecter un clic utilisateur
- Mettez en place la structure de React Navigation
- Branchez le tout pour avoir le comportement attendu

La détection du clic sur un item d'une FlatList n'est pas natif. Voici comment réaliser cette partie :

- Modifiez le composant _View_ global par le composant _ToucheableOpacity_ dans _RestaurantListItem_
- Passez depuis la liste du composant _Search_ la fonction permettant la navigation à chaque item
- Récupérez la fonction et éxécutez la lors d'un clic

Résultat attendu :

<img src="img/navigation1.png" height="400" />
<img src="img/navigation2.png" height="400" />

<details>
<summary>Correction</summary>

_Restaurant.js_

```
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

```

_RestaurantListItem.js_

```
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

```

_Search.js_

```
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Keyboard } from 'react-native';

import RestaurantlistItem from '../components/RestaurantListItem';
import DisplayError from '../components/DisplayError';

import Colors from '../definitions/Colors';

import { getRestaurants } from '../api/zomato';

const Search = ({ navigation }) => {

  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextOffset, setNextOffset] = useState(0);
  const [isMoreResults, setIsMoreResults] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  const requestRestaurants = async (prevRestaurants, offset) => {
    setIsRefreshing(true);
    setIsError(false);
    try {
      const zomatoSearchResult = await getRestaurants(searchTerm, offset);
      setRestaurants([...prevRestaurants, ...zomatoSearchResult.restaurants]);
      if (zomatoSearchResult.results_start + zomatoSearchResult.results_shown < zomatoSearchResult.results_found) {
        setIsMoreResults(true);
        setNextOffset(zomatoSearchResult.results_start + zomatoSearchResult.results_shown);
      } else {
        setIsMoreResults(false);
      }
    } catch (error) {
      setIsError(true);
      setRestaurants([]);
      setIsMoreResults(true);
      setNextOffset(0);
    }
    setIsRefreshing(false);
  };

  const searchRestaurants = () => {
    Keyboard.dismiss();
    requestRestaurants([], 0);
  };

  const loadMoreRestaurants = () => {
    if (isMoreResults) {
      requestRestaurants(restaurants, nextOffset);
    };
  };

  const navigateToRestaurantDetails = () => {
    navigation.navigate("ViewRestaurant");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Nom du restaurant'
          style={styles.inputRestaurantName}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={searchRestaurants}
        />
        <Button
          title='Rechercher'
          color={Colors.mainGreen}
          onPress={searchRestaurants}
        />
      </View>
      {
        isError ?
          (<DisplayError message='Impossible de récupérer les restaurants' />) :
          (<FlatList
            data={restaurants}
            keyExtractor={(item) => item.restaurant.id.toString()}
            renderItem={({ item }) => (
              <RestaurantlistItem restaurantData={item.restaurant} onClick={navigateToRestaurantDetails} />
            )}
            onEndReached={loadMoreRestaurants}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            onRefresh={searchRestaurants}
          />)
      }
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputRestaurantName: {
    marginBottom: 8,
  },
});

```

_navigation/Navigation.js_

```
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Search from '../components/Search';
import Restaurant from '../components/Restaurant';

const SearchNavigation = createStackNavigator();

function RootStack() {
  return (
    <SearchNavigation.Navigator
      initialRouteName="ViewSearch"
    >
      <SearchNavigation.Screen
        name="ViewSearch"
        component={Search}
        options={{ title: 'Recherche' }}
      />
      <SearchNavigation.Screen
        name="ViewRestaurant"
        component={Restaurant}
        options={{ title: 'Restaurant' }}
      />
    </SearchNavigation.Navigator>
  );
}

export default RootStack;

```

_App.js_

```
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Navigation from './src/navigation/Navigation';
import Search from './src/components/Search';
import Test from './src/components/Test';
import Test2 from './src/components/Test2';
import RestaurantListItem from './src/components/RestaurantListItem'

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

```

</details>

### Effets de bord et cycle de vie

Les effets de bord sont des évènements communs dans la vie d'un composant ; par exemple charger des données depuis internet afin de les afficher, "s'abonner" à un service pour être notifié d'un changement de valeur, etc... Il existe 2 types d'effets de bord :

- sans nettoyage ; par exemple au chargement du composant il doit faire une requête pour récupérer des données à afficher
- avec nettoyage ; par exemple au chargement du composant ce dernier doit s'abonner à un service pour être prévenu d'un changement, et lorsque le composant se détruit il doit se désabonner du service

Avec les Hooks de React, les effets de bord sont gérés via la fonction _useEffect_

Exemple sans nettoyage ; à chaque fois que le composant va s'afficher (donc à _l'initialisation (montage)_ ainsi qu'à chaque refresh) le code sera exécuté :

```
useEffect(() => {
  // Met à jour le titre du document via l’API du navigateur
  document.title = `Vous avez cliqué ${count} fois`;
});
```

Exemple avec nettoyage ; à chaque fois que le composant va s'afficher (donc à l'initialisation ainsi qu'à chaque refresh) le code sera exécuté + au moment ou le composant va se _détruire (démonter)_ la fonction du _return_ sera exécutée :

```
useEffect(() => {
  // Code classique du useEffect
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  // Indique comment nettoyer l'effet :
  return function cleanup() { // Le nom de la fonction n'a pas d'importance
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
```

Comme nous venons de le voir, _useEffect_ est appelé à chaque fois que le composant se met à jour. Un comportement standard est de ne vouloir exécuter la fonction que lorsqu'une ou plusieurs données changent :

```
useEffect(() => {
  document.title = `Vous avez cliqué ${count} fois`;
}, [count]); // N’exécute l’effet que si count a changé
```

Un dérivé très utilisé et de vouloir effectuer un _useEffect_ uniquement à l'initialisation du composant :

```
useEffect(() => {
  document.title = loadData();
}, []); // N’exécute l’effet que lors de l'initialisation
```

### Récupérer les données du restaurant

L'objectif de la nouvelle page est d'afficher les informations d'un restaurant ; il faut donc charger ses données depuis l'API (pour l'instant uniquement son nom). Voici le comportement à mettre en place ainsi que des indications :

- Ajoutez une fonction dans _zomato.js_ prennant en paramètre l'id d'un restaurant pour récupérer les données (regardez la doc)
- Passez l'id du restaurant en paramètre de la navigation à la page des détails du restaurant
- Mettez en place le chargement de la page du restaurant :
  - Affichez un loader à l'arrivé sur la page (composant _ActivityIndicator_)
  - Un fois que le composant React est initialisé, faire un call API pour récupérer les données du restaurant (via _UseEffect_)
  - Une fois les données du restaurant récupérées, arrétez d'afficher le loader et affichez le nom du restaurant (ou le composant d'erreur si échec du call)

Rappel : pourquoi ne pas mettre le call API dans le _useState_ ?  
Le retour de l'API est incertain ; nous ne savons pas quand il va revenir ni même s'il va revenir. De plus il faut être certain que le composant a fini de s'initialiser avant de vouloir le modifier

Résultat attendu :

<img src="img/restaurant1.png" height="400" />
<img src="img/restaurant2.png" height="400" />

<details>
<summary>Correction</summary>

_zomato.js_

```
...

export async function getRestaurantDetails(restaurantID) {
  try {
    const myHeaders = new Headers({ 'user-key': API_KEY });
    const url = `https://developers.zomato.com/api/v2.1/restaurant?res_id=${restaurantID}`;
    const response = await fetch(url, { headers: myHeaders });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`Error with function getRestaurantDetails ${error.message}`);
    throw error;
  }
};
```

_RestaurantListItem.js_

```
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
    <TouchableOpacity style={styles.container}
      onPress={() => { onClick(restaurantData.id) }}>
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

```

_Search.js_

```
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Keyboard } from 'react-native';

import RestaurantlistItem from '../components/RestaurantListItem';
import DisplayError from '../components/DisplayError';

import Colors from '../definitions/Colors';

import { getRestaurants } from '../api/zomato';

const Search = ({ navigation }) => {

  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextOffset, setNextOffset] = useState(0);
  const [isMoreResults, setIsMoreResults] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  const requestRestaurants = async (prevRestaurants, offset) => {
    setIsRefreshing(true);
    setIsError(false);
    try {
      const zomatoSearchResult = await getRestaurants(searchTerm, offset);
      setRestaurants([...prevRestaurants, ...zomatoSearchResult.restaurants]);
      if (zomatoSearchResult.results_start + zomatoSearchResult.results_shown < zomatoSearchResult.results_found) {
        setIsMoreResults(true);
        setNextOffset(zomatoSearchResult.results_start + zomatoSearchResult.results_shown);
      } else {
        setIsMoreResults(false);
      }
    } catch (error) {
      setIsError(true);
      setRestaurants([]);
      setIsMoreResults(true);
      setNextOffset(0);
    }
    setIsRefreshing(false);
  };

  const searchRestaurants = () => {
    Keyboard.dismiss();
    requestRestaurants([], 0);
  };

  const loadMoreRestaurants = () => {
    if (isMoreResults) {
      requestRestaurants(restaurants, nextOffset);
    };
  };

  const navigateToRestaurantDetails = (restaurantID) => {
    navigation.navigate("ViewRestaurant", { restaurantID });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Nom du restaurant'
          style={styles.inputRestaurantName}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={searchRestaurants}
        />
        <Button
          title='Rechercher'
          color={Colors.mainGreen}
          onPress={searchRestaurants}
        />
      </View>
      {
        isError ?
          (<DisplayError message='Impossible de récupérer les restaurants' />) :
          (<FlatList
            data={restaurants}
            keyExtractor={(item) => item.restaurant.id.toString()}
            renderItem={({ item }) => (
              <RestaurantlistItem restaurantData={item.restaurant} onClick={navigateToRestaurantDetails} />
            )}
            onEndReached={loadMoreRestaurants}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            onRefresh={searchRestaurants}
          />)
      }
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputRestaurantName: {
    marginBottom: 8,
  },
});

```

_Restaurant.js_

```
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import DisplayError from '../components/DisplayError';

import { getRestaurantDetails } from '../api/zomato';

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

  return (
    <View style={styles.container}>
      {isError ?
        (<DisplayError message='Impossible de récupérer les données du restaurants' />) :
        (isLoading ?
          (<View style={styles.containerLoading}>
            <ActivityIndicator size="large" />
          </View>) :
          (<Text>
            Je suis le restaurant {restaurant.name}
          </Text>)
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
  }
});

```

</details>

### Réalisation de l'interface

Maintenant que la logique de la page du restaurant est en place, il ne reste plus qu'à réaliser l'interface. Comme souvent, cette étape n'est pas la plus compliquée mais prend pas mal de temps ; c'est un bon exercice pour appliquer ce que vous avez appris. Petites nouveautés ici :

- comment afficher la liste des horaires d'ouverture ?
- comment faire si le contenu ne tient pas sur un écran en hauteur ?
- comment afficher la bonne couleur pour la note (renvoyée par l'API) ?

Résultat attendu :

<img src="img/restaurant3.png" height="400" />

<details>
<summary>Correction</summary>

_Restaurant.js_

```
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

```

</details>

## Sauvegarder des restaurants

## Redux

Installation

```
npm install redux
npm install react-redux
```

Exemple d'un **reducer**

```
const initialState = { myValues: [] }

function reducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'ADD': // Exemple pour ajouter une valeur
      nextState = {
        ...state,
        myValues: [...state.myValues, action.value]
      };
      return nextState || state
    case 'ACTIONNAME':
        // Code here
      return nextState || state
    default:
      return state
  };
}

export default reducer;
```

Creation du **store** et mise à disposition dans l'application

```
import { createStore } from 'redux';
import monReducer from 'path';

export default createStore(monReducer);
```

```
import { Provider } from 'react-redux';

import Store from 'path';

export default function App() {
  return (
    <Provider store={ Store }>
      ...
    </Provider>
  );
}
```

Connexion au store dans le composant

```
import { connect } from 'react-redux';

const MonComposant = ( {injecteDansLeComposant} ) => {
  // Le composant a accès à injecteDansLeComposant
}

const mapStateToProps = (state) => {
  return {
    injecteDansLeComposant: state.myValues
  }
}

export default connect(mapStateToProps)(MonComposant);
```

Exemple d'une **action**

```
const action = {type: 'ACTIONNAME', value: []};
dispatch(action); // dispatch est injectée par Redux dans les props du composant
```

Bonnes pratiques :

- 1 dossier _store_ qui contient les éléments de Redux
- 1 fichier _config_ qui contient la fonction _createStore_
- 1 dossier _store/reducers_ qui contient les reducer
- 1 reducer = 1 fichier

### Mise en favoris des restaurants

Pour pratiquer Redux, vous allez mettre en place une fonctionnalité de mise en favoris des restaurants. Sur la page d'un restaurant, il faut ajouter un bouton pour le mettre / le retirer des favoris  
Procédez par étapes ; mettre en place Redux (reducer, store...), connecter le store au composant et enfin l'affichage

Résultat attendu :

<img src="img/fav1.png" height="400" />
<img src="img/fav2.png" height="400" />

<details>
<summary>Correction</summary>

_store/reducers/favRestaurants.js_

```
const initialState = { favRestaurantsID: [] }

function favRestaurants(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SAVE_RESTAURANT':
      nextState = {
        ...state,
        favRestaurantsID: [...state.favRestaurantsID, action.value]
      };
      return nextState || state
    case 'UNSAVE_RESTAURANT':
      nextState = {
        ...state,
        favRestaurantsID: state.favRestaurantsID.filter(id => id !== action.value)
      };
      return nextState || state
    default:
      return state
  };
}

export default favRestaurants;
```

_store/config.js_

```
import { createStore } from 'redux';

import favRestaurantsReducer from './reducers/favRestaurants';

export default createStore(favRestaurantsReducer);

```

_App.js_

```
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import Navigation from './src/navigation/Navigation';
import Store from './src/store/config';

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Navigation />
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}

```

_Restaurant.js_

```
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, Image, Button } from 'react-native';
import { connect } from 'react-redux';

import DisplayError from '../components/DisplayError';

import { getRestaurantDetails } from '../api/zomato';

import Colors from '../definitions/Colors';
import Assets from '../definitions/Assets';

const Restaurant = ({ route, favRestaurants, dispatch }) => {
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

  // On pourrait définir les actions dans un fichier à part
  const saveRestaurant = async () => {
    const action = { type: 'SAVE_RESTAURANT', value: route.params.restaurantID };
    dispatch(action);
  }

  const unsaveRestaurant = async () => {
    const action = { type: 'UNSAVE_RESTAURANT', value: route.params.restaurantID };
    dispatch(action);
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
      <View style={{ marginBottom: 16, }}>
        {timingsJSX}
      </View>
    );
  }

  const displaySaveRestaurant = () => {
    if (favRestaurants.findIndex(i => i === route.params.restaurantID) !== -1) {
      // Le restaurant est sauvegardé
      return (
        <Button
          title='Retirer des favoris'
          color={Colors.mainGreen}
          onPress={unsaveRestaurant}
        />
      );
    }
    // Le restaurant n'est pas sauvegardé
    return (
      <Button
        title='Ajouter aux favoris'
        color={Colors.mainGreen}
        onPress={saveRestaurant}
      />
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
              {displaySaveRestaurant()}
            </View>
          </ScrollView>)
        )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    favRestaurants: state.favRestaurantsID
  }
}

export default connect(mapStateToProps)(Restaurant);

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

```

</details>

C'est toujours une bonne idée de donner du feedback à l'utilisateur sur ses actions. Vous allez afficher une notification lorsque ce dernier ajoute / retire un restaurant des favoris. Pour cela, je vous invite à utiliser _react-native-root-toast_

<details>
<summary>Correction</summary>

```
npm install react-native-root-toast
```

_App.js_

```
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';

import Navigation from './src/navigation/Navigation';
import Store from './src/store/config';

export default function App() {
  return (
    <Provider store={Store}>
      <RootSiblingParent>
        <NavigationContainer>
          <Navigation />
          <StatusBar style="auto" />
        </NavigationContainer>
      </RootSiblingParent>
    </Provider>
  );
}

```

_Restaurant.js_

```
...

import Toast from 'react-native-root-toast';

  const saveRestaurant = async () => {
    const action = { type: 'SAVE_RESTAURANT', value: route.params.restaurantID };
    dispatch(action);
    let toast = Toast.show('Restaurant ajouté aux favoris', {
      duration: Toast.durations.LONG,
    });
  }

  const unsaveRestaurant = async () => {
    const action = { type: 'UNSAVE_RESTAURANT', value: route.params.restaurantID };
    dispatch(action);
    let toast = Toast.show('Restaurant retiré des favoris', {
      duration: Toast.durations.LONG,
    });
  }

  ...
```

</details>

Pour améliorer la visibilité des restaurants en favoris depuis la page de recherche, vous allez ajouter une icone pour les différencier. Il existe 2 façons de procéder :

- connecter le store à chaque composant _RestaurantListItem_ -> ce n'est pas une bonne idée car cela pourrait impacter les performances de l'application
- connecter le store au composant _Search_ et passer à chaque élément de la liste une prop lui indiquant s'il doit afficher l'icone -> bonne solution

Nouveauté qui risque de vous bloquer : le composant liste va demander à se rafraichir uniquement si sa liste d'éléments change (ajout ou suppression), pas si les données de ses éléments changent. Autrement dit, si vous ajoutez un restaurant en favoris et retournez sur la vue de recherche, vous ne verrez pas de changements. Pour remédier à ce problème, il existe une prop _extraData_ à renseigner à la liste qui permet de rafraichir le composant au changement d'une donnée (ici les restaurants en favoris)

Résultat attendu :

<img src="img/fav3.png" height="400" />

<details>
<summary>Correction</summary>

_Assets.js_

```
import iconRate from '../../assets/rate.png';
import iconReview from '../../assets/review.png';
import iconError from '../../assets/error.png';
import iconMissingIMG from '../../assets/missingImage.png';
import iconFavEmpty from '../../assets/favEmpty.png';
import iconFavFull from '../../assets/favFull.png';

const Assets = {
  icons: {
    rate: iconRate,
    review: iconReview,
    error: iconError,
    missingIMG: iconMissingIMG,
    favEmpty: iconFavEmpty,
    favFull: iconFavFull,
  },
};

export default Assets;

```

_Search.js_

```
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import RestaurantlistItem from '../components/RestaurantListItem';
import DisplayError from '../components/DisplayError';

import Colors from '../definitions/Colors';

import { getRestaurants } from '../api/zomato';

const Search = ({ navigation, favRestaurants }) => {

  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nextOffset, setNextOffset] = useState(0);
  const [isMoreResults, setIsMoreResults] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  const requestRestaurants = async (prevRestaurants, offset) => {
    setIsRefreshing(true);
    setIsError(false);
    try {
      const zomatoSearchResult = await getRestaurants(searchTerm, offset);
      setRestaurants([...prevRestaurants, ...zomatoSearchResult.restaurants]);
      if (zomatoSearchResult.results_start + zomatoSearchResult.results_shown < zomatoSearchResult.results_found) {
        setIsMoreResults(true);
        setNextOffset(zomatoSearchResult.results_start + zomatoSearchResult.results_shown);
      } else {
        setIsMoreResults(false);
      }
    } catch (error) {
      setIsError(true);
      setRestaurants([]);
      setIsMoreResults(true);
      setNextOffset(0);
    }
    setIsRefreshing(false);
  };

  const searchRestaurants = () => {
    Keyboard.dismiss();
    requestRestaurants([], 0);
  };

  const loadMoreRestaurants = () => {
    if (isMoreResults) {
      requestRestaurants(restaurants, nextOffset);
    };
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
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Nom du restaurant'
          style={styles.inputRestaurantName}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={searchRestaurants}
        />
        <Button
          title='Rechercher'
          color={Colors.mainGreen}
          onPress={searchRestaurants}
        />
      </View>
      {
        isError ?
          (<DisplayError message='Impossible de récupérer les restaurants' />) :
          (<FlatList
            data={restaurants}
            extraData={favRestaurants}
            keyExtractor={(item) => item.restaurant.id.toString()}
            renderItem={({ item }) => (
              <RestaurantlistItem
                restaurantData={item.restaurant}
                onClick={navigateToRestaurantDetails}
                isFav={amIaFavRestaurant(item.restaurant.id)} />
            )}
            onEndReached={loadMoreRestaurants}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            onRefresh={searchRestaurants}
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

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputRestaurantName: {
    marginBottom: 8,
  },
});

```

_RestaurantListItem.js_

```
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

import Assets from '../definitions/Assets';
import Colors from '../definitions/Colors';



const RestaurantListItem = ({ onClick, restaurantData, restaurantData: { user_rating }, isFav = false }) => {

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
    <TouchableOpacity style={styles.container}
      onPress={() => { onClick(restaurantData.id) }}>
      {getThumbnail()}
      <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {restaurantData.name}
          </Text>
          {isFav ?
            (<Image style={[styles.icon, { marginLeft: 'auto' }]} source={Assets.icons.favFull} />) :
            (null)
          }
        </View>
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
  titleContainer: {
    flexDirection: 'row',
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

```

</details>

### Conserver les restaurants

Vous avez du le remarquer, le store est réinitialisé après le redémarrage de l'application. Pour conserver l'état du store de Redux nous pouvons utiliser _redux-persist_. Il se base sur 2 concepts :

- persist : sauvegarder l'information du store
- rehydrate : récupérer l'information et l'injecter dans le store

Installation (async-storage va nous permettre de stocker nos données ; on aurait pu utiliser le cache, les cookies etc... (sur le Web))

```
npm install redux-persist
npm install @react-native-async-storage/async-storage
```

Définition du store (_store/config.js_)

```
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
...

const configPersist = {
  key: 'root',
  storage: AsyncStorage,
};

const reducerPersist = persistReducer(configPersist, reducer);

export const Store = createStore(reducerPersist);
export const Persistor = persistStore(Store);
```

Mise à disposition dans l'app (_App.js_)

```
import { PersistGate } from 'redux-persist/integration/react';
import { Store, Persistor } from './src/store/config';
...

export default function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        ...
```

La prop _loading_ permet de définir un composant à afficher tant que le store n'est pas réhydraté (par exemple, un _ActivityIndicator_). De nombreuses options sont disponibles avec _redux-persist_, je vous encourage à regarder le dépot Git

**Mettez en place redux-persist dans le projet**

<details>
<summary>Correction</summary>

_config.js_

```
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import favRestaurantsReducer from './reducers/favRestaurants';

const configPersist = {
  key: 'root',
  storage: AsyncStorage,
};

const reducerPersist = persistReducer(configPersist, favRestaurantsReducer);

export const Store = createStore(reducerPersist);
export const Persistor = persistStore(Store);

```

_App.js_

```
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootSiblingParent } from 'react-native-root-siblings';

import Navigation from './src/navigation/Navigation';
import { Store, Persistor } from './src/store/config';

export default function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <RootSiblingParent>
          <NavigationContainer>
            <Navigation />
            <StatusBar style="auto" />
          </NavigationContainer>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}

```

</details>

### Consulter les restaurants favoris

Dernière fonctionnalité à ajouter au projet : séparer la vue en 2 tabs permettant de soit faire une recherche, soit consulter les restaurants en favoris. Voici les 2 étapes à réaliser :

- modifiez la navigation en utilisant le composant _BottomTabNavigator_
- effectuez les changements nécessaires pour consulter les restaurants sauvegardés

Pour le premier point, je vous laisse consulter la documentation. Cela fonctionne de la même façon que le _StackNavigator_ ; pensez juste à inclure la navigation de recherche dans la navigation en tab

Pour le second point, prenez en compte les éléments suivants :

- réutilisez les composants que vous avez développé, c'est tout l'interet !
- pensez à faire les requêtes necessaires pour récupérer les restaurants favoris, et rafraichir les données quand les restaurants favoris changent

Résultat attendu :

<img src="img/tab1.png" height="400" />
<img src="img/tab2.png" height="400" />

<details>
<summary>Correction</summary>

_Navigation.js_

```
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import Search from '../components/Search';
import Restaurant from '../components/Restaurant';
import FavRestaurants from '../components/FavRestaurants';

import Colors from '../definitions/Colors';
import Assets from '../definitions/Assets';

const SearchNavigation = createStackNavigator();
const FavNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

function searchStackScreens() {
  return (
    <SearchNavigation.Navigator
      initialRouteName="ViewSearch"
    >
      <SearchNavigation.Screen
        name="ViewSearch"
        component={Search}
        options={{ title: 'Recherche' }}
      />
      <SearchNavigation.Screen
        name="ViewRestaurant"
        component={Restaurant}
        options={{ title: 'Restaurant' }}
      />
    </SearchNavigation.Navigator>
  )
};

function favStackScreens() {
  return (
    <FavNavigation.Navigator
      initialRouteName="ViewFav"
    >
      <FavNavigation.Screen
        name="ViewFav"
        component={FavRestaurants}
        options={{ title: 'Favoris' }}
      />
      <FavNavigation.Screen
        name="ViewRestaurant"
        component={Restaurant}
        options={{ title: 'Restaurant' }}
      />
    </FavNavigation.Navigator>
  )
};

function RootStack() {
  return (
    <TabNavigation.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.mainGreen,
        headerShown: false
      }}>
      <TabNavigation.Screen
        name="Recherche"
        component={searchStackScreens}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return <Image source={Assets.icons.search} style={{ tintColor: color }} />;
          }
        })}
      />
      <TabNavigation.Screen
        name="Favoris"
        component={favStackScreens}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return <Image source={Assets.icons.favFull} style={{ tintColor: color }} />;
          }
        })}
      />
    </TabNavigation.Navigator>
  );
}

export default RootStack;

```

_FavRestaurants.js_

```
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

```

_Assets.js_

```
import iconRate from '../../assets/rate.png';
import iconReview from '../../assets/review.png';
import iconError from '../../assets/error.png';
import iconMissingIMG from '../../assets/missingImage.png';
import iconFavEmpty from '../../assets/favEmpty.png';
import iconFavFull from '../../assets/favFull.png';
import iconSearch from '../../assets/search.png';

const Assets = {
  icons: {
    rate: iconRate,
    review: iconReview,
    error: iconError,
    missingIMG: iconMissingIMG,
    favEmpty: iconFavEmpty,
    favFull: iconFavFull,
    search: iconSearch,
  },
};

export default Assets;

```


</details>

### Aller plus loin avec Redux

Je n'ai évoqué ici que la base de Redux. Sachez qu'il est également possible :

- De combiner des reducers (important de séparer les reducer par "logique", donc il faut les combiner à la fin pour les utiliser dans le store).
- Séparer les actions dans des fichiers. Actuellement nos actions sont définies directement dans le code de nos composant. Il est préférable de créer un fichier par reducer contenant les actions (des fonctions) à importer dans les composants. En effet, il n'est pas rare que plusieurs composants effectus la même action.
- Ajouter des middlewares (des actions qui vont se déclencher à certains moments).
- Pour redux-persist, il est également possible de sélectionner les reducers à persister ou non. Cela peut être utile pour ne pas garder des infos temporaires à l'éxécution de l'app, mais conserver un utilisateur connecté depuis peu par exemple.

## Idées d'améliorations

Pour ceux qui sont bien en avance sur le cours, voici quelques idées à ajouter dans le projet. Il est possible que cela vous serve par la suite ;)

- Possibilité d'ajouter des filtres dans la recherche (sur le type de restaurant, de cuisine, l'emplacement géographique, le prix... Il y a plein de possibilités)
- Accéder au menu du restaurant
- Afficher les dernières reviews sur la page du restaurant
- Ajouter une autre page type "Accueil" dans un autre onglet avec une interface sous forme de card pour rapidement set les critères de recherche (par exemple, une card "Les meilleurs restaurants de Londres à petit prix" qui va rediriger vers l'onglet Search, avec la requête sur la liste des restaurants avec ces critères).
- Ajouter d'autres types de navigation dans l'app

# Other

## Les bibliothèques graphique

Jusqu'à présent, nous avons utilisé les composants de base de React Native (_Text_, _Button_) pour créer des composants personnalisés. Il existe également des bibliothèques de composants nous permettant de gagner beaucoup de temps lors du développement d'une application. Il est même très rare de ne pas les utiliser.

Nous allons nous servire de **UI Kitten**, une des bibliothèque les plus populaire. [La documentation est disponible ici.](https://akveo.github.io/react-native-ui-kitten/docs/getting-started/what-is-ui-kitten#what-is-ui-kitten)

Créez un nouveau projet avec Expo, puis installez UI Kitten :

```
expo init TestUIKitten

npm i @ui-kitten/components @eva-design/eva react-native-svg
expo install react-native-svg@9.13.6
```

Créez un composant _Home.js_ et modifiez le code de _App.js_. Vous devriez voir s'afficher "HOME" sur votre écran.

<details>
<summary>Code</summary>

_Home.js_

```
import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const Home = () => {
    return (
        <Layout style={styles.container}>
          <Text category='h1'>HOME</Text>
        </Layout>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
```

_App.js_

```
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider} from '@ui-kitten/components';

import Home from './src/component/Home';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
        <Home/>
        <StatusBar style="auto" />
    </ApplicationProvider>
  );
}
```

</details>

En plus d'ajouter des nouveaux composants (sélecteur de date, sélecteur multiples, séparation...), l'avantage principal de ce framework est de gérer les thèmes facilement à travers l'application. Pour l'initier, générer votre plage de couleurs via [ce site](https://colors.eva.design/?utm_campaign=eva_colors%20-%20home%20-%20kitten_docs&utm_source=ui_kitten&utm_medium=referral&utm_content=branding_article_link), exportez le fichier en format JSON et ajoutez le à la racine de votre projet. Modifiez _App.js_ :

```
...
import { default as theme } from './theme.json';
...
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
...
```

Le fichier _theme.json_ contient la liste des couleurs utilisées par les composants de votre application. En modifiant une valeur, vous allez d'un seul coup modifier tous les composants. De plus en utilisant les bonnes propriétés dans vos composants, vous n'aurez plus besoin de définir le style à chaque fois.

Par exemple

```
<Text status='danger'>Danger</Text>
```

aura toujours une couleur rouge (enfin la couleur **color-danger-400** de votre _theme.json_).

## Déployer une app avec expo

**ATTENTION: le passage au SDK 44 implique possiblement des changements**

Pour déployer une app en stand alone :

- Créez un compte sur expo (https://expo.io/signup)
- Dans le fichier _app.json_, ajoutez

```
"expo" : {
  ...
  "android": {
    "package": "com.entrepriseName.applicationName"
  }
}
```

- Coupez votre serveur
- Supprimez le dossier .expo à la racine de votre projet
- Utilisez la commande suivante :

```
expo build:android -t apk
```

Connectez-vous avec votre compte, et laissez expo se charger de la keystore. Cette clé est utilisée lors de l'upload sur le google PlayStore afin de signer l'app. Si vous le souhaitez, vous pouvez la récupérer pour la stocker avec la commande

```
expo fetch:android:keystore
```

Le build va se lancer. Il est effectué sur des serveurs à distance, avec une file d'attente qui peut être très longue (de quelques minutes à une dizaine d'heures parfois). Ne faite le build que à la fin de votre projet.  
Vous pouvez suivre l'avancé du build dans votre compte expo. De plus, une fois que ce dernier est complété un lien est disponible dans les logs pour le télécharger depuis S3 (stockage Amazon).
