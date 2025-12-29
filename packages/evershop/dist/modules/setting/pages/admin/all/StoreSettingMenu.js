import { Card } from '@components/admin/Card.js';
import React from 'react';
export default function StoreSettingMenu({ storeSettingUrl }) {
    return /*#__PURE__*/ React.createElement(Card.Session, {
        title: /*#__PURE__*/ React.createElement("a", {
            href: storeSettingUrl
        }, "Store Setting")
    }, /*#__PURE__*/ React.createElement("div", null, "Configure your store information"));
}
export const layout = {
    areaId: 'settingPageMenu',
    sortOrder: 5
};
export const query = `
  query Query {
    storeSettingUrl: url(routeId: "storeSetting")
  }
`;
