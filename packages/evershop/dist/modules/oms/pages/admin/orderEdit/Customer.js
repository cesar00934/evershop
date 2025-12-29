import { Card } from '@components/admin/Card.js';
import { AddressSummary } from '@components/common/customer/address/AddressSummary.js';
import React from 'react';
export default function Customer({ order: { noShippingRequired, shippingAddress, billingAddress, customerFullName, customerEmail, customerUrl } }) {
    return /*#__PURE__*/ React.createElement(Card, {
        title: "Customer"
    }, /*#__PURE__*/ React.createElement(Card.Session, null, customerUrl && /*#__PURE__*/ React.createElement("a", {
        href: customerUrl,
        className: "text-interactive hover:underline block"
    }, customerFullName), !customerUrl && /*#__PURE__*/ React.createElement("span", null, customerEmail, " (Guest Checkout)")), /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Contact information"
    }, /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "text-interactive hover:underline"
    }, customerEmail)), shippingAddress?.telephone && /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("span", null, shippingAddress.telephone))), /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Shipping Address"
    }, !noShippingRequired && /*#__PURE__*/ React.createElement(AddressSummary, {
        address: shippingAddress
    }), noShippingRequired && /*#__PURE__*/ React.createElement("span", null, 'No shipping required')), /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Billing address"
    }, /*#__PURE__*/ React.createElement(AddressSummary, {
        address: billingAddress
    })));
}
export const layout = {
    areaId: 'rightSide',
    sortOrder: 15
};
export const query = `
  query Query {
    order(uuid: getContextValue("orderId")) {
      customerFullName
      customerEmail
      customerUrl
      noShippingRequired
      shippingAddress {
        fullName
        city
        address1
        address2
        postcode
        telephone
        province {
          code
          name
        }
        country {
          code
          name
        }
      }
      billingAddress {
        fullName
        city
        address1
        address2
        postcode
        telephone
        province {
          code
          name
        }
        country {
          code
          name
        }
      }
    }
  }
`;
