import { Divider, Typography } from "antd";
import type { AppTheme } from "../types/theme.types";

export const lightTheme: AppTheme = {
    name: 'light',

    fonts: {
        primary: `'Inter', sans-serif`,
    },

    colors: {
        primary: '#1677ff',

        background: '#ffffff',
        entireBg: '#ffffff',
        card: '#fafafa',
        taskCardBg: '#ffffff',
        modalBg: '#ffffff',

        text: '#000000',
        primaryText: '#000000',
        secondaryText: '#595959',
        primaryBtnText: '#ffffff',
        placeHolder: "#d5d5d5",

        border: '#e5e7eb',
        link: '#1677ff',
        disabled: '#bfbfbf',

        success: '#52c41a',
        info: '#1677ff',
        warning: '#faad14',
        error: '#ff4d4f',
    },

    effects: {
        shadow: '0 4px 12px rgba(146, 146, 146, 0.08)',
        transition: 'all 0.2s ease',
    },
};



export const darkTheme: AppTheme = {
    name: 'dark',

    fonts: {
        primary: `'Inter', sans-serif`,
    },

    colors: {
        primary: '#000000',

        background: '#141414',
        entireBg: '#0f0f0f',
        card: '#1f1f1f',
        taskCardBg: '#1f1f1f',
        modalBg: '#1f1f1f',

        text: '#ffffff',
        primaryText: '#ffffff',
        secondaryText: '#f5efef',
        primaryBtnText: '#ffffff',
        placeHolder: "#ffff",


        border: '#303030',
        link: '#1677ff',
        disabled: '#595959',

        success: '#52c41a',
        info: '#1677ff',
        warning: '#faad14',
        error: '#ff4d4f',
    },

    effects: {
        shadow: '0 6px 16px rgba(0, 0, 0, 0.45)',
        transition: 'all 0.2s ease',
    },
};
