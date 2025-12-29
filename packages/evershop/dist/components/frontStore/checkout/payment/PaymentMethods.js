/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */ import { useCheckout } from '@components/frontStore/checkout/CheckoutContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
// Skeleton component for loading state
function PaymentMethodSkeleton() {
    return /*#__PURE__*/ React.createElement("div", {
        className: "payment-method-skeleton"
    }, [
        1,
        2,
        3,
        4
    ].map((index)=>/*#__PURE__*/ React.createElement("div", {
            key: index,
            className: "border border-gray-200 rounded-lg p-4 mb-3 animate-pulse"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center justify-between"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center space-x-3"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "w-4 h-4 bg-gray-200 rounded-full"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "space-y-2"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "h-4 bg-gray-200 rounded w-20"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "h-3 bg-gray-200 rounded w-40"
        }))), /*#__PURE__*/ React.createElement("div", {
            className: "text-right space-y-1"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "h-3 bg-gray-200 rounded w-12"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "h-4 bg-gray-200 rounded w-16"
        }))))));
}
export function PaymentMethods({ methods, isLoading }) {
    const { form, registeredPaymentComponents } = useCheckout();
    const { register, formState, watch, setValue } = form;
    // Watch the current payment method value
    const selectedPaymentMethod = watch('paymentMethod');
    // Helper function to get payment component for a method
    const getPaymentComponent = (methodCode)=>{
        return registeredPaymentComponents[methodCode] || null;
    };
    // Helper function to render a component safely
    const renderComponent = (component, props)=>{
        return component ? /*#__PURE__*/ React.createElement(component, props) : null;
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: "checkout-payment-methods"
    }, /*#__PURE__*/ React.createElement("h3", {
        className: "text-lg font-medium mb-4"
    }, _('Pick a payment method')), isLoading ? /*#__PURE__*/ React.createElement(PaymentMethodSkeleton, null) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        className: "payment-methods-list"
    }, methods?.length === 0 ? /*#__PURE__*/ React.createElement("div", {
        className: "text-gray-500 text-center py-8"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "mb-2"
    }, _('No payment methods available'))) : methods.map((method)=>{
        const isSelected = selectedPaymentMethod === method.code;
        const component = getPaymentComponent(method.code);
        return /*#__PURE__*/ React.createElement("div", {
            key: method.code,
            className: `border rounded-lg mb-3 transition-all overflow-hidden duration-200 ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`
        }, /*#__PURE__*/ React.createElement("div", {
            className: "p-3"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center space-x-3"
        }, /*#__PURE__*/ React.createElement("input", {
            type: "radio",
            ...register('paymentMethod'),
            value: method.code,
            required: true,
            checked: isSelected,
            className: "w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "font-normal text-gray-900 w-full cursor-pointer",
            onClick: (e)=>{
                e.preventDefault();
                if (formState.disabled) {
                    return;
                }
                // Set selected payment method
                setValue('paymentMethod', method.code);
            }
        }, component?.nameRenderer ? renderComponent(component.nameRenderer, {
            isSelected
        }) : _(method.name)))), isSelected && component?.formRenderer && /*#__PURE__*/ React.createElement("div", {
            className: "border-t border-gray-200 p-3 bg-white"
        }, renderComponent(component.formRenderer, {
            isSelected: true
        })));
    })), formState.errors.paymentMethod && /*#__PURE__*/ React.createElement("div", {
        className: "text-red-500 text-sm mt-2"
    }, formState.errors.paymentMethod?.message?.toString() || _('Please select a payment method'))));
}
