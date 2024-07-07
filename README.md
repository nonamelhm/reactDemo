# React + TypeScript + Vite 
> 此项目为react后台管理系统练习实操过程及笔记记录
* [学习视频](https://www.bilibili.com/video/BV1FV4y157Zx?p=1&vd_source=4046650f4b6e75ab86067f7a5a418626)
* [Antd](https://ant-design.antgroup.com/components/overview-cn)

# 创建项目并且运行
* node.js版本建议较新的稳定版本
* reactDemo 为项目名称 自定义
```shell
npm create vite@latest reactDemo
```
* 选择react+typescript即可
* 安装依赖打开
## 修改项目运行命令
  * package.json中配置script
比如：修改运行端口和暴露ip
```json
"script":{
"dev": "vite --host --port 3002"
}
```
# 目录初始化
* 多余文件删除 index.css app.css 等，修改app.tsx
* main.tsx——根文件，去除index.css

# 样式初始化
在main.tsx中：
1. 引入reset-css:清除各种间距等
2. 接下来是UI框架的样式
## reset-css
> reset-css比Normalize.css更直接，干净利落去除默认样式，更适合在企业里的场景，所以用reset-css，而不用Normalize.css

* 安装
```shell
npm i reset-css
```
在src/main.tsx中引入reset-css
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
// 引入reset-css
import "reset-css";
// 其它UI框架

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
```
# scss安装和初步使用
1. 安装sass
```shell
npm i --save-dev sass
```
补充：devDependencies 开发环境中用，打包无需引入
2. 创建文件夹 assets---->styles----->global.scss
编写样式，如下：
```scss
$color: #fcf;
body{
  background-color: $color;
  //禁用文字选中
  user-select: none;
}
img{
  //禁止拖动图片
  --webkit-user-drag:none;
}

```
3. 全局引入scss，如下：main.tsx:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
// 引入reset-css
import "reset-css";
// 其它UI框架

// 全局引入UI
import "./assets/styles/global.scss";
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

```
# 路径别名的配置
> 目前ts对@指向src目录是不支持的，vite默认也不支持的，所以需要手动配置@符号的指向

**在vite.config.ts中添加配置：**
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve:{
        alias:{
            '@': path.resolve(__dirname,'./src'),
        }
    }
})
```
这时候引入的path模块会报红，但其实我们已经有node，已经有了path模块，只是缺少ts的一些声明配置，所以需要安装关于node这个库的ts声明配置.
所以需要安装关于node这个库的ts的声明配置。
```shell
npm i -D @types/node
```
安装成功就没有报红了，如果import还报红，就把引入换成 `import * as path from 'path`;
# 配置路径别名的提示
> 虽然路径别名已经有了，但是在文件中输入@是没有提示路径的，需要我们在`tsconfig.app.json`中，添加两项配置

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  }
}
```
# scss文件的全局引入会影响其它组件
> 举例说明，新建Comp1,Comp2.引入会导致样式污染,即使Comp2没引入Comp1.scss，详见代码文件
* components->Comp1->index.tsx
* components->Comp1->comp1.scss
* components->Comp2->index.tsx
# scss的模块化管理
1. 将components->Comp1->comp1.scss改成* components->Comp1->comp1.module.scss
2. 引入使用
```tsx
import styles from "./comp1.module.scss";
function Comp1(){
    return (
        <div className={styles.box}>
            <p>这是Comp1的内容</p>
        </div>
    )
}

export default Comp1;
```
# Antd的初步使用
* 安装Antd Design
```shell
 npm install antd --save
```
* 安装图标所需要的模块
```shell
npm install --save @ant-design/icons
```
* ~~引入样式（目前v5版本已弃用less,无需引入)~~  [详见技术调整](https://ant-design.antgroup.com/docs/react/migration-v5-cn)
```ts
import "antd/dist/antd.less"
```
* 引入使用
举例如下：
```tsx
import { useState } from 'react'
import {Button} from 'antd';
import {FastBackwardOutlined} from "@ant-design/icons";

function App() {
    const [count, setCount] = useState(0);

  return (
    <div className="App">
        顶级组件
        <Button type="primary">Primary Button</Button>
        <FastBackwardOutlined style={{fontSize:"40px",color:"#08c"}}></FastBackwardOutlined>
    </div>
  )
}

