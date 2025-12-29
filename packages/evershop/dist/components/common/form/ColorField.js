import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext } from 'react-hook-form';
export function ColorField({ name, label, error, wrapperClassName, helperText, required, validation, defaultValue, className, ...props }) {
    const { register, formState: { errors }, watch, setValue } = useFormContext();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    const value = watch(name) || '#000000';
    const { valueAsNumber, valueAsDate, ...cleanValidation } = validation || {};
    const validationRules = {
        ...cleanValidation,
        ...required && !validation?.required && {
            required: _('${field} is required', {
                field: label || name
            })
        },
        pattern: validation?.pattern || {
            value: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
            message: _('Please enter a valid hex color')
        }
    };
    const handleTextChange = (e)=>{
        setValue(name, e.target.value);
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
    })), /*#__PURE__*/ React.createElement("div", {
        className: "color-input-group"
    }, /*#__PURE__*/ React.createElement("input", {
        id: fieldId,
        type: "color",
        ...register(name, validationRules),
        className: `color-picker ${className || ''}`,
        "aria-invalid": fieldError ? 'true' : 'false',
        "aria-describedby": fieldError ? `${fieldId}-error` : undefined,
        ...props
    }), /*#__PURE__*/ React.createElement("input", {
        type: "text",
        value: value,
        placeholder: "#000000",
        onChange: handleTextChange,
        className: "color-input",
        "aria-invalid": fieldError ? 'true' : 'false'
    })), fieldError && /*#__PURE__*/ React.createElement("p", {
        id: `${fieldId}-error`,
        className: "field-error"
    }, fieldError));
}
