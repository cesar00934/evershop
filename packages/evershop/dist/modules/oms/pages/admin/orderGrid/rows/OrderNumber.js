import React from 'react';
export function OrderNumber({ editUrl, number }) {
    return /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
        className: "hover:underline font-semibold",
        href: editUrl
    }, "#", number)));
}
