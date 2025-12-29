import { Dot } from '@components/admin/Dot.js';
import React from 'react';
export function Status({ status }) {
    return /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("div", null, status === 0 && /*#__PURE__*/ React.createElement(Dot, {
        variant: "default",
        size: "1rem"
    }), status === 1 && /*#__PURE__*/ React.createElement(Dot, {
        variant: "success",
        size: "1rem"
    })));
}
