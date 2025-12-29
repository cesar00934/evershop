import { Card } from '@components/admin/Card.js';
import { InputField } from '@components/common/form/InputField.js';
import { ToggleField } from '@components/common/form/ToggleField.js';
import React from 'react';
export default function CODPayment({ setting: { codPaymentStatus, codDisplayName } }) {
    return /*#__PURE__*/ React.createElement(Card, {
        title: "Cash On Delivery Payment"
    }, /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 items-center flex"
    }, /*#__PURE__*/ React.createElement("h4", null, "Enable?")), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2"
    }, /*#__PURE__*/ React.createElement(ToggleField, {
        name: "codPaymentStatus",
        defaultValue: codPaymentStatus,
        trueValue: 1,
        falseValue: 0
    })))), /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-3 gap-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1 items-center flex"
    }, /*#__PURE__*/ React.createElement("h4", null, "Dislay Name")), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2"
    }, /*#__PURE__*/ React.createElement(InputField, {
        name: "codDisplayName",
        placeholder: "Display Name",
        defaultValue: codDisplayName
    })))));
}
export const layout = {
    areaId: 'paymentSetting',
    sortOrder: 20
};
export const query = `
  query Query {
    setting {
      codPaymentStatus
      codDisplayName
    }
  }
`;
