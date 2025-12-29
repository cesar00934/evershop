import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
export function RadioGroupField({ name, options, label, error, wrapperClassName, helperText, className = '', direction = 'vertical', required = false, disabled = false, validation, defaultValue, ...props }) {
    const { control, formState: { errors } } = useFormContext();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    const validationRules = {
        ...validation,
        ...required && !validation?.required && {
            required: _('${field} is required', {
                field: label || name
            })
        }
    };
    const containerClass = direction === 'horizontal' ? 'radio-group horizontal' : 'radio-group';
    return /*#__PURE__*/ React.createElement("div", {
        className: `form-field ${wrapperClassName} ${fieldError ? 'error' : ''}`
    }, label && /*#__PURE__*/ React.createElement("fieldset", null, /*#__PURE__*/ React.createElement("legend", null, label, required && /*#__PURE__*/ React.createElement("span", {
        className: "required-indicator"
    }, "*"), helperText && /*#__PURE__*/ React.createElement(Tooltip, {
        content: helperText,
        position: "top"
    }))), /*#__PURE__*/ React.createElement(Controller, {
        name: name,
        control: control,
        rules: validationRules,
        defaultValue: defaultValue,
        render: ({ field })=>/*#__PURE__*/ React.createElement("div", {
                className: containerClass
            }, options.map((option)=>/*#__PURE__*/ React.createElement("div", {
                    key: option.value,
                    className: "radio-item"
                }, /*#__PURE__*/ React.createElement("input", {
                    type: "radio",
                    id: `${fieldId}-${option.value}`,
                    value: option.value,
                    disabled: disabled || option.disabled,
                    checked: field.value === option.value,
                    onChange: ()=>field.onChange(option.value),
                    onBlur: field.onBlur,
                    className: className,
                    "aria-invalid": fieldError !== undefined ? 'true' : 'false',
                    "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined,
                    ...props
                }), /*#__PURE__*/ React.createElement("label", {
                    htmlFor: `${fieldId}-${option.value}`,
                    className: option.disabled ? 'disabled' : ''
                }, option.label))))
    }), fieldError && /*#__PURE__*/ React.createElement("p", {
        id: `${fieldId}-error`,
        className: "field-error"
    }, fieldError));
}
