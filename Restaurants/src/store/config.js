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