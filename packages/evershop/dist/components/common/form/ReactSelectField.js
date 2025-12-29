import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
export function ReactSelectField({ name, label, error, wrapperClassName = 'form-field', helperText, required, validation, options, className, isMulti = false, defaultValue, ...selectProps }) {
    const { control } = useFormContext();
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
        className: `${wrapperClassName} ${className || ''}`
    }, label && /*#__PURE__*/ React.createElement("label", {
        htmlFor: fieldId
    }, label, required && /*#__PURE__*/ React.createElement("span", {
        className: "required-indicator"
    }, "*")), /*#__PURE__*/ React.createElement(Controller, {
        name: name,
        control: control,
        rules: validationRules,
        defaultValue: defaultValue,
        render: ({ field, fieldState })=>{
            const fieldError = error || fieldState.error?.message;
            return /*#__PURE__*/ React.createElement("div", {
                className: fieldError !== undefined ? 'error' : ''
            }, /*#__PURE__*/ React.createElement(Select, {
                ...field,
                ...selectProps,
                inputId: fieldId,
                options: options,
                isMulti: isMulti,
                value: isMulti ? options.filter((option)=>(field.value || defaultValue || [])?.includes(option.value)) : options.find((option)=>option.value === (field.value ?? defaultValue)) || null,
                onChange: (selectedOption)=>{
                    if (isMulti) {
                        const values = selectedOption ? selectedOption.map((option)=>option.value) : [];
                        field.onChange(values);
                    } else {
                        field.onChange(selectedOption ? selectedOption.value : null);
                    }
                },
                classNamePrefix: "react-select",
                styles: {
                    control: (base, state)=>({
                            ...base,
                            minHeight: 'auto',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            boxShadow: 'none',
                            transition: 'border-color 0.15s ease-in-out',
                            '&:hover': {
                                borderColor: '#d1d5db'
                            },
                            ...state.isFocused && {
                                borderColor: '#3b82f6',
                                boxShadow: '0 0 0 1px rgb(59, 130, 246)'
                            }
                        }),
                    input: (base)=>({
                            ...base,
                            '& input': {
                                boxShadow: 'none !important',
                                outline: 'none !important'
                            }
                        })
                }
            }), fieldError && /*#__PURE__*/ React.createElement("p", {
                id: `${fieldId}-error`,
                className: "field-error"
            }, fieldError), helperText && !fieldError && /*#__PURE__*/ React.createElement("p", {
                id: `${fieldId}-helper`,
                className: "field-helper"
            }, helperText));
        }
    }));
}
