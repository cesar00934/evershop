import { Card } from '@components/admin/Card.js';
import Button from '@components/common/Button.js';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import React from 'react';
function TaxClassForm({ saveTaxClassApi, closeModal, getTaxClasses }) {
    return /*#__PURE__*/ React.createElement(Card, {
        title: "Create a tax class"
    }, /*#__PURE__*/ React.createElement(Form, {
        id: "createTaxClass",
        method: "POST",
        action: saveTaxClassApi,
        submitBtn: false,
        onSuccess: async ()=>{
            await getTaxClasses({
                requestPolicy: 'network-only'
            });
            closeModal();
        }
    }, /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Tax class name"
    }, /*#__PURE__*/ React.createElement(InputField, {
        name: "name",
        type: "text",
        label: "Tax class name",
        defaultValue: "",
        placeholder: "Enter tax class name",
        required: true,
        validation: {
            required: 'Tax class name is required'
        }
    })), /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end gap-2"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: "Cancel",
        variant: "secondary",
        onAction: closeModal
    }), /*#__PURE__*/ React.createElement(Button, {
        title: "Save",
        variant: "primary",
        onAction: ()=>{
            document.getElementById('createTaxClass').dispatchEvent(new Event('submit', {
                cancelable: true,
                bubbles: true
            }));
        }
    })))));
}
export { TaxClassForm };
