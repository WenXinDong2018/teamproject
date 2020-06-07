import { NEARBYSTORES } from '../shared/nearbystores';
//we will expand on this later using Google Place API
//for now we are just hard-coding the stores
export const NearbyStores = (state = NEARBYSTORES, action) => {
    switch (action.type) {
        default:
            return state;
            }
};
