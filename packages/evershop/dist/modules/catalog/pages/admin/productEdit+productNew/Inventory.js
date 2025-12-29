import { Card } from '@components/admin/Card.js';
import { NumberField } from '@components/common/form/NumberField.js';
import { RadioGroupField } from '@components/common/form/RadioGroupField.js';
import React from 'react';
export default function Inventory({ product }) {
    const inventory = product?.inventory || {
        qty: undefined,
        stockAvailability: undefined,
        manageStock: undefined
    };
    return /*#__PURE__*/ React.createElement(Card, {
        title: "Inventory",
        subdued: true
    }, /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "manage_stock",
        label: "Manage Stock",
        options: [
            {
                value: 1,
                label: 'Yes'
            },
            {
                value: 0,
                label: 'No'
            }
        ],
        defaultValue: inventory.manageStock === 0 ? 0 : 1,
        required: true
    })), /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "stock_availability",
        label: "Stock Availability",
        options: [
            {
                value: 1,
                label: 'In Stock'
            },
            {
                value: 0,
                label: 'Out of Stock'
            }
        ],
        defaultValue: inventory.stockAvailability === 0 ? 0 : 1,
        required: true
    })), /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement(NumberField, {
        name: "qty",
        defaultValue: inventory.qty,
        placeholder: "Quantity",
        label: "Quantity",
        required: true
    })));
}
export const layout = {
    areaId: 'rightSide',
    sortOrder: 15
};
export const query = `
  query Query {
    product(id: getContextValue("productId", null)) {
      inventory {
        qty
        stockAvailability
        manageStock
      }
    }
  }
`;
