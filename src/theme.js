import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
// import orange from '@material-ui/core/colors/orange';

const primaryColor = blue[700];
// const secondaryColor = orange[300];

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
        // body2: {
        // color: window.theme.palette.getContrastText(primaryColor),
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
