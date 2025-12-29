import PropTypes from 'prop-types';
import React from 'react';
export function Results({ keyword, results = {} }) {
    const { customers = [], products = [], orders = [] } = results;
    return /*#__PURE__*/ React.createElement("div", {
        className: "results"
    }, /*#__PURE__*/ React.createElement("h3", null, 'Results for "', keyword, '"'), /*#__PURE__*/ React.createElement("div", {
        className: "item-list"
    }, products.items.length > 0 && /*#__PURE__*/ React.createElement("div", {
        className: "item-category flex flex-col space-x-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "result-category"
    }, "Products"), products.items.map((product, index)=>/*#__PURE__*/ React.createElement("a", {
            href: product.url,
            key: index
        }, /*#__PURE__*/ React.createElement("div", {
            className: "font-bold"
        }, product.name), /*#__PURE__*/ React.createElement("div", null, "#", product.sku)))), customers.items.length > 0 && /*#__PURE__*/ React.createElement("div", {
        className: "item-category flex flex-col space-x-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "result-category"
    }, "Customers"), customers.items.map((customer, index)=>/*#__PURE__*/ React.createElement("a", {
            href: customer.url,
            key: index
        }, /*#__PURE__*/ React.createElement("div", {
            className: "font-bold"
        }, customer.fullName), /*#__PURE__*/ React.createElement("div", null, customer.email)))), orders.items.length > 0 && /*#__PURE__*/ React.createElement("div", {
        className: "item-category flex flex-col space-x-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "result-category"
    }, "Orders"), orders.items.map((order, index)=>/*#__PURE__*/ React.createElement("a", {
            href: order.url,
            key: index
        }, /*#__PURE__*/ React.createElement("div", {
            className: "font-bold"
        }, "#", order.orderNumber), /*#__PURE__*/ React.createElement("div", null, order.email))))));
}
Results.propTypes = {
    keyword: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            url: PropTypes.string,
            name: PropTypes.string,
            description: PropTypes.string
        }))
    }))
};
Results.defaultProps = {
    keyword: undefined,
    results: []
};
