import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext } from 'react-hook-form';
export function TimeField({ name, label, error, wrapperClassName, helperText, required, validation, className, min, max, step, ...props }) {
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
        validate: {
            ...validation?.validate,
            minTime: (value)=>{
                if (!min || !value) return true;
                return value >= min || _('Time must be after ${min}', {
                    min: min.toString()
                });
            },
            maxTime: (value)=>{
                if (!max || !value) return true;
                return value <= max || _('Time must be before ${max}', {
                    max: max.toString()
                });
            }
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
    })), /*#__PURE__*/ React.createElement("input", {
        id: fieldId,
        type: "time",
        min: min,
        max: max,
        step: step,
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
