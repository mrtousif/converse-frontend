import * as zoid from "zoid/dist/zoid.frameworks";

const zoidComponent = zoid.create({
    tag: "converse-presentation",
    url: "http://localhost:1234",
    autoResize: {
        width: false,
        height: true,
    },
});

const title = document.querySelector("#title");
const hostData = {};

if (window.xprops) {
    hostData.website = window.xprops.website;
    // title.textContent = websiteId;
    hostData.pageUrl = window.xprops.pageUrl;
    hostData.postId = window.xprops.postId;
    hostData.backgroundColor = window.xprops.backgroundColor;
    hostData.darkOrLight = lightOrDark(window.xprops.backgroundColor);

    document.addEventListener(
        "click",
        () => {
            window.xprops.updateBackgroundColor("target", "beige");
        },
        false
    );
}

function lightOrDark(color) {
    // console.log(color);
    // Variables for red, green, blue values
    let r = 0,
        g = 0,
        b = 0,
        a = 0;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1] * 1;
        g = color[2] * 1;
        b = color[3] * 1;
        a = color[4] * 1;
    } else {
        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

        r = color >> 16;
        g = (color >> 8) & 255;
        b = color & 255;
    }
    // console.log(color);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    // console.log(luminance);
    // console.log( a);
    if (luminance > 0.5 || a < 0.25) {
        return "light";
    } else {
        return "dark";
    }
}

// console.log(
//     window.getComputedStyle(document.body, null).getPropertyValue("background-color")
// );
// window.getComputedStyle(document.body, null).getPropertyValue("width");
// ~document.body.clientWidth;

export default hostData;
