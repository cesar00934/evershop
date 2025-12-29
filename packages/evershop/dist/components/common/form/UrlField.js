import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext } from 'react-hook-form';
export function UrlField({ name, label, error, wrapperClassName, helperText, required, validation, defaultValue, className, prefixIcon, suffixIcon, ...props }) {
    const { register, formState: { errors } } = useFormContext();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    const { valueAsNumber, valueAsDate, ...cleanValidation } = validation || {};
    const validationRules = {
        ...cleanValidation,
        ...required && {
            required: _('${field} is required', {
                field: label || name
            })
        },
        pattern: validation?.pattern || {
            value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            message: _('Please enter a valid URL')
        }
    };
    const hasIcons = prefixIcon || suffixIcon;
    const inputClassName = `${fieldError !== undefined ? 'error' : ''} ${className || ''} ${hasIcons ? '!pr-3' : ''} ${prefixIcon ? '!pl-10' : ''} ${suffixIcon ? '!pr-10' : ''}`.trim();
    const renderInput = ()=>/*#__PURE__*/ React.createElement("input", {
            id: fieldId,
            type: "url",
            ...register(name, validationRules),
            className: inputClassName,
            "aria-invalid": fieldError !== undefined ? 'true' : 'false',
            "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined,
            ...props
        });
    return /*#__PURE__*/ React.createElement("div", {
        className: `form-field ${wrapperClassName || ''}`.trim()
    }, label && /*#__PURE__*/ React.createElement("label", {
        htmlFor: fieldId
    }, label, required && /*#__PURE__*/ React.createElement("span", {
        className: "required-indicator"
    }, "*"), helperText && /*#__PURE__*/ React.createElement(Tooltip, {
        content: helperText,
        position: "top"
    })), hasIcons ? /*#__PURE__*/ React.createElement("div", {
        className: `input__wrapper relative flex group items-center`.trim()
    }, prefixIcon && /*#__PURE__*/ React.createElement("div", {
        className: "prefix absolute left-3 z-10 flex items-center justify-center"
    }, prefixIcon), renderInput(), suffixIcon && /*#__PURE__*/ React.createElement("div", {
        className: "suffix absolute right-3 z-10 flex items-center justify-center"
    }, suffixIcon)) : renderInput(), fieldError && /*#__PURE__*/ React.createElement("p", {
        id: `${fieldId}-error`,
        className: "field-error"
    }, fieldError));
}
