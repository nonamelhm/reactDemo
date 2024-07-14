import React, {useState} from 'react';
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined,} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {Outlet, useNavigate} from "react-router-dom";
import MainMenu from "@/components/MainMenu";

const {Header, Content, Footer, Sider} = Layout;

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
               <MainMenu></MainMenu>
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