export default App
```
# 配置Antd Design样式自动按需引入
> PS:当前为antd v5，v5不需要配置
* antd的4.x以上版本已经支持组件按需引入，我们只需要解决样式上的自动按需引入即可
* 安装插件vite-plugin-style-import
```shell
npm install vite-plugin-style-import@1.4.1 -D
```
在vite.config.ts中进行配置：
```ts
import styleImport,{AntdResolve} from "vite-plugin-style-import";
export default definedConfig({
    plugins:[
        react(),
        styleImport({
            resolves:[
                AntdResolve()
            ]
        })
    ]
})
```
再去除App.tsx中import "antd/dist/antd.css";
启动项目，发现报错，缺少less
```shell
npm i less@2.7.1 -D
```
# 路由
## 路由第一种方式(旧项目，非React18版本)
### 旧项目——路由基本配置
> 首先旧项目很可能不是react18的写法，所以需要熟悉之前的组件路由的写法

1. 【准备界面】首先src下创建views文件夹，views文件夹下创建Home.tsx和About.tsx。大致代码如下：
```tsx
const Home=()=>{
    return (
        <div className="Home">
            <p>这是Home组件</p>
        </div>
    )
}
export default Home;

```
2. 【配置对应关系】 /src下新建routes文件夹=> 再进去新建index.tsx
```tsx
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

```
3. 占位符使用
```tsx
import { useState } from 'react'
import {Button} from 'antd';
import {FastBackwardOutlined} from "@ant-design/icons";
import {Outlet} from "react-router-dom";
function App() {
    const [count, setCount] = useState(0);

  return (
      <div className="App">
          <p>这是App组件</p>
          {/* 占位符组件——类似于窗口，用来展示组件的，像vue中的router-view */}
          <Outlet></Outlet>
      </div>
  )
}

export default App

```
4. 引入使用
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
// 引入reset-css
import "reset-css";
// 其它UI框架

// 全局引入UI
import "@/assets/styles/global.scss";

// import App from './App.tsx';
import Router from '@/routes';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>,
)

```
### 旧项目——实现路由跳转
* 在src/App.tsx中，使用<Link />组件进行跳转
```tsx
import {Outlet, Link} from "react-router-dom";
function App() {
  return (
      <div className="App">
          <Link to="/home">Home</Link>|
          <Link to="/about">About</Link>
          {/* 占位符组件——类似于窗口，用来展示组件的，像vue中的router-view */}
          <Outlet></Outlet>
      </div>
  )
}

export default App
```
### 旧项目——路由重定向
* 在routes=>index.tsx中，使用<Navigate />组件进行重定向
```tsx
import App from '@/App';
import Home from '@/views/Home';
import About from '@/views/About';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
//两种路由模式的组件：BrowserRouters(History模式） HashRouter(Hash模式）

// const baseRoute = ()=>{
// return (
// )}
// 以上写法可以简写为
const baseRoute = ()=>(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="/" element={<Navigate to="/home" />}></Route>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/about" element={<About/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
)
export default baseRoute;
```
## 路由第二种方式(React18版本)
### React18:路由表写法
1. 首先创建路由表routes=>index.tsx
```tsx
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

```
2. 全局引入main.tsx
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
// 引入reset-css
import "reset-css";
// 其它UI框架

// 全局引入UI
import "@/assets/styles/global.scss";
// 路由表写法
import App from './App.tsx';
//引入history模式路由!
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
)

```
3. App.tsx 中引入使用
* 主要为`useRoutes`方式引入使用
* `Link`进行跳转
```tsx
import {useState} from 'react'
import {Button} from 'antd';
import {FastBackwardOutlined} from "@ant-design/icons";
//使用useRoutes方式引入路由表
import {useRoutes, Link} from "react-router-dom";
import routes from './routes';

function App() {
    //引入路由表
    const outlet = useRoutes(routes);
    return (
        <div className="App">
            <Link to="/home">Home</Link>|
            <Link to="/about">About</Link>
            {/*路由表形式使用*/}
            {outlet}
        </div>
    )
}

export default App

