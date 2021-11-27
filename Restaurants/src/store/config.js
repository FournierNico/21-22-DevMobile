import { createStore } from 'redux';

import favRestaurantsReducer from './reducers/favRestaurants';

export default createStore(favRestaurantsReducer);
