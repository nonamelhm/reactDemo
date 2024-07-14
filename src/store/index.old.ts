import {legacy_createStore} from 'redux';
import reducerOld from './reducer.old.ts';
//定义store
//window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()  为了让浏览器正常使用redux-devTools
const store = legacy_createStore(reducerOld,Window.__REDUX_DEVTOOLS_EXTENSION__&&Window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
