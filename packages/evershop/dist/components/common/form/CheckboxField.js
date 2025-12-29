import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
export function CheckboxField({ name, label, error, wrapperClassName, helperText, required, validation, options, defaultValue, direction = 'vertical', className, disabled, ...props }) {
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
    const containerClass = direction === 'horizontal' ? 'checkbox-group horizontal' : 'checkbox-group';
    if (!options || options.length === 0) {
        return /*#__PURE__*/ React.createElement("div", {
            className: `form-field ${wrapperClassName} ${fieldError ? 'error' : ''}`
        }, /*#__PURE__*/ React.createElement("div", {
            className: containerClass
        }, /*#__PURE__*/ React.createElement("div", {
            className: "checkbox-item"
        }, /*#__PURE__*/ React.createElement(Controller, {
            name: name,
            control: control,
            rules: validationRules,
            defaultValue: defaultValue,
            render: ({ field })=>/*#__PURE__*/ React.createElement("input", {
                    type: "checkbox",
                    id: fieldId,
                    checked: !!field.value,
                    onChange: (e)=>field.onChange(e.target.checked),
                    onBlur: field.onBlur,
                    disabled: disabled,
                    className: className,
                    "aria-invalid": fieldError !== undefined ? 'true' : 'false',
                    "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined,
                    ...props
                })
        }), label && /*#__PURE__*/ React.createElement("label", {
            htmlFor: fieldId
        }, label, required && /*#__PURE__*/ React.createElement("span", {
            className: "required-indicator"
        }, "*"), helperText && /*#__PURE__*/ React.createElement(Tooltip, {
            content: helperText,
            position: "top"
        })))), fieldError && /*#__PURE__*/ React.createElement("p", {
            id: `${fieldId}-error`,
            className: "field-error"
        }, fieldError));
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: `${wrapperClassName} ${fieldError ? 'error' : ''}`
    }, label && /*#__PURE__*/ React.createElement("fieldset", null, /*#__PURE__*/ React.createElement("legend", null, label, required && /*#__PURE__*/ React.createElement("span", {
        className: "required-indicator"
    }, "*"), helperText && /*#__PURE__*/ React.createElement(Tooltip, {
        content: helperText,
        position: "top"
    })), /*#__PURE__*/ React.createElement(Controller, {
        name: name,
        control: control,
        rules: validationRules,
        defaultValue: defaultValue,
        render: ({ field })=>/*#__PURE__*/ React.createElement("div", {
                className: containerClass
            }, options.map((option, index)=>{
                const isChecked = Array.isArray(field.value) ? field.value.includes(option.value) : false;
                return /*#__PURE__*/ React.createElement("div", {
                    key: option.value,
                    className: "checkbox-item"
                }, /*#__PURE__*/ React.createElement("input", {
                    type: "checkbox",
                    id: `${fieldId}-${index}`,
                    value: option.value,
                    disabled: disabled || option.disabled,
                    checked: isChecked,
                    onChange: (e)=>{
                        const currentValues = Array.isArray(field.value) ? field.value : [];
                        if (e.target.checked) {
                            field.onChange([
                                ...currentValues,
                                option.value
                            ]);
                        } else {
                            field.onChange(currentValues.filter((val)=>val !== option.value));
                        }
                    },
                    onBlur: field.onBlur,
                    className: className,
                    "aria-invalid": fieldError ? 'true' : 'false',
                    "aria-describedby": fieldError ? `${fieldId}-error` : undefined,
                    ...props
                }), /*#__PURE__*/ React.createElement("label", {
                    htmlFor: `${fieldId}-${index}`,
                    className: option.disabled ? 'disabled' : ''
                }, option.label));
            }))
    })), fieldError && /*#__PURE__*/ React.createElement("p", {
        id: `${fieldId}-error`,
        className: "field-error"
    }, fieldError));
}
