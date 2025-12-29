import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext } from 'react-hook-form';
export function SelectField({ name, label, error, helperText, required, validation, options, placeholder, wrapperClassName, className, defaultValue, multiple = false, ...props }) {
    const { register, formState: { errors } } = useFormContext();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    const hasDefaultValue = defaultValue !== undefined && defaultValue !== null && defaultValue !== '';
    const validationRules = {
        ...validation,
        ...required && !validation?.required && {
            required: {
                value: true,
                message: _('${field} is required', {
                    field: label || name
                })
            },
            validate: {
                ...validation?.validate,
                notEmpty: (value)=>{
                    if (required && (value === '' || value === null || value === undefined)) {
                        return _('${field} is required', {
                            field: label || name
                        });
                    }
                    return true;
                }
            }
        }
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: `form-field ${wrapperClassName} ${fieldError ? 'error' : ''}`
    }, label && /*#__PURE__*/ React.createElement("label", {
        htmlFor: fieldId
    }, label, required && /*#__PURE__*/ React.createElement("span", {
        className: "required-indicator"
    }, "*"), helperText && /*#__PURE__*/ React.createElement(Tooltip, {
        content: helperText,
        position: "top"
    })), /*#__PURE__*/ React.createElement("select", {
        id: fieldId,
        ...register(name, validationRules),
        className: className,
        defaultValue: hasDefaultValue ? defaultValue : multiple ? [] : '',
        "aria-invalid": fieldError !== undefined ? 'true' : 'false',
        "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined,
        multiple: multiple,
        ...props
    }, placeholder && /*#__PURE__*/ React.createElement("option", {
        value: "",
        disabled: true
    }, placeholder), options.map((option)=>/*#__PURE__*/ React.createElement("option", {
            key: option.value,
            value: option.value,
            disabled: option.disabled
        }, option.label))), fieldError && /*#__PURE__*/ React.createElement("p", {
        id: `${fieldId}-error`,
        className: "field-error"
    }, fieldError));
}
