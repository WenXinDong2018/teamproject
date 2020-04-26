import * as ActionTypes from "./ActionTypes";
const initialState = {
  store: null,
  typeErrand: null,
  date: new Date(),
  miles: null,
};

export const Filters = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_FILTERS:
      var payload = action.payload;
      return payload.data;
    default:
      return state;
  }
};
