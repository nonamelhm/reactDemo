// 组件引入
// import {Outlet, Link} from "react-router-dom";
// 路由表引入
import {useRoutes, Link} from "react-router-dom";
import routes from './routes';

function App() {
    //引入路由表
    const outlet = useRoutes(routes);
    return (
        <div className="App">
            {/*<Link to="/home">Home</Link>|*/}
            {/*<Link to="/about">About</Link>*/}
            {/* 占位符组件——类似于窗口，用来展示组件的，像vue中的router-view */}
            {/*<Outlet></Outlet>*/}
            {/*路由表形式使用*/}
            {outlet}
        </div>
    )
}

export default App
