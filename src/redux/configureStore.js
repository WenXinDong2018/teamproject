import {createStore, combineReducers} from "redux";
import { Requests } from './requests';
import { Deliveries } from './deliveries';
import { Myorders } from './myorders';
import { Notifications } from './notifications';
import {NearbyStores} from './nearByStores'
import { createForms } from 'react-redux-form';
import { InitialFeedback, InitialDeliveryPost, InitialRequestPost, ContactInfoInitialForm } from './forms';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            requests: Requests,
            deliveries: Deliveries,
            notifications: Notifications,
            myorders: Myorders,
            nearbystores: NearbyStores,
            ...createForms({
                feedback: InitialFeedback,
                contactInfo: ContactInfoInitialForm,
                requestPost: InitialRequestPost,
                deliveryPost: InitialDeliveryPost,
            })

        })
    );
    return store;
}