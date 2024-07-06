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
