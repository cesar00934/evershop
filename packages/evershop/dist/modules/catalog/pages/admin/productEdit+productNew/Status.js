import { Card } from '@components/admin/Card.js';
import { RadioGroupField } from '@components/common/form/RadioGroupField.js';
import React from 'react';
export default function Status({ product }) {
    return /*#__PURE__*/ React.createElement(Card, {
        title: "Product status",
        subdued: true
    }, /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "status",
        label: "Status",
        options: [
            {
                value: 0,
                label: 'Disabled'
            },
            {
                value: 1,
                label: 'Enabled'
            }
        ],
        defaultValue: product?.status === 0 ? 0 : 1,
        required: true,
        helperText: "Disabled products will not be visible in the store and cannot be purchased."
    })), /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "visibility",
        label: "Visibility",
        options: [
            {
                value: 0,
                label: 'Not visible individually'
            },
            {
                value: 1,
                label: 'Catalog, Search'
            }
        ],
        defaultValue: product?.visibility === 0 ? 0 : 1,
        required: true,
        helperText: "Visibility determines where the product appears in the store. It does not affect the saleability of the product."
    })));
}
export const layout = {
    areaId: 'rightSide',
    sortOrder: 10
};
export const query = `
  query Query {
    product(id: getContextValue("productId", null)) {
      status
      visibility
      category {
        value: categoryId
        label: name
      }
    }
  }
`;
