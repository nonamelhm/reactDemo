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
