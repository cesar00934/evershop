import React from 'react';
export function Thumbnail({ imageUrl, qty }) {
    return /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("div", {
        className: "product-thumbnail"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "thumbnail"
    }, imageUrl && /*#__PURE__*/ React.createElement("img", {
        src: imageUrl,
        alt: ""
    }), !imageUrl && /*#__PURE__*/ React.createElement("svg", {
        style: {
            width: '2rem'
        },
        fill: "currentcolor",
        viewBox: "0 0 20 20",
        focusable: "false",
        "aria-hidden": "true"
    }, /*#__PURE__*/ React.createElement("path", {
        fillRule: "evenodd",
        d: "M6 11h8V9H6v2zm0 4h8v-2H6v2zm0-8h4V5H6v2zm6-5H5.5A1.5 1.5 0 0 0 4 3.5v13A1.5 1.5 0 0 0 5.5 18h9a1.5 1.5 0 0 0 1.5-1.5V6l-4-4z"
    }))), /*#__PURE__*/ React.createElement("span", {
        className: "qty"
    }, qty)));
}
