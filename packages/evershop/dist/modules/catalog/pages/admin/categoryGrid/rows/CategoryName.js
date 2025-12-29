import React from 'react';
export function CategoryNameRow({ category }) {
    return /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
        className: "hover:underline font-semibold",
        href: category.editUrl
    }, category.path.map((p)=>p.name).join(' / '))));
}
