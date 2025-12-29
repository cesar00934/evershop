import { Card } from '@components/admin/Card.js';
import { FormButtons } from '@components/admin/FormButtons.js';
import Area from '@components/common/Area.js';
import { Form } from '@components/common/form/Form.js';
import React from 'react';
export default function CouponEditForm({ action, gridUrl }) {
    return /*#__PURE__*/ React.createElement(Form, {
        method: "PATCH",
        action: action,
        submitBtn: false,
        id: "couponEditForm"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-1 gap-5"
    }, /*#__PURE__*/ React.createElement(Card, {
        title: "General"
    }, /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement(Area, {
        id: "couponEditGeneral",
        noOuter: true
    }))), /*#__PURE__*/ React.createElement(Card, {
        title: "Discount Type"
    }, /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement(Area, {
        id: "couponEditDiscountType",
        noOuter: true
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-x-5 grid-flow-row "
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2 grid grid-cols-1 gap-5 auto-rows-max"
    }, /*#__PURE__*/ React.createElement(Card, {
        title: "Order conditions"
    }, /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement(Area, {
        id: "couponEditLeft",
        noOuter: true,
        className: "col-8"
    })))), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 grid grid-cols-1 gap-5 auto-rows-max"
    }, /*#__PURE__*/ React.createElement(Card, {
        title: "Customer conditions"
    }, /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement(Area, {
        id: "couponEditRight",
        className: "col-4",
        noOuter: true
    })))))), /*#__PURE__*/ React.createElement(FormButtons, {
        cancelUrl: gridUrl,
        formId: "couponEditForm"
    }));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    action: url(routeId: "updateCoupon", params: [{key: "id", value: getContextValue("couponUuid")}]),
    gridUrl: url(routeId: "couponGrid")
  }
`;