```
### React18:路由懒加载
* `lazy`
* `React.Suspense: <React.Suspense fallback={<div>Loading</div>}><About/> </ React.Suspense>`
```tsx
// 路由懒加载
import React, {lazy} from "react";
import {Navigate} from "react-router-dom";
// 引入使用lazy 实现路由懒加载
const Home = lazy(() => import('@/views/Home'));
const About = lazy(() => import('@/views/About'));
// 懒加载的模式的组件的写法，外面需要添加一层Loading的提示组件

// 路由表写法
const routes = [
    {
        path: "/",
        element: <Navigate to="/home"/>
    },
    {
        path: "/home",
        element:
            <React.Suspense fallback={<div>Loading...</div>}>
                <Home/>
            </React.Suspense>
    },
    {
        path: "/about",
        element:
            <React.Suspense fallback={<div>Loading...</div>}>
                <About/>
            </React.Suspense>
    }
]
export default routes

```
### React18:抽取Loading组件函数
* 解决上述Lazy路由懒加载代码重复问题
```tsx
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

```
# 首页布局的解决方案（含侧边栏）
> (antd侧边栏组件)[https://ant-design.antgroup.com/components/layout-cn]
1. 删除之前的App.tsx中的`<Link/>`
```tsx
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

```
2. 直接在Home.tsx中复制antd中的侧边栏内容
```tsx
import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const Home: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        Bill is a cat.
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Home;
```
> 关于侧边栏右上logo样式，v5版本的代码没提供样式，logo样式直接`右键检查`将样式复制下来，定义在全局样式global.scss中，如下：

```scss

//首页logo
.demo-logo-vertical {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, .2);
  border-radius: 6px;
}
```
# 页面右侧结构样式的调整
* 认识antd layout组件具体标签含义，根据UI调整
* 右边部分v4版本利用`className = 'site-layout-background'`实现内容调整,v5版本不生效，自行利用了flex，这里举例我实现的v5版本
* 实现——**面包屑位置调整** 、**右侧内容撑满调整**
```tsx
import React, {useState} from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';

const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>),
    getItem('User', 'sub1', <UserOutlined/>, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined/>),
];

const Home: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <Layout style={{minHeight: '100vh'}}>
            {/*左侧侧边栏*/}
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
            {/*右边内容*/}
            <Layout>
                {/*右边头部*/}
                <Header style={{padding: 0, background: colorBgContainer}}>
                    {/*调整面包屑位置到Header*/}
                    <Breadcrumb style={{lineHeight: '64px', paddingLeft: "16px"}}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                {/*右边内容——白色盒子*/}
                <Content style={{
                    margin: '16px 16px 0',
                    flex: 1,
                    height: '100%',
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}>
                    {/*窗口部分*/}

                </Content>
                {/*右边底部*/}
                <Footer style={{padding: 0, textAlign: 'center', height: "48px", lineHeight: '48px'}}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Home;
```
# 点击跳转——点击侧边栏获取到路径，跳转以及嵌套路由
1. 首先绑定菜单获取到侧边栏的path, key=>绑定的path。利用`useNavagate(path)`进行跳转
```tsx
import {useNavigate} from "react-router-dom";   
const navigate = useNavigate();
// 选中菜单
const setMenu = (e) => {
    console.log('选中路径--');
    console.log(e);
    // 点击跳转到相应的菜单,利用一个hook useNavigate
    navigate(e.key);
}

   <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}
         onSelect={(value) => setMenu(value)}/>
```
2. 配置路由表，引入子组件`children`属性。如 routes=>index.tsx:
```tsx
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

```
3. 路由占位。Home=》index.tsx中配置
```tsx
import {Outlet, useNavigate} from "react-router-dom";

{/*右边内容——白色盒子*/}
<Content style={{
    margin: '16px 16px 0',
    flex: 1,
    height: '100%',
    padding: 24,
    minHeight: 360,
    background: colorBgContainer,
    borderRadius: borderRadiusLG,
}}>
    {/*窗口部分*/}
    <Outlet></Outlet>
</Content>
```
# 菜单栏
* [具体查看官网文档](https://ant-design.antgroup.com/components/menu-cn#menu-demo-sider-current)
## 展开以及回收事件的讲解
* Menu项 `onOpenChange` 事件

## 设置只有一个展开项







