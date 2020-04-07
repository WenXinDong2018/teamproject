import * as ActionTypes from "./ActionTypes";
import { baseUrl } from '../shared/baseUrl';
export const addComment = (dishId, rating, author, comment)=>({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }

});

// export const fetchDishes = (dispatch)=>{
//     dispatch(dishesLoading(true));
//     return fetch(baseUrl + "dishes").then(response =>response.json()).then(dishes => dispatch(addDishes(dishes)))
// }
    