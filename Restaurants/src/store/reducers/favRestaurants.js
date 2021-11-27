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