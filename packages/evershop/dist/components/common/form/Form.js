import Button from '@components/common/Button.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
export function Form({ form: externalForm, action, method = 'POST', formOptions, onSubmit, onSuccess, onError, successMessage = _('Saved successfully!'), errorMessage = _('Something went wrong! Please try again.'), submitBtn = true, submitBtnText = _('Save'), loading = false, children, className, noValidate = true, ...props }) {
    const theForm = externalForm || useForm({
        shouldUnregister: true,
        ...formOptions
    });
    const { handleSubmit, formState: { isSubmitting } } = theForm;
    const defaultSubmit = async (data)=>{
        if (!action) {
            return;
        }
        try {
            const response = await fetch(action, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.error) {
                if (onError) {
                    onError(result.error, data);
                } else {
                    toast.error(result.error.message || errorMessage);
                }
            } else if (onSuccess) {
                onSuccess(result, data);
            } else {
                toast.success(successMessage);
            }
        } catch (error) {
            if (onError) {
                onError(errorMessage || (error instanceof Error ? error.message : ''), data);
            } else {
                toast.error(errorMessage || (error instanceof Error ? error.message : ''));
            }
        }
    };
    const handleFormSubmit = onSubmit || defaultSubmit;
    return /*#__PURE__*/ React.createElement(FormProvider, theForm, /*#__PURE__*/ React.createElement("form", {
        onSubmit: handleSubmit(handleFormSubmit),
        className: className,
        noValidate: noValidate,
        ...props
    }, /*#__PURE__*/ React.createElement("fieldset", {
        disabled: loading
    }, children), submitBtn && /*#__PURE__*/ React.createElement("div", {
        className: "mt-4"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: submitBtnText,
        type: "submit",
        onAction: ()=>{
            handleSubmit(handleFormSubmit);
        },
        isLoading: isSubmitting || loading
    }))));
}
export { useFormContext } from 'react-hook-form';
export { Controller } from 'react-hook-form';
