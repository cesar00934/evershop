import { Card } from '@components/admin/Card.js';
import React from 'react';
export default function TaxSettingMenu({ taxSettingUrl }) {
    return /*#__PURE__*/ React.createElement(Card.Session, {
        title: /*#__PURE__*/ React.createElement("a", {
            href: taxSettingUrl
        }, "Tax Setting")
    }, /*#__PURE__*/ React.createElement("div", null, "Configure tax classes and tax rates"));
}
export const layout = {
    areaId: 'settingPageMenu',
    sortOrder: 20
};
export const query = `
  query Query {
    taxSettingUrl: url(routeId: "taxSetting")
  }
`;
