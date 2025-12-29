import { Card } from '@components/admin/Card.js';
import React from 'react';
import { Rates } from './Rates.js';
function TaxClass({ taxClass, getTaxClasses }) {
    return /*#__PURE__*/ React.createElement(Card.Session, {
        title: /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-between items-center gap-5"
        }, /*#__PURE__*/ React.createElement("div", null, taxClass.name))
    }, /*#__PURE__*/ React.createElement("div", {
        className: "divide-y border rounded border-divider"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-start items-center border-divider mt-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex-grow px-2"
    }, /*#__PURE__*/ React.createElement(Rates, {
        rates: taxClass.rates,
        addRateApi: taxClass.addRateApi,
        getTaxClasses: getTaxClasses
    })))));
}
export { TaxClass };
