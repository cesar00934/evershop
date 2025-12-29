import { NumberField } from '@components/common/form/NumberField.js';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
export function PriceBasedPrice({ lines }) {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'price_based_cost'
    });
    // Initialize the field array with existing lines if it's empty
    React.useEffect(()=>{
        if (fields.length === 0 && lines.length > 0) {
            lines.forEach((line)=>{
                append({
                    min_price: line.minPrice?.value || undefined,
                    cost: line.cost?.value || undefined
                });
            });
        }
    }, [
        lines,
        fields.length,
        append
    ]);
    // Ensure there's at least one row
    React.useEffect(()=>{
        if (lines.length === 0) {
            append({
                min_price: undefined,
                cost: undefined
            });
        }
    }, [
        lines.length,
        append
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        className: "my-5"
    }, /*#__PURE__*/ React.createElement("table", {
        className: "border-collapse divide-y"
    }, /*#__PURE__*/ React.createElement("thead", null, /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
        className: "border-none"
    }, "Min Price"), /*#__PURE__*/ React.createElement("th", {
        className: "border-none"
    }, "Shipping Cost"), /*#__PURE__*/ React.createElement("th", {
        className: "border-none"
    }, "Action"))), /*#__PURE__*/ React.createElement("tbody", null, fields.map((field, index)=>/*#__PURE__*/ React.createElement("tr", {
            key: field.id,
            className: "border-divider py-5"
        }, /*#__PURE__*/ React.createElement("td", {
            className: "border-none"
        }, /*#__PURE__*/ React.createElement(NumberField, {
            name: `price_based_cost.${index}.min_price`,
            placeholder: "Min Price",
            required: true,
            validation: {
                required: 'Min price is required'
            }
        })), /*#__PURE__*/ React.createElement("td", {
            className: "border-none"
        }, /*#__PURE__*/ React.createElement(NumberField, {
            name: `price_based_cost.${index}.cost`,
            placeholder: "Shipping Cost",
            required: true,
            validation: {
                required: 'Shipping cost is required'
            }
        })), /*#__PURE__*/ React.createElement("td", {
            className: "border-none"
        }, fields.length > 1 && /*#__PURE__*/ React.createElement("button", {
            type: "button",
            onClick: ()=>remove(index),
            className: "text-critical"
        }, "Delete"))))), /*#__PURE__*/ React.createElement("tfoot", null, /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("td", {
        colSpan: 3,
        className: "border-none"
    }, /*#__PURE__*/ React.createElement("button", {
        type: "button",
        className: "text-interactive",
        onClick: ()=>{
            append({
                min_price: undefined,
                cost: undefined
            });
        }
    }, "+ Add Line"))))));
}
