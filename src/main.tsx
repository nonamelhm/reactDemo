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

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
)
