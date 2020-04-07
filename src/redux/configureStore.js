import {createStore, combineReducers} from "redux";
import { Requests } from './requests';
import { Deliveries } from './deliveries';
import { Myorders } from './myorders';
import { Notifications } from './notifications';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            requests: Requests,
            deliveries: Deliveries,
            notifications: Notifications,
            myorders: Myorders,
            ...createForms({
                feedback: InitialFeedback
            })

        })
    );
    return store;
}