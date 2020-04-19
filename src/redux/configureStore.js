import {createStore, combineReducers, applyMiddleware} from "redux";
import { Requests } from './requests';
import { Myorders } from './myorders';
import { Notifications } from './notifications';
import {NearbyStores} from './nearByStores'
import { createForms } from 'react-redux-form';
import { InitialRequestPost, ContactInfoInitialForm , InitialOfferDelivery} from './forms';
import thunk from "redux-thunk";


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            requests: Requests,
            notifications: Notifications,
            myorders: Myorders,
            nearbystores: NearbyStores,
            ...createForms({
                contactInfo: ContactInfoInitialForm,
                requestPost: InitialRequestPost,
                offerDelivery: InitialOfferDelivery,
            })

        }), applyMiddleware(thunk)
    );
    return store;
}