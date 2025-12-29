import React from 'react';
export function SubTotal({ count, total }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "summary-row"
    }, /*#__PURE__*/ React.createElement("span", null, "Subtotal"), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", null, count, " items"), /*#__PURE__*/ React.createElement("div", null, total)));
}
