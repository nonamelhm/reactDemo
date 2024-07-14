import React from 'react';
import ReactDOM from 'react-dom/client';
// 引入reset-css
import "reset-css";
// 其它UI框架
// 全局引入UI
import "@/assets/styles/global.scss";
// 组件写法
// import Router from '@/routes';
// 路由表写法
import App from './App.tsx';
//引入history模式路由
import {BrowserRouter} from "react-router-dom";
//引入数据
// import {Provider} from "react-redux";
// import store from "@/store/index.old.ts";
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './store';

//开发环境先去除严格模式<React.StrictMode> 否则会加载2次
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
)
