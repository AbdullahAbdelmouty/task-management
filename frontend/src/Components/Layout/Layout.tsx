import React from 'react';
import { Flex, Layout, Typography } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#6358DC',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center"
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#E5E5E5',
};


const AppLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <Layout style={{
        minHeight: "100vh"
    }}>
        <Header style={headerStyle}>
            <Title level={3} style={{
                margin: 0,
                color: "white"
            }}>
                Task Management App
            </Title>
        </Header>
        <Content style={contentStyle}>{children}</Content>
    </Layout>
);

export default AppLayout;