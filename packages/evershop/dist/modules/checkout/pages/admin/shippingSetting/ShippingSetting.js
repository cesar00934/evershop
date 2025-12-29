import { Card } from '@components/admin/Card.js';
import { SettingMenu } from '@components/admin/SettingMenu.js';
import React from 'react';
import { Zones } from './shippingSetting/Zones.js';
export default function ShippingSetting({ createShippingZoneApi }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "main-content-inner"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-6 gap-x-5 grid-flow-row "
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-2"
    }, /*#__PURE__*/ React.createElement(SettingMenu, null)), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-4"
    }, /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(Card.Session, {
        title: "Shipping"
    }, /*#__PURE__*/ React.createElement("div", null, "Choose where you ship and how much you charge for shipping.")), /*#__PURE__*/ React.createElement(Zones, {
        createShippingZoneApi: createShippingZoneApi
    })))));
}
export const layout = {
    areaId: 'content',
    sortOrder: 10
};
export const query = `
  query Query {
    createShippingZoneApi: url(routeId: "createShippingZone")
  }
`;
