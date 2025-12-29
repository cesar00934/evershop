import { InputField } from '@components/common/form/InputField.js';
import { NumberField } from '@components/common/form/NumberField.js';
import { SelectField } from '@components/common/form/SelectField.js';
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { options, operators, Operator } from './conditionCriterias.js';
import { ValueSelector } from './ValueSelector.js';
export function RequiredProducts({ requiredProducts }) {
    const { setValue, watch } = useFormContext();
    const { fields, append, remove, replace } = useFieldArray({
        name: 'condition.required_products'
    });
    useEffect(()=>{
        replace(requiredProducts);
    }, []);
    const fieldsWatch = watch('condition.required_products');
    return /*#__PURE__*/ React.createElement("div", {
        style: {
            marginTop: '1rem',
            marginBottom: '1rem'
        }
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("span", null, "Order must contains product matched bellow conditions(All)")), /*#__PURE__*/ React.createElement("table", {
        className: "table table-auto",
        style: {
            marginTop: 0
        }
    }, /*#__PURE__*/ React.createElement("thead", null, /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", null, /*#__PURE__*/ React.createElement("span", null, "Key")), /*#__PURE__*/ React.createElement("th", null, /*#__PURE__*/ React.createElement("span", null, "Operator")), /*#__PURE__*/ React.createElement("th", null, /*#__PURE__*/ React.createElement("span", null, "Value")), /*#__PURE__*/ React.createElement("th", null, /*#__PURE__*/ React.createElement("span", null, "Minimum quantity")), /*#__PURE__*/ React.createElement("th", null, " "))), /*#__PURE__*/ React.createElement("tbody", null, fields.map((p, i)=>/*#__PURE__*/ React.createElement("tr", {
            key: p.id
        }, /*#__PURE__*/ React.createElement("td", null, p.editable ? /*#__PURE__*/ React.createElement(SelectField, {
            name: `condition.required_products.${i}.key`,
            defaultValue: p.key,
            options: options.map((option)=>({
                    value: option.key,
                    label: option.label
                })),
            wrapperClassName: "form-field mb-0"
        }) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(InputField, {
            type: "hidden",
            name: `condition.required_products.${i}.key`,
            readOnly: true,
            value: p.key,
            wrapperClassName: "form-field mb-0"
        }), /*#__PURE__*/ React.createElement(InputField, {
            name: `condition.required_products.${i}.keylabel`,
            readOnly: true,
            value: options.find((c)=>c.key === p.key)?.label || 'Unknown',
            wrapperClassName: "form-field mb-0"
        }))), /*#__PURE__*/ React.createElement("td", null, p.editable ? /*#__PURE__*/ React.createElement(SelectField, {
            options: operators.map((operator)=>({
                    value: operator.key,
                    label: operator.label
                })),
            name: `condition.required_products.${i}.operator`,
            defaultValue: p.operator,
            wrapperClassName: "form-field mb-0"
        }) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(InputField, {
            type: "hidden",
            name: `condition.required_products.${i}.operator`,
            readOnly: true,
            value: p.operator,
            wrapperClassName: "form-field mb-0"
        }), /*#__PURE__*/ React.createElement(InputField, {
            readOnly: true,
            name: `condition.required_products.${i}.operatorlabel`,
            value: operators.find((c)=>c.key === p.operator)?.label || 'Unknown',
            wrapperClassName: "form-field mb-0"
        }))), /*#__PURE__*/ React.createElement("td", null, fieldsWatch[i].key === 'price' && /*#__PURE__*/ React.createElement(NumberField, {
            name: `condition.required_products.${i}.value`,
            defaultValue: p.value,
            wrapperClassName: "form-field mb-0"
        }), fieldsWatch[i].key !== 'price' && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(InputField, {
            type: "hidden",
            name: `condition.required_products.${i}.value`,
            value: p.value,
            wrapperClassName: "form-field mb-0"
        }), /*#__PURE__*/ React.createElement(ValueSelector, {
            condition: fieldsWatch[i],
            updateCondition: (values)=>{
                setValue(`condition.required_products.${i}.value`, values);
            }
        }))), /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("div", {
            style: {
                width: '80px'
            }
        }, /*#__PURE__*/ React.createElement(NumberField, {
            name: `condition.required_products.${i}.qty`,
            defaultValue: typeof p.qty === 'number' ? p.qty : parseInt(p.qty, 10) || 1,
            placeholder: "Enter the quantity",
            required: true,
            validation: {
                required: 'Minimum quantity is required',
                min: {
                    value: 1,
                    message: ''
                }
            },
            wrapperClassName: "form-field mb-0"
        }))), /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("a", {
            href: "#",
            className: "text-critical",
            onClick: (e)=>{
                e.preventDefault();
                remove(i);
            }
        }, /*#__PURE__*/ React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "1.5rem",
            height: "1.5rem",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2
        }, /*#__PURE__*/ React.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M18 12H6"
        })))))))), /*#__PURE__*/ React.createElement("div", {
        className: "mt-2 flex justify-start"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "items-center flex"
    }, /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1.5rem",
        height: "1.5rem",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "pl-2"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            append({
                key: 'category',
                operator: Operator.EQUAL,
                value: '',
                qty: '',
                editable: true
            });
        }
    }, /*#__PURE__*/ React.createElement("span", null, "Add product")))));
}
RequiredProducts.defaultProps = {
    requiredProducts: []
};
