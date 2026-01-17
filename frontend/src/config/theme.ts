import { Divider, Typography } from "antd";

export const lightTheme = {
    name: "light",
    fonts: {
        primary: "Cairo, sans-serif",
    },
    colors: {
        primary: "#3D2386",
        secondary: "#E4522B",
        info: "#98A2B3",
        disabled: "#98A2B3",
        colorPrimaryText: "#ffff",
        secondaryText: "#98A2B3",
        thirdyColor: "#290E73",
        background: "#ffff",
        entireBg: "#F8F8F4",
        loginBg: "#fff",
        primarytext: "#454C43",
        secondarytext: "#9A9E99",
        primaryBtnText: "#ffff",
        primaryBtnBg: "#3D2386",
        secondaryBtnBg: "#F1EFF3",
        actionBtnBg: "#ffff",
        actionBtnColor: "",
        card: "#ffff",
        border: "#E3E8EF",
        link: "#3D2386",
        stroke: "#E3E0D7",
        success: "#12B669",
    },
    effects: {
        shadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease-in-out",
    },
};

export const darkTheme = {
    name: "dark",
    colors: {
        primary: "#177ddc",
        secondary: "#3b5998",
        background: "#1f1f1f",
        text: "#ddd",
        card: "#141414",
        border: "#303030",
        link: "#4c9aff",
    },
    effects: {
        shadow: "0px 4px 12px rgba(255, 255, 255, 0.1)",
        transition: "all 0.3s ease-in-out",
    },
};