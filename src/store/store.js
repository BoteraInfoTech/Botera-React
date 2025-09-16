import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk"; // ✅ named import
import promise from "redux-promise-middleware";
import rootReducer from "../reducers";

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = applyMiddleware(thunk, promise);
const enhancer = composeEnhancers(middleware);

const store = createStore(rootReducer, enhancer);

export const appDispatcher = store.dispatch;
export default store;
