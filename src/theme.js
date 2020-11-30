import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
// import orange from '@material-ui/core/colors/orange';

const primaryColor = blue[700];
// const secondaryColor = orange[300];

// function lightOrDark(color) {
//     // Variables for red, green, blue values
//     let r, g, b, hsp;

//     // Check the format of the color, HEX or RGB?
//     if (color.match(/^rgb/)) {
//         // If RGB --> store the red, green, blue values in separate variables
//         color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

//         r = color[1];
//         g = color[2];
//         b = color[3];
//     } else {
//         // If hex --> Convert it to RGB: http://gist.github.com/983661
//         color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

//         r = color >> 16;
//         g = (color >> 8) & 255;
//         b = color & 255;
//     }

//     // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
//     hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

//     // Using the HSP value, determine whether the color is light or dark
//     if (hsp > 127.5) {
//         return "light";
//     } else {
//         return "dark";
//     }
//}

// console.log(
//     window.getComputedStyle(document.body, null).getPropertyValue("background-color")
// );
// window.getComputedStyle( document.body ,null).getPropertyValue('width');
// ~ document.body.clientWidth

const theme = createMuiTheme({
    palette: {
        background: {
            default: "#fff",
        },
        primary: {
            main: primaryColor,
        },
        // secondary: {
        //     main: secondaryColor,
        // },
    },
    typography: {
        // tab: {
        //     textTransform: 'none',
        //     fontWeight: 700,
        //     color: 'white',
        //     fontSize: '1rem',
        // },
    },
    // overrides: {
    //     MuiInputLabel: {
    //         root: {
    //             color: primaryColor,
    //             fontSize: '1rem',
    //         },
    //     },
    //     MuiInput: {
    //         underline: {
    //             '&:before': {
    //                 borderBottom: `2px solid ${primaryColor}`,
    //             },
    //             '&:hover:not($disabled):not($focused):not($error):before': {
    //                 borderBottom: `2px solid ${primaryColor}`,
    //             },
    //         },
    //     },
    // },
});

export default theme;
