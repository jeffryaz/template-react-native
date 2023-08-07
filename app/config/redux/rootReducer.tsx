import { combineReducers } from "redux";
import { reducerLayout } from "../layout/reducerLayout";

const reduxReducer = combineReducers({
    layout: reducerLayout,
});

const rootReducer = (state: any, action: any) => reduxReducer(state, action);

export default rootReducer;
