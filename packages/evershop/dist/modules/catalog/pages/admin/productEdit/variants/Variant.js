import React from 'react';
import { EditVariant } from './EditVariant.js';
export const Variant = ({ variant, refresh, variantGroup })=>{
    return /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("img", {
        style: {
            maxWidth: '50px',
            height: 'auto'
        },
        src: variant?.product?.image?.url,
        alt: ""
    })), variantGroup.attributes.map((a)=>{
        const option = variant.attributes.find((attr)=>attr.attributeCode === a.attributeCode);
        return /*#__PURE__*/ React.createElement("td", {
            key: a.attributeId
        }, /*#__PURE__*/ React.createElement("label", null, option?.optionText || '--'));
    }), /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("a", {
        href: variant.product.editUrl,
        className: "hover:text-interactive"
    }, variant.product?.sku)), /*#__PURE__*/ React.createElement("td", null, variant.product?.price?.regular?.text), /*#__PURE__*/ React.createElement("td", null, variant.product?.inventory?.qty), /*#__PURE__*/ React.createElement("td", null, variant.product?.status === 1 ? /*#__PURE__*/ React.createElement("span", {
        className: "text-success"
    }, "Enabled") : /*#__PURE__*/ React.createElement("span", {
        className: "text-critical"
    }, "Disabled")), /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement(EditVariant, {
        variant: variant,
        refresh: refresh,
        variantGroup: variantGroup
    })));
};
