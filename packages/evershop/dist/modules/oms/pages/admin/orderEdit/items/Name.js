import React from 'react';
import { ItemVariantOptions } from './ItemVariantOptions.js';
export function Name({ name, productSku, productUrl, variantOptions = [] }) {
    return /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("div", {
        className: "product-column"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("span", {
        className: "font-semibold"
    }, /*#__PURE__*/ React.createElement("a", {
        href: productUrl
    }, name))), /*#__PURE__*/ React.createElement("div", {
        className: "text-gray-500"
    }, /*#__PURE__*/ React.createElement("span", {
        className: "font-semibold"
    }, "SKU: "), /*#__PURE__*/ React.createElement("span", null, productSku)), /*#__PURE__*/ React.createElement(ItemVariantOptions, {
        options: variantOptions
    })));
}
