import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import React from 'react';
export const DefaultMiniCartIcon = ({ totalQty, onClick, isOpen, disabled = false, showItemCount = true, syncStatus })=>{
    return /*#__PURE__*/ React.createElement("button", {
        type: "button",
        onClick: onClick,
        disabled: disabled,
        className: `mini-cart-icon relative ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${isOpen ? 'active' : ''}`,
        "aria-label": `Shopping cart with ${totalQty} items`
    }, syncStatus.syncing ? /*#__PURE__*/ React.createElement("div", {
        className: "w-6 h-6 flex items-center justify-center"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-700"
    })) : /*#__PURE__*/ React.createElement(ShoppingBagIcon, {
        width: 24,
        height: 24,
        className: "text-gray-700 hover:text-gray-900 transition-colors"
    }), showItemCount && totalQty > 0 && !syncStatus.syncing && /*#__PURE__*/ React.createElement("span", {
        className: "absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
    }, totalQty > 99 ? '99+' : totalQty));
};
