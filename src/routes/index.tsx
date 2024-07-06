import Home from '@/views/Home';
import About from '@/views/About';
import {Navigate} from "react-router-dom";

// 路由表写法
const routes = [
    {
        path: "/",
        element:<Navigate to="/home"/>
    },
    {
        path: "/home",
        element:<Home/>
    },
    {
        path: "/about",
        element:<About/>
    }
]
export default routes
