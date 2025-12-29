import Button from '@components/common/Button.js';
import React from 'react';
export default function NewCouponButton({ newCouponUrl }) {
    return /*#__PURE__*/ React.createElement(Button, {
        url: newCouponUrl,
        title: "New Coupon"
    });
}
export const layout = {
    areaId: 'pageHeadingRight',
    sortOrder: 10
};
export const query = `
  query Query {
    newCouponUrl: url(routeId: "couponNew")
  }
`;
