import { Image } from '@components/common/Image.js';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
const CartSummarySkeleton = ({ rows = 2 })=>{
    return /*#__PURE__*/ React.createElement("ul", {
        className: "divide-y divide-gray-200"
    }, Array.from({
        length: rows
    }).map((_, i)=>/*#__PURE__*/ React.createElement("li", {
            key: i,
            className: "flex items-center py-6 animate-pulse"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "relative mr-4"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "w-16 h-16 bg-gray-200 rounded border p-2 box-border"
        }), /*#__PURE__*/ React.createElement("span", {
            className: "absolute -top-2 -right-2 bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center text-gray-400 text-sm"
        }, i + 1)), /*#__PURE__*/ React.createElement("div", {
            className: "flex-1 min-w-0 items-start align-top"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "h-4 bg-gray-200 rounded w-3/5 mb-2"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "h-3 bg-gray-100 rounded w-2/5 mb-1"
        })), /*#__PURE__*/ React.createElement("div", {
            className: "ml-auto text-right"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "h-4 bg-gray-200 rounded w-16"
        })))));
};
const CartSummaryItemsList = ({ items, loading, showPriceIncludingTax })=>{
    if (loading) {
        return /*#__PURE__*/ React.createElement(CartSummarySkeleton, {
            rows: items.length
        });
    }
    if (items.length === 0) {
        return /*#__PURE__*/ React.createElement("div", {
            className: "text-center py-8 text-gray-500"
        }, /*#__PURE__*/ React.createElement("p", {
            className: "text-base"
        }, _('Your cart is empty')), /*#__PURE__*/ React.createElement("p", {
            className: "text-sm mt-2"
        }, _('Add some items to get started')));
    }
    return /*#__PURE__*/ React.createElement("ul", {
        className: "item__summary__list divide-y divide-gray-200 border-b mb-3"
    }, items.map((item)=>/*#__PURE__*/ React.createElement("li", {
            key: item.uuid,
            className: "flex items-start py-3"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "relative mr-4 self-center"
        }, item.thumbnail && /*#__PURE__*/ React.createElement(Image, {
            width: 100,
            height: 100,
            src: item.thumbnail,
            alt: item.productName,
            className: "w-16 h-16 object-cover rounded border p-2 box-border"
        }), !item.thumbnail && /*#__PURE__*/ React.createElement(ProductNoThumbnail, {
            className: "w-16 h-16 rounded border p-2 box-border"
        }), /*#__PURE__*/ React.createElement("span", {
            className: "absolute -top-2 -right-2 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-gray-700 text-sm"
        }, item.qty)), /*#__PURE__*/ React.createElement("div", {
            className: "flex-1 min-w-0 items-start align-top"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "font-semibold text-sm mb-1"
        }, item.productName), item.variantOptions && item.variantOptions.length > 0 && /*#__PURE__*/ React.createElement("div", {
            className: "space-y-1"
        }, item.variantOptions.map((option)=>/*#__PURE__*/ React.createElement("div", {
                key: option.attributeCode,
                className: "text-xs text-gray-700"
            }, option.attributeName, ": ", option.optionText)))), /*#__PURE__*/ React.createElement("div", {
            className: "ml-auto text-right self-center"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "font-semibold"
        }, showPriceIncludingTax ? item.lineTotalInclTax.text : item.lineTotal.text)))));
};
export { CartSummaryItemsList };
