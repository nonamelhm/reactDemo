import {Menu} from "antd";
import React, {ReactNode, useState} from "react";
import {DesktopOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";


interface MenuItem {
    label: string,
    key: string,
    icon?: ReactNode,
    children?: MenuItem[]
}

const items: MenuItem[] = [
    {
        label: '栏目 1',
        key: '/page1',
        icon: <PieChartOutlined/>
    },
    {
        label: '栏目 2',
        key: '/page2',
        icon: <DesktopOutlined/>
    },
    {
        label: '栏目 3',
        key: '/page3',
        icon: <UserOutlined/>,
        children: [
            {
                label: 'Tom',
                key: '/page3/page301',
            },
            {
                label: 'Bill',
                key: '/page3/page302',
            },
            {
                label: 'Alex',
                key: '/page3/page303',
            }
        ]
    },
    {
        label: '栏目 4',
        key: '/page4',
        icon: <TeamOutlined/>,
        children: [
            {
                label: 'Tom',
                key: '/page41',
            },
            {
                label: 'Bill',
                key: '/page42',
            },
            {
                label: 'Alex',
                key: '/page43',
            }
        ]
    },
]


const MainMenu: React.FC = () => {
    const navigate = useNavigate();
    // 得到当前路径
    const currentRoute = useLocation();
    const findMenuItem = (items: MenuItem[], key: string) => {
        for (const item of items) {
            if (item.key === key) {
                return item;
            }
            if (item.children && item.children.length > 0) {
                const foundItem = findMenuItem(item.children, key);
                if (foundItem) {
                    // 依旧是返回父级
                    return item;
                }
            }
        }
        return null;
    };
    const firstExpandItem = findMenuItem(items, currentRoute.pathname);

    // 选中菜单
    const setMenu = (e: any) => {
        // 点击跳转到相应的菜单,利用一个hook useNavigate
        navigate(e.key);
    }
    // 菜单展开的项
    const [openKeys, setOpenKeys] = useState<string[]>([firstExpandItem.key]);

    // 展开回收事件
    const handleOpenChange = (keys: string[]) => {
        // 最后一项为当前点击的展开key
        setOpenKeys([keys[keys.length - 1]]);
    }

    return (
        <Menu theme="dark" defaultSelectedKeys={[currentRoute.pathname]} mode="inline" items={items}
              onSelect={(value) => setMenu(value)} onOpenChange={handleOpenChange} openKeys={openKeys}/>
    )
}
export default MainMenu;

