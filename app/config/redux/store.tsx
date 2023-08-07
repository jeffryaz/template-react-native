import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { Middleware, configureStore } from '@reduxjs/toolkit';
import Config from "react-native-config";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import rootPersist from "./rootPersist";


const persistConfig = rootPersist.storeConfig;
const finalReducers = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
    colors: {
        title: () => 'inherit',
        prevState: () => '#9E9E9E',
        action: () => '#03A9F4',
        nextState: () => '#4CAF50',
        error: () => '#F20404',
    }
});

const middlewares: Middleware[] = [sagaMiddleware, thunk];

if (Config.NODE_ENV !== 'production') {
    middlewares.push(logger)
}

const reduxStore = configureStore({
    reducer: finalReducers,
    middleware: middlewares,
    devTools: Config.NODE_ENV !== 'production'
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(reduxStore);

export {
    persistor,
    reduxStore as store,
};
