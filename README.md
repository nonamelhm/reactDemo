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
```index.tsx

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











