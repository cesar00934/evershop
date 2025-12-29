import { Tooltip } from '@components/common/form/Tooltip.js';
import { getNestedError } from '@components/common/form/utils/getNestedError.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext } from 'react-hook-form';
export function DateTimeLocalField({ name, label, error, wrapperClassName, helperText, required, validation, className, min, max, step, ...props }) {
    const { register, unregister, formState: { errors } } = useFormContext();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    React.useEffect(()=>{
        return ()=>{
            unregister(name);
        };
    }, [
        name,
        unregister
    ]);
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
            minDateTime: (value)=>{
                if (!min || !value) return true;
                return value >= min || _('Date and time must be after ${min}', {
                    min: min.toString()
                });
            },
            maxDateTime: (value)=>{
                if (!max || !value) return true;
                return value <= max || _('Date and time must be before ${max}', {
                    max: max.toString()
                });
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
    })), /*#__PURE__*/ React.createElement("input", {
        id: fieldId,
        type: "datetime-local",
        min: min,
        max: max,
        step: step,
        ...register(name, validationRules),
        className: className,
        "aria-invalid": fieldError !== undefined ? 'true' : 'false',
        "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined,
        ...props
    }), fieldError && /*#__PURE__*/ React.createElement("p", {
        id: `${fieldId}-error`,
        className: "field-error"
    }, fieldError));
}
