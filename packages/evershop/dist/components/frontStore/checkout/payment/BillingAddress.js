import Button from '@components/common/Button.js';
import { useCheckout, useCheckoutDispatch } from '@components/frontStore/checkout/CheckoutContext.js';
import CustomerAddressForm from '@components/frontStore/customer/address/addressForm/Index.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React, { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
export function BillingAddress({ billingAddress, addBillingAddress, addingBillingAddress, noShippingRequired }) {
    const { form, checkoutData } = useCheckout();
    const { updateCheckoutData } = useCheckoutDispatch();
    const { register, setValue, getValues, trigger, formState: { disabled } } = form;
    // Watch shipping address changes
    const shippingAddress = useWatch({
        control: form.control,
        name: 'shippingAddress'
    });
    const billingAddressField = useWatch({
        control: form.control,
        name: 'billingAddress'
    });
    // State for radio selection
    const [useSameAddress, setUseSameAddress] = useState(!noShippingRequired);
    // Effect to sync billing address with shipping when "same address" is selected
    useEffect(()=>{
        if (useSameAddress && shippingAddress) {
            // Copy shipping address to billing address
            updateCheckoutData({
                billingAddress: shippingAddress
            });
        } else if (!useSameAddress) {
            // Clear billing address when switching to different address
            setValue('billingAddress', billingAddress);
        }
    }, [
        useSameAddress,
        checkoutData.shippingAddress
    ]);
    useEffect(()=>{
        if (!useSameAddress) {
            const billingAddress = {
                ...getValues('billingAddress')
            };
            updateCheckoutData({
                billingAddress
            });
        }
    }, [
        billingAddressField
    ]);
    const handleAddressOptionChange = (value)=>{
        const isSameAddress = value === 'same';
        if (isSameAddress === useSameAddress || disabled) {
            return;
        }
        setUseSameAddress(isSameAddress);
        if (!isSameAddress) {
            updateCheckoutData({
                billingAddress: undefined
            });
        } else if (checkoutData.shippingAddress) {
            updateCheckoutData({
                billingAddress: checkoutData.shippingAddress
            });
        }
    };
    const handleGoToPayment = async ()=>{
        // Trigger validation only for fields with "billingAddress" prefix
        const isValid = await trigger('billingAddress');
        if (isValid && addBillingAddress) {
            const billingAddressData = getValues('billingAddress');
            await addBillingAddress(billingAddressData);
        }
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: "billing-address-section"
    }, /*#__PURE__*/ React.createElement("h3", {
        className: "text-lg font-medium mb-4"
    }, _('Billing Address')), /*#__PURE__*/ React.createElement("div", {
        className: "mb-6 space-y-3"
    }, !noShippingRequired && /*#__PURE__*/ React.createElement("div", {
        className: `border rounded-lg transition-all duration-200 cursor-pointer ${useSameAddress ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`
    }, /*#__PURE__*/ React.createElement("div", {
        className: "p-3"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-3"
    }, /*#__PURE__*/ React.createElement("input", {
        type: "radio",
        id: "same-address",
        value: "same",
        checked: useSameAddress,
        onChange: (e)=>handleAddressOptionChange(e.target.value),
        className: "w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
    }), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "font-normal cursor-pointer text-gray-900",
        onClick: (e)=>{
            e.preventDefault();
            handleAddressOptionChange('same');
        }
    }, _('Same as shipping address')))))), /*#__PURE__*/ React.createElement("div", {
        className: `border rounded-lg transition-all overflow-hidden duration-200  ${!useSameAddress ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`
    }, !noShippingRequired && /*#__PURE__*/ React.createElement("div", {
        className: "p-3"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-3"
    }, /*#__PURE__*/ React.createElement("input", {
        type: "radio",
        ...register('useSameAddres'),
        id: "different-address",
        value: "different",
        checked: !useSameAddress,
        onChange: (e)=>handleAddressOptionChange(e.target.value),
        className: "w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
    }), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "font-normal cursor-pointer text-gray-900",
        onClick: (e)=>{
            e.preventDefault();
            handleAddressOptionChange('different');
        }
    }, _('Use a different billing address'))))), !useSameAddress && /*#__PURE__*/ React.createElement("div", {
        className: "border-t border-gray-200 p-3 bg-white"
    }, /*#__PURE__*/ React.createElement(CustomerAddressForm, {
        areaId: "checkoutBillingAddressForm",
        fieldNamePrefix: "billingAddress",
        address: undefined
    }), noShippingRequired && /*#__PURE__*/ React.createElement(Button, {
        title: _('Continue to payment'),
        onAction: ()=>handleGoToPayment(),
        variant: "primary",
        isLoading: addingBillingAddress
    })))));
}
