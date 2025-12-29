import { Card } from '@components/admin/Card.js';
import React from 'react';
export default function PaymentSettingMenu({ paymentSettingUrl }) {
    return /*#__PURE__*/ React.createElement(Card.Session, {
        title: /*#__PURE__*/ React.createElement("a", {
            href: paymentSettingUrl
        }, "Payment Setting")
    }, /*#__PURE__*/ React.createElement("div", null, "Configure the available payment methods"));
}
export const layout = {
    areaId: 'settingPageMenu',
    sortOrder: 10
};
export const query = `
  query Query {
    paymentSettingUrl: url(routeId: "paymentSetting")
  }
`;
