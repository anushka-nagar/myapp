import { createStore } from 'redux';
import { initialState, Reducer } from './Reducer';

export const ConfigureStore = () => {
    const store = createStore(Reducer, initialState);
    return store;
}