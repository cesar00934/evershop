import Button from '@components/common/Button.js';
import React from 'react';
import { useFormContext } from 'react-hook-form';
const FormButtons = ({ cancelUrl, formId })=>{
    const { formState: { isSubmitting } } = useFormContext();
    return /*#__PURE__*/ React.createElement("div", {
        className: "form-submit-button flex border-t border-divider mt-4 pt-4 justify-between"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: "Cancel",
        variant: "danger",
        outline: true,
        onAction: ()=>{
            window.location.href = cancelUrl;
        }
    }), /*#__PURE__*/ React.createElement(Button, {
        title: "Save",
        onAction: ()=>{
            document.getElementById(formId).dispatchEvent(new Event('submit', {
                cancelable: true,
                bubbles: true
            }));
        },
        isLoading: isSubmitting
    }));
};
export { FormButtons };
