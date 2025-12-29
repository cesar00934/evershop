import React from 'react';
import './Badge.scss';
export function Badge({ title, variant = 'default', progress = 'default' }) {
    const badgeVariant = [
        'default',
        'success',
        'info',
        'attention',
        'critical',
        'warning',
        'new'
    ].includes(variant) ? `${variant}` : 'default';
    const badgeProgress = [
        'incomplete',
        'complete',
        'partiallycomplete',
        'default'
    ].includes(progress) ? `${progress}` : 'default';
    return /*#__PURE__*/ React.createElement("span", {
        className: `${badgeVariant} badge`
    }, /*#__PURE__*/ React.createElement("span", {
        className: `${badgeProgress} progress rounded-full`
    }, progress === 'partiallycomplete' && /*#__PURE__*/ React.createElement("span", null)), /*#__PURE__*/ React.createElement("span", {
        className: "self-center title"
    }, title));
}
