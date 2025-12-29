import React from 'react';
function Breadcrumb({ pageInfo: { breadcrumbs } }) {
    return breadcrumbs.length ? /*#__PURE__*/ React.createElement("div", {
        className: "page-width"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "breadcrumb py-5"
    }, breadcrumbs.map((breadcrumb, index)=>index === breadcrumbs.length - 1 ? /*#__PURE__*/ React.createElement("span", {
            key: index
        }, breadcrumb.title) : /*#__PURE__*/ React.createElement("span", {
            key: index
        }, /*#__PURE__*/ React.createElement("a", {
            href: breadcrumb.url,
            className: "text-interactive"
        }, breadcrumb.title), /*#__PURE__*/ React.createElement("span", null, ' / '))))) : null;
}
export const query = `
  query query {
    pageInfo {
      breadcrumbs {
        title
        url
      }
    }
  }
`;
export const layout = {
    areaId: 'content',
    sortOrder: 0
};
export default Breadcrumb;
