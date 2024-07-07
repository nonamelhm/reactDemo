// 路由懒加载
import React, {lazy} from "react";
import {Navigate} from "react-router-dom";
// 引入使用lazy 实现路由懒加载
const Home = lazy(() => import('@/views/Home'));
const Page1 = lazy(() => import('@/views/Page1'));
const Page2 = lazy(() => import('@/views/Page2'));

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
        element: <Navigate to="/page1"/>
    },
    {
        path: "/",
        element: withLoadingComponents(<Home />),
        children:[
            {
                path: "/page1",
                element:withLoadingComponents(<Page1 />)
            },
            {
                path: "/page2",
                element:withLoadingComponents(<Page2 />)
            }
        ]
    },
    // 其它非配置路由页面
    {
        path: "/*",
        element: <Navigate to="/page1"/>
    },
]
export default routes
