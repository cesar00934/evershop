import { Dot } from '@components/admin/Dot.js';
import React from 'react';
export function NoResult({ keyword = '', resourseLinks = [] }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "no-result items-center text-center"
    }, /*#__PURE__*/ React.createElement("h3", null, 'No results for "', keyword, '"'), /*#__PURE__*/ React.createElement("div", null, "TRY OTHER RESOURCES"), /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 mt-2"
    }, resourseLinks.map((link, index)=>/*#__PURE__*/ React.createElement("div", {
            key: index,
            className: "flex space-x-2 justify-center items-center"
        }, /*#__PURE__*/ React.createElement(Dot, {
            variant: "info"
        }), /*#__PURE__*/ React.createElement("a", {
            href: link.url,
            className: "text-divider hover:underline"
        }, link.name)))));
}
