import { compose, createStore, configureStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

//whenever u dispatch an action, before that action hits the reducer , it hits the middleware first
const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));
//root-reducer
export const store = createStore(rootReducer, undefined, composedEnhancers);
