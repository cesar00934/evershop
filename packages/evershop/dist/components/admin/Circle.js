import React from 'react';
import './Circle.scss';
export function Circle({ variant = 'default' }) {
    const circleVariant = [
        'default',
        'success',
        'info',
        'attention',
        'critical',
        'warning',
        'new'
    ].includes(variant) ? `${variant}` : 'default';
    return /*#__PURE__*/ React.createElement("span", {
        className: `${circleVariant} circle`
    }, /*#__PURE__*/ React.createElement("span", {
        className: "self-center"
    }, /*#__PURE__*/ React.createElement("span", null)));
}
