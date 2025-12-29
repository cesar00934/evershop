import { Card } from '@components/admin/Card.js';
import { RadioGroupField } from '@components/common/form/RadioGroupField.js';
import React from 'react';
import { useFormContext } from 'react-hook-form';
export default function Status({ category }) {
    const { register } = useFormContext();
    return /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Status"
    }, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "status",
        options: [
            {
                label: 'Disabled',
                value: 0
            },
            {
                label: 'Enabled',
                value: 1
            }
        ],
        defaultValue: category?.status === 0 ? 0 : 1,
        validation: {
            required: 'This field is required'
        }
    })), /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Include In Store Menu"
    }, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "include_in_nav",
        options: [
            {
                label: 'No',
                value: 0
            },
            {
                label: 'Yes',
                value: 1
            }
        ],
        defaultValue: category?.includeInNav === 0 ? 0 : 1,
        validation: {
            required: 'This field is required'
        }
    })), /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Show Products?"
    }, /*#__PURE__*/ React.createElement(RadioGroupField, {
        name: "show_products",
        options: [
            {
                label: 'No',
                value: 0
            },
            {
                label: 'Yes',
                value: 1
            }
        ],
        defaultValue: category?.showProducts === 0 ? 0 : 1,
        validation: {
            required: 'This field is required'
        }
    })));
}
export const layout = {
    areaId: 'rightSide',
    sortOrder: 15
};
export const query = `
  query Query {
    category(id: getContextValue("categoryId", null)) {
      status
      includeInNav
      showProducts
    }
  }
`;
