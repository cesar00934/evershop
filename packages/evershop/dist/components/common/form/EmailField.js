import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext } from 'react-hook-form';
export function EmailField({ name, label, placeholder, className = '', wrapperClassName, required = false, disabled = false, defaultValue, error, helperText, validation, onChange, prefixIcon, suffixIcon, ...props }) {
    const { register, unregister, formState: { errors } } = useFormContext();
    const fieldError = getNestedError(name, errors, error);
    React.useEffect(()=>{
        return ()=>{
            unregister(name);
        };
    }, [
        name,
        unregister
    ]);
    const fieldId = `field-${name}`;
    const validationRules = {};
    if (defaultValue !== undefined) {
        validationRules.value = defaultValue;
    }
    if (validation) {
        Object.assign(validationRules, validation);
    }
    if (required && !validationRules.required) {
        validationRules.required = _('${field} is required', {
            field: label || 'This field'
        });
    }
    if (!validationRules.pattern) {
        validationRules.pattern = {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: _('Please enter a valid email address')
        };
    }
    const handleChange = (e)=>{
        if (onChange) {
            onChange(e.target.value);
        }
    };
    const hasIcons = prefixIcon || suffixIcon;
    const inputClassName = `${fieldError !== undefined ? 'error' : ''} ${className || ''} ${hasIcons ? '!pr-3' : ''} ${prefixIcon ? '!pl-10' : ''} ${suffixIcon ? '!pr-10' : ''}`.trim();
    const renderInput = ()=>/*#__PURE__*/ React.createElement("input", {
            id: fieldId,
            type: "email",
            placeholder: placeholder,
            disabled: disabled,
            className: inputClassName,
            "aria-invalid": fieldError !== undefined ? 'true' : 'false',
            "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined,
            ...register(name, validationRules),
            onChange: (e)=>{
                register(name).onChange(e);
                handleChange(e);
            },
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
