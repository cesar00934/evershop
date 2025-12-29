import { Card } from '@components/admin/Card.js';
import Spinner from '@components/admin/Spinner.js';
import Button from '@components/common/Button.js';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { NumberField } from '@components/common/form/NumberField.js';
import { ToggleField } from '@components/common/form/ToggleField.js';
import React from 'react';
import { toast } from 'react-toastify';
import { useQuery } from 'urql';
const MethodsQuery = `
  query Methods {
    shippingMethods {
      value: shippingMethodId
      label: name
    }
    createShippingMethodApi: url(routeId: "createShippingMethod")
  }
`;
function RateForm({ saveRateApi, closeModal, getTaxClasses, rate }) {
    const [result] = useQuery({
        query: MethodsQuery
    });
    if (result.fetching) {
        return /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-center p-2"
        }, /*#__PURE__*/ React.createElement(Spinner, {
            width: 25,
            height: 25
        }));
    }
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(Form, {
        id: "taxRateForm",
        method: rate ? 'PATCH' : 'POST',
        action: saveRateApi,
        submitBtn: false,
        onSuccess: async (response)=>{
            if (!response.error) {
                await getTaxClasses({
                    requestPolicy: 'network-only'
                });
                closeModal();
                toast.success('Tax rate has been saved successfully!');
            } else {
                toast.error(response.error.message);
            }
        }
    }, /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Basic"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 gap-5"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
        name: "name",
        placeholder: "Name",
        required: true,
        validation: {
            required: 'Name is required'
        },
        label: "Name",
        defaultValue: rate?.name
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(NumberField, {
        name: "rate",
        label: "Rate",
        placeholder: "Rate",
        required: true,
        validation: {
            required: 'Rate is required'
        },
        defaultValue: rate?.rate
    })))), /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Setup shipping cost"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-5"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
        name: "country",
        label: "Country",
        placeholder: "Country",
        required: true,
        validation: {
            required: 'Country is required'
        },
        defaultValue: rate?.country,
        helperText: 'Country code (e.g., "US"). Use "*" for all countries.'
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
        name: "province",
        label: "Provinces",
        placeholder: "Provinces",
        required: true,
        validation: {
            required: 'Provinces is required'
        },
        defaultValue: rate?.province,
        helperText: 'Province code (e.g., "CA"). Use "*" for all provinces.'
    })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InputField, {
        name: "postcode",
        label: "Postcode",
        placeholder: "Postcode",
        required: true,
        validation: {
            required: 'Postcode is required'
        },
        defaultValue: rate?.postcode,
        helperText: 'Postcode (e.g., "90210"). Empty for all postcodes.'
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 gap-5 mt-5"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(ToggleField, {
        name: "is_compound",
        label: "Is compound",
        defaultValue: rate?.isCompound || false
    })), /*#__PURE__*/ React.createElement("div", null)), /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-2 gap-5 mt-5"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(NumberField, {
        name: "priority",
        label: "Priority",
        placeholder: "Priority",
        validation: {
            required: 'Priority is required'
        },
        required: true,
        defaultValue: rate?.priority
    })), /*#__PURE__*/ React.createElement("div", null))), /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end gap-2"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: "Cancel",
        variant: "secondary",
        onAction: closeModal
    }), /*#__PURE__*/ React.createElement(Button, {
        title: "Save",
        variant: "primary",
        onAction: ()=>{
            document.getElementById('taxRateForm').dispatchEvent(new Event('submit', {
                cancelable: true,
                bubbles: true
            }));
        }
    })))));
}
export { RateForm };
