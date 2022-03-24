import { createStore } from "redux";
import reducers from "./reducers";

const middlewares = [];
const windowIfDefined = typeof window === "undefined" ? null : window;
if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    middlewares.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
}

export default createStore(reducers, ...middlewares);
