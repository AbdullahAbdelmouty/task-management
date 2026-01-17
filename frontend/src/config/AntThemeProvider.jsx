import { ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";

const AntThemeProvider = ({ theme, children }) => {
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
                    colorBgBlur: theme.colors.background,
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
                        itemMarginBlock: "16px",
                        groupTitleColor: theme.colors.primaryBtnText,
                        groupTitleFontSize: "9px",
                        subMenuItemBg: theme.colors.primary,
                        subMenuItemSelectedColor: theme.colors.primaryBtnText,
                        subMenuItemSelectedBg: theme.colors.secondary,
                    },
                    Card: {
                        borderRadius: "12px",
                        boxShadow: theme.effects.shadow,
                        headerBg: "#fff",
                    },
                    Modal: {
                        contentBg: theme.colors.entireBg,
                        headerBg: theme.colors.primary,
                        headerColor: theme.colors.primaryBtnText,
                        footerBg: theme.colors.background,
                        titleColor: theme.colors.primaryBtnText,
                        titleFontSize: "14px",
                        titleLineHeight: "14px",
                        colorIcon: theme.colors.primaryBtnText,
                        colorIconHover: theme.colors.primaryBtnText,
                    },
                    Form: {
                        labelFontSize: "12px",
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