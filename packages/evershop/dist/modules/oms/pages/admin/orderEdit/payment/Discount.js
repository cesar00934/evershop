import React from 'react';
export function Discount({ discount, code }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "summary-row"
    }, /*#__PURE__*/ React.createElement("span", null, "Discount"), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", null, code), /*#__PURE__*/ React.createElement("div", null, discount)));
}
Discount.defaultProps = {
    code: undefined,
    discount: 0
};
