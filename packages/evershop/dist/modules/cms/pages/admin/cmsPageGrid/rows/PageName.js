import React from 'react';
export function PageName({ url, name }) {
    return /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
        className: "hover:underline font-semibold",
        href: url
    }, name)));
}
