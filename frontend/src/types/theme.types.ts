export interface AppTheme {
    name: 'light' | 'dark';

    fonts: {
        primary: string;
    };

    colors: {
        primary: string;

        background: string;
        entireBg: string;
        card: string;
        taskCardBg: string;
        modalBg: string;
        text: string;
        primaryText: string;
        secondaryText: string;
        primaryBtnText: string;
        placeHolder: string;

        border: string;
        link: string;
        disabled: string;

        success: string;
        info: string;
        warning: string;
        error: string;

    };

    effects: {
        shadow: string;
        transition: string;
    };
}
