import { Card } from '@components/admin/Card';
import { useAppState } from '@components/common/context/app';
import PropTypes from 'prop-types';
import React from 'react';
export default function BestCustomers({ listUrl, setting }) {
    const context = useAppState();
    const customers = context.bestCustomers || [];
    return /*#__PURE__*/ React.createElement(Card, {
        title: "Best customers",
        actions: [
            {
                name: 'All customers',
                onAction: ()=>{
                    window.location.href = listUrl;
                }
            }
        ]
    }, /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement("table", {
        className: "listing"
    }, /*#__PURE__*/ React.createElement("thead", null, /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", null, "Full name"), /*#__PURE__*/ React.createElement("th", null, "Orders"), /*#__PURE__*/ React.createElement("th", null, "Total"))), /*#__PURE__*/ React.createElement("tbody", null, customers.map((c, i)=>{
        const grandTotal = new Intl.NumberFormat('en', {
            style: 'currency',
            currency: setting.storeCurrency
        }).format(c.total);
        return /*#__PURE__*/ React.createElement("tr", {
            key: i
        }, /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("a", {
            href: c.editUrl || ''
        }, c.full_name)), /*#__PURE__*/ React.createElement("td", null, c.orders), /*#__PURE__*/ React.createElement("td", null, grandTotal));
    })))));
}
BestCustomers.propTypes = {
    setting: PropTypes.shape({
        storeCurrency: PropTypes.string
    }).isRequired,
    listUrl: PropTypes.string.isRequired
};
export const query = `
  query Query {
    setting {
      storeCurrency
    }
    listUrl: url(routeId: "productGrid")
  }
`;
