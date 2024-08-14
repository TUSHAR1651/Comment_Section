import { createStore } from 'redux';
import rootReducer from './reducers';

// Function to save state to local storage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
};

// Function to load state from local storage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load state", err);
        return undefined;
    }
};

// Load initial state from local storage
const preloadedState = loadState();

// Create the Redux store with preloaded state
const store = createStore(
    rootReducer,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Subscribe to store updates and save state to local storage
store.subscribe(() => {
    saveState(store.getState());
});

export default store;
