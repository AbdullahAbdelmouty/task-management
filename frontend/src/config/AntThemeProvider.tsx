import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'styled-components';
import type { ReactNode } from 'react';
import type { AppTheme } from '../types/theme.types';

interface AntThemeProviderProps {
    theme: AppTheme;
    children: ReactNode;
}

const AntThemeProvider = ({
    theme,
    children,
}: AntThemeProviderProps) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: theme.fonts.primary,
                    colorPrimary: theme.colors.primary,
                    colorBgContainer: theme.colors.background,
                    colorBorder: theme.colors.border,
                    colorLink: theme.colors.link,
                    boxShadow: theme.effects.shadow,
                },
                components: {
                    Menu: {
                        itemColor: theme.colors.primaryBtnText,
                        itemActiveBg: theme.colors.secondary,
                        itemBg: theme.colors.primary,
                        itemSelectedColor: theme.colors.primaryBtnText,
                        itemSelectedBg: theme.colors.secondary,
                        itemHoverColor: theme.colors.primaryBtnText,
                        itemHoverBg: theme.colors.secondary,
                        itemMarginBlock: 16,
                        groupTitleColor: theme.colors.primaryBtnText,
                        groupTitleFontSize: 9,
                        subMenuItemBg: theme.colors.primary,
                        subMenuItemSelectedColor: theme.colors.primaryBtnText,
                    },
                    Card: {
                        borderRadius: 12,
                        boxShadow: theme.effects.shadow,
                        headerBg: '#fff',
                    },
                    Modal: {
                        contentBg: theme.colors.entireBg,
                        headerBg: theme.colors.primary,
                        footerBg: theme.colors.background,
                        titleColor: theme.colors.primaryBtnText,
                        titleFontSize: 14,
                        titleLineHeight: '14px',
                        colorIcon: theme.colors.primaryBtnText,
                        colorIconHover: theme.colors.primaryBtnText,
                    },
                    Form: {
                        labelFontSize: 12,
                        labelColor: theme.colors.primarytext,
                    },
                    Input: {
                        controlHeight: 32,
                    },
                    Switch: {
                        colorPrimary: theme.colors.primary,
                    },
                    Typography: {
                        colorText: theme.colors.primarytext,
                    },
                },
            }}
        >
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ConfigProvider>
    );
};

export default AntThemeProvider;
