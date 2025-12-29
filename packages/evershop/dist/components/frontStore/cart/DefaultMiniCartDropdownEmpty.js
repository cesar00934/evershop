import { Area } from '@components/common/Area.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import React from 'react';
export const DefaultMiniCartDropdownEmpty = ({ setIsDropdownOpen })=>/*#__PURE__*/ React.createElement("div", {
        className: "minicart__empty p-8 text-center"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartEmptyBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(ShoppingBagIcon, {
        width: 48,
        height: 48,
        className: "mx-auto text-gray-300 mb-4"
    }), /*#__PURE__*/ React.createElement("p", {
        className: "text-gray-500 mb-4"
    }, _('Your cart is empty')), /*#__PURE__*/ React.createElement("button", {
        type: "button",
        onClick: ()=>setIsDropdownOpen(false),
        className: "continue__shopping__button text-blue-600 hover:text-blue-700 font-medium"
    }, _('Continue Shopping')), /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartEmptyAfter",
        noOuter: true
    }));
