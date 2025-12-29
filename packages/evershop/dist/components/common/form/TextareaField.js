import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext } from 'react-hook-form';
export function TextareaField({ name, label, error, helperText, wrapperClassName, required, validation, className, rows = 4, ...props }) {
    const { register, formState: { errors } } = useFormContext();
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
    return /*#__PURE__*/ React.createElement("div", {
        className: `form-field ${wrapperClassName}`
    }, label && /*#__PURE__*/ React.createElement("label", {
        htmlFor: fieldId
    }, label, required && /*#__PURE__*/ React.createElement("span", {
        className: "required-indicator"
    }, "*"), helperText && /*#__PURE__*/ React.createElement(Tooltip, {
        content: helperText,
        position: "top"
    })), /*#__PURE__*/ React.createElement("textarea", {
        id: fieldId,
        rows: rows,
        ...register(name, validationRules),
        className: `${fieldError !== undefined ? 'error' : ''} ${className || ''}`,
        "aria-invalid": fieldError !== undefined ? 'true' : 'false',
        "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined,
        ...props
    }), fieldError && /*#__PURE__*/ React.createElement("p", {
        id: `${fieldId}-error`,
        className: "field-error"
    }, fieldError));
}
