import {createStore, combineReducers} from "redux";
import { Requests } from './requests';
import { Myorders } from './myorders';
import { Notifications } from './notifications';
import {NearbyStores} from './nearByStores'
import { createForms } from 'react-redux-form';
import { InitialRequestPost, ContactInfoInitialForm } from './forms';


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
            })

        })
    );
    return store;
}