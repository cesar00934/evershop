import { Card } from '@components/admin/Card';
import PropTypes from 'prop-types';
import React from 'react';
export default function ShippingSettingMenu({ shippingSettingUrl }) {
    return /*#__PURE__*/ React.createElement(Card.Session, {
        title: /*#__PURE__*/ React.createElement("a", {
            href: shippingSettingUrl
        }, "Shipping Setting")
    }, /*#__PURE__*/ React.createElement("div", null, "Where you ship, shipping methods and delivery fee"));
}
ShippingSettingMenu.propTypes = {
    shippingSettingUrl: PropTypes.string.isRequired
};
export const layout = {
    areaId: 'settingPageMenu',
    sortOrder: 15
};
export const query = `
  query Query {
    shippingSettingUrl: url(routeId: "shippingSetting")
  }
`;
