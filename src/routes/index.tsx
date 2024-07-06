// 路由懒加载
import React, {lazy} from "react";
import {Navigate} from "react-router-dom";
// 引入使用lazy 实现路由懒加载
const Home = lazy(() => import('@/views/Home'));
const About = lazy(() => import('@/views/About'));
// 懒加载的模式的组件的写法，外面需要添加一层Loading的提示组件
// 封装lazy函数
const withLoadingComponents = (comp:JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)
// 路由表写法
const routes = [
    {
        path: "/",
        element: <Navigate to="/home"/>
    },
    {
        path: "/home",
        element:withLoadingComponents(<Home/>)
    },
    {
        path: "/about",
        element:withLoadingComponents(<About/>)
    }
]
export default routes
