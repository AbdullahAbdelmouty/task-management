import React from 'react';
import { Flex, Layout, Typography, Switch, Button } from 'antd';
import { MoonStars, SignOutIcon, SunDim } from '@phosphor-icons/react';
import { useTheme as useStyledTheme } from 'styled-components';
import type { AppTheme } from '../../types/theme.types';
import { useTheme as useThemeContext } from '../../Contexts/ThemeContext';
import useAuth from '../../Hooks/useAuth';

const { Header, Content } = Layout;
const { Title } = Typography;

const AppLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const theme = useStyledTheme() as AppTheme;
    const { mode, toggleTheme } = useThemeContext();
    const { logout } = useAuth();

    const isDark = mode === 'dark';

    return (
        <Layout
            style={{
                minHeight: '100vh',
                background: theme.colors.background,
            }}
        >
            <Header
                style={{
                    height: 64,
                    paddingInline: 24,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: theme.colors.primary,
                }}
            >
                <Title
                    level={3}
                    style={{
                        margin: 0,
                        color: theme.colors.primaryBtnText,
                    }}
                >
                    Task Management App
                </Title>

                <Flex align="center" gap={12}>
                    <Switch
                        checked={isDark}
                        onChange={toggleTheme}
                        checkedChildren={<SunDim size={16} style={{
                            marginTop: 3
                        }} />}
                        unCheckedChildren={<MoonStars size={16} style={{
                            marginTop: 3
                        }} />}
                    />

                    <Button
                        type="text"
                        icon={<SignOutIcon size={22} />}
                        style={{
                            color: theme.colors.primaryBtnText,
                        }}
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </Flex>
            </Header>

            <Content
                style={{
                    padding: 24,
                    background: theme.colors.background,
                    color: theme.colors.primaryText,
                }}
            >
                {children}
            </Content>
        </Layout>
    );
};

export default AppLayout;
