import {createStore, combineReducers, applyMiddleware} from "redux";
import { Requests } from './requests';
import { Notifications } from './notifications';
import {NearbyStores} from './nearByStores';
import {Updates} from "./updates";
import { createForms } from 'react-redux-form';
import {Auth} from "./auth"
import {UserInfo} from "./userInfo"
import {Filters} from "./filters"
import { InitialRequestPost, ContactInfoInitialForm , InitialOfferDelivery} from './forms';
import thunk from "redux-thunk";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            requests: Requests,
            notifications: Notifications,
            nearbystores: NearbyStores,
            updates: Updates,
            auth: Auth,
            filters: Filters,
            userInfo: UserInfo,
            ...createForms({
                requestPost: InitialRequestPost,
                offerDeliveryForm: InitialOfferDelivery,
            })

        }), applyMiddleware(thunk)
    );
    return store;
}