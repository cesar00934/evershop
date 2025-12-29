import { useCheckout } from '@components/frontStore/checkout/CheckoutContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
// Skeleton component for loading state
function ShippingMethodSkeleton() {
    return /*#__PURE__*/ React.createElement("div", {
        className: "shipping-method-skeleton"
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
export function ShippingMethods({ methods, shippingAddress, isLoading, onSelect }) {
    const { form } = useCheckout();
    const { register, formState, setValue, watch } = form;
    const [isProcessing, setIsProcessing] = React.useState(false);
    const currentValue = watch('shippingMethod');
    const handleMethodSelect = async (method)=>{
        if (!onSelect) {
            // If no onSelect function provided, allow normal behavior
            setValue('shippingMethod', method.code);
            return;
        }
        if (isProcessing || formState.disabled) {
            return;
        }
        try {
            setIsProcessing(true);
            const result = await Promise.resolve(onSelect(method));
            if (result) {
                // Only update the form value if onSelect returns true
                setValue('shippingMethod', method.code);
            }
        // If result is false, keep the current selection
        } catch (error) {
        // Keep the current selection on error
        } finally{
            setIsProcessing(false);
        }
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: "checkout-shipment"
    }, /*#__PURE__*/ React.createElement("h2", {
        className: "text-lg font-medium mb-4"
    }, _('Shipping method')), isLoading ? /*#__PURE__*/ React.createElement(ShippingMethodSkeleton, null) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        className: "shipping-methods-list"
    }, methods?.length === 0 ? /*#__PURE__*/ React.createElement("div", {
        className: "text-gray-500 text-center py-8"
    }, /*#__PURE__*/ React.createElement("input", {
        type: "hidden",
        ...form.register('shippingMethod', {
            required: true
        }),
        value: ""
    }), !shippingAddress?.country || !shippingAddress?.province ? /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "mb-2"
    }, _('Please complete your shipping address')), /*#__PURE__*/ React.createElement("div", {
        className: "text-sm"
    }, _('Available shipping methods will appear once you provide your address details'))) : /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "mb-2"
    }, _('No shipping methods available')), /*#__PURE__*/ React.createElement("div", {
        className: "text-sm"
    }, _('No shipping options are available for your location')))) : methods.map((method)=>/*#__PURE__*/ React.createElement("div", {
            key: method.code,
            className: `border rounded-lg p-3 mb-3 cursor-pointer transition-colors ${currentValue === method.code ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center justify-between"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center space-x-3"
        }, /*#__PURE__*/ React.createElement("input", {
            type: "radio",
            ...register('shippingMethod', {
                required: _('Please select a shipping method')
            }),
            value: method.code,
            checked: currentValue === method.code,
            onChange: ()=>{},
            disabled: isProcessing,
            className: "w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:opacity-50"
        }), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
            className: "font-normal text-gray-900 flex items-center"
        }, /*#__PURE__*/ React.createElement("a", {
            href: "#",
            onClick: (e)=>{
                e.preventDefault();
                !isProcessing && handleMethodSelect(method);
            }
        }, _(method.name)), isProcessing && currentValue === method.code && /*#__PURE__*/ React.createElement("div", {
            className: "ml-2 w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"
        })), method.description && /*#__PURE__*/ React.createElement("div", {
            className: "text-sm text-gray-500 mt-1"
        }, _(method.description)))), /*#__PURE__*/ React.createElement("div", {
            className: "text-right"
        }, method.cost ? /*#__PURE__*/ React.createElement(React.Fragment, null, method.cost.value > 0 ? /*#__PURE__*/ React.createElement("div", {
            className: "font-medium text-gray-900"
        }, method.cost.text) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
            className: "text-sm text-gray-500 line-through"
        }, method.cost.text), /*#__PURE__*/ React.createElement("div", {
            className: "font-medium text-green-600"
        }, _('FREE')))) : /*#__PURE__*/ React.createElement("div", {
            className: "font-medium text-gray-900"
        }, _('Contact for pricing'))))))), formState.errors.shippingMethod && /*#__PURE__*/ React.createElement("div", {
        className: "text-red-500 text-sm mt-2"
    }, formState.errors.shippingMethod?.message?.toString() || _('Please select a shipping method'))));
}
