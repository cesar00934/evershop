import React from 'react';
export function Price({ price, qty }) {
    return /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("div", {
        className: "product-price"
    }, /*#__PURE__*/ React.createElement("span", null, price, " x ", qty)));
}
