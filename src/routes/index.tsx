import App from '@/App';
import Home from '@/views/Home';
import About from '@/views/About';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//两种路由模式的组件：BrowserRouters(History模式） HashRouter(Hash模式）

// const baseRoute = ()=>{
// return (
// )}
// 以上写法可以简写为
const baseRoute = ()=>(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/about" element={<About/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
)
export default baseRoute;
