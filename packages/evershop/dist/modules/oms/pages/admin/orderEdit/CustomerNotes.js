import { Card } from '@components/admin/Card';
import Area from '@components/common/Area';
import PropTypes from 'prop-types';
import React from 'react';
export default function CustomerNotes({ order: { shippingNote } }) {
    return /*#__PURE__*/ React.createElement(Card, {
        title: "Customer notes"
    }, /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement(Area, {
        id: "orderEditCustomerNotes",
        coreComponents: [
            {
                component: {
                    default: ()=>/*#__PURE__*/ React.createElement("div", null, shippingNote || /*#__PURE__*/ React.createElement("span", {
                            className: "text-border"
                        }, "No notes from customer"))
                },
                props: {},
                sortOrder: 10,
                id: 'title'
            }
        ],
        noOuter: true
    })));
}
CustomerNotes.propTypes = {
    order: PropTypes.shape({
        shippingNote: PropTypes.string
    }).isRequired
};
export const layout = {
    areaId: 'rightSide',
    sortOrder: 10
};
export const query = `
  query Query {
    order(uuid: getContextValue("orderId")) {
      shippingNote
    }
  }
`;
