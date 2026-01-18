import { ColorPicker, ConfigProvider } from 'antd';
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

                    Card: {
                        borderRadius: 12,
                        boxShadow: theme.effects.shadow,
                        colorText: theme.colors.text,
                        colorBgContainer: theme.colors.card,

                    },
                    Modal: {
                        contentBg: theme.colors.entireBg,
                        footerBg: theme.colors.entireBg,
                        titleColor: theme.colors.text,
                        titleFontSize: 14,
                        titleLineHeight: '14px',

                    },
                    Button: {
                        colorText: theme.colors.text,
                        boxShadow: theme.effects.shadow,
                        colorSuccessHover: theme.colors.text,
                        colorBorderSecondary: theme.colors.border,

                    },
                    Typography: {
                        colorText: theme.colors.text,
                        colorTextSecondary: theme.colors.secondaryText,
                    },
                    Form: {
                        labelFontSize: 12,
                        labelColor: theme.colors.primaryText,
                    },
                    Input: {
                        controlHeight: 32,
                        colorText: theme.colors.primaryText,
                        colorTextPlaceholder: theme.colors.placeHolder,
                    },
                    Select: {
                        controlHeight: 32,
                        colorText: theme.colors.placeHolder,
                    },
                    DatePicker: {
                        colorTextPlaceholder: theme.colors.placeHolder,

                    },
                    Switch: {
                        colorPrimary: theme.colors.taskCardBg,
                    },

                },
            }}
        >
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ConfigProvider>
    );
};

export default AntThemeProvider;
