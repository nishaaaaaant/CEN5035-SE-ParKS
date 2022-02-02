import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const middleware = [thunk];
const intialState = {};

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// const preloadedState = window.__PRELOADED_STATE__;

// delete window.__PRELOADED_STATE__;

const store = createStore(
  rootReducer(),
  intialState,
  //   applyMiddleware(...middleware)
  composeEnhancers(applyMiddleware(...middleware))
);

store.asyncReducers = {};

/*eslint-disable*/
if (module.hot) {
  module.hot.accept("./rootReducer", () => {
    store.replaceReducer(createReducer(store.injectedReducers));
  });
}
/**eslint-enable */
export default store;