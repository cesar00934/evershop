import React from 'react';
import './Dot.scss';
export function Dot({ size = '1rem', variant = 'primary' }) {
    const dotVariant = [
        'default',
        'success',
        'info',
        'attention',
        'critical',
        'warning',
        'new'
    ].includes(variant) ? `${variant}` : 'default';
    return /*#__PURE__*/ React.createElement("span", {
        className: `${dotVariant} dot`,
        style: {
            width: size,
            height: size
        }
    });
}
