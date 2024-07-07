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
import {Outlet, useNavigate} from "react-router-dom";
// 引入路由表
import routes from "@/routes";

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
    getItem('Option 1', '/page1', <PieChartOutlined/>),
    getItem('Option 2', '/page2', <DesktopOutlined/>),
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
    const navigate = useNavigate();
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    // 选中菜单
    const setMenu = (e) => {
        console.log('选中路径--');
        console.log(e);
        // 点击跳转到相应的菜单,利用一个hook useNavigate
        navigate(e.key);
    }

    // 展开回收事件
    const handleOpenChange = (keys:string[])=>{
        console.log(keys);
        console.log(keys);
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            {/*左侧侧边栏*/}
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" defaultSelectedKeys={['/page1']} mode="inline" items={items}
                      onSelect={(value) => setMenu(value)} onOpenChange={handleOpenChange} />
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
                   <Outlet></Outlet>
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
