import {createStore, combineReducers, applyMiddleware} from "redux";
import { Requests } from './requests';
import { Myorders } from './myorders';
import { Notifications } from './notifications';
import {NearbyStores} from './nearByStores';
import {Updates} from "./updates";
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
            updates: Updates,
            ...createForms({
                contactInfo: ContactInfoInitialForm,
                requestPost: InitialRequestPost,
                offerDelivery: InitialOfferDelivery,
            })

        }), applyMiddleware(thunk)
    );
    return store;
}