import React from 'react';
export function Shipping({ method, cost }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "summary-row"
    }, /*#__PURE__*/ React.createElement("span", null, "Shipping"), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", null, method), /*#__PURE__*/ React.createElement("div", null, cost)));
}
