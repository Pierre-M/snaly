"use strict";

module.exports = {
    theme: {
        fontFamily: {
            body: ["Roboto", "sans-serif"]
        },
        fontWeight: {
            light: 300,
            normal: 400,
            semibold: 500
        },
        opacity: {
            "0": "0",
            "10": ".1",
            "20": ".2",
            "30": ".3",
            "40": ".4",
            "50": ".5",
            "60": ".6",
            "70": ".7",
            "80": ".8",
            "90": ".9",
            "100": "1"
        },
        screens: {
            xxs: "360px",
            xs: "768px",
            sm: "1024px",
            md: "1280px",
            lg: "1600px"
        },
        extend: {
            width: {
                "1/8": "12.5%"
            },
            colors: {
                "white-20": "rgba(255, 255, 255, .5)",
                backdrop: "rgba(0, 0, 0, .8)"
            }
        }
    },
    variants: {
        scale: ["active"]
    },
    plugins: []
};
