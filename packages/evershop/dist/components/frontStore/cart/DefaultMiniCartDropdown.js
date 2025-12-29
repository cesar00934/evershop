import { Area } from '@components/common/Area.js';
import { CartItems } from '@components/frontStore/cart/CartItems.js';
import { CartTotalSummary } from '@components/frontStore/cart/CartTotalSummary.js';
import { DefaultMiniCartDropdownEmpty } from '@components/frontStore/cart/DefaultMiniCartDropdownEmpty.js';
import { DefaultMiniCartItemList } from '@components/frontStore/cart/DefaultMiniCartItemList.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React, { useEffect, useRef } from 'react';
export const DefaultMiniCartDropdown = ({ cart, isOpen, onClose, cartUrl, dropdownPosition = 'right', setIsDropdownOpen })=>{
    const totalQty = cart?.totalQty || 0;
    const closeButtonRef = useRef(null);
    useEffect(()=>{
        const handleEscKey = (e)=>{
            if (isOpen && e.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'hidden';
            setTimeout(()=>{
                if (closeButtonRef.current) {
                    closeButtonRef.current.focus();
                }
            }, 100);
        }
        return ()=>{
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = '';
        };
    }, [
        isOpen,
        onClose
    ]);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        onClick: onClose,
        className: `fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`,
        "aria-hidden": "true"
    }), /*#__PURE__*/ React.createElement("div", {
        className: `minicart__dropdown fixed top-0 bottom-0 w-full md:w-1/3 bg-white border-x p-5 border-gray-200 z-50 shadow-xl transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} ${dropdownPosition === 'left' ? 'left-0' : 'right-0'}`,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": _('Shopping Cart')
    }, /*#__PURE__*/ React.createElement("div", {
        className: "minicart__dropdown__header flex justify-between items-center mb-6 border-b pb-4 border-gray-200"
    }, /*#__PURE__*/ React.createElement("h3", {
        className: "minicart__heading font-medium text-2xl text-gray-900"
    }, _('Your Cart')), /*#__PURE__*/ React.createElement("button", {
        type: "button",
        ref: closeButtonRef,
        onClick: onClose,
        className: "text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 rounded-full p-1",
        "aria-label": _('Close cart')
    }, /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-6 w-6",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M6 18L18 6M6 6l12 12"
    })))), totalQty === 0 ? /*#__PURE__*/ React.createElement(DefaultMiniCartDropdownEmpty, {
        setIsDropdownOpen: setIsDropdownOpen
    }) : /*#__PURE__*/ React.createElement("div", {
        className: "minicart__items__container flex flex-col justify-between h-full",
        style: {
            height: 'calc(100vh - 150px)'
        }
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartItemsBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement("div", {
        className: "overflow-y-auto mb-8"
    }, /*#__PURE__*/ React.createElement(CartItems, null, ({ items, loading })=>/*#__PURE__*/ React.createElement(DefaultMiniCartItemList, {
            items: items,
            loading: loading
        }))), /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartItemsAfter",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartSummaryBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(CartTotalSummary, null, ({ total })=>/*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
            className: "minicart__summary flex justify-between items-center mb-3"
        }, /*#__PURE__*/ React.createElement("span", {
            className: "font-medium text-gray-900"
        }, _('Subtotal'), ":"), /*#__PURE__*/ React.createElement("span", {
            className: "font-semibold text-lg text-gray-900"
        }, total || '—')), /*#__PURE__*/ React.createElement("button", {
            type: "button",
            onClick: ()=>{
                if (cartUrl) {
                    window.location.href = cartUrl;
                }
            },
            className: "minicart__viewcart__button w-full bg-primary text-white py-4 px-4 rounded-full hover:bg-blue-700 transition-colors font-medium"
        }, _('View Cart (${totalQty})', {
            totalQty: totalQty.toString()
        })))), /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartSummaryAfter",
        noOuter: true
    }))));
};
