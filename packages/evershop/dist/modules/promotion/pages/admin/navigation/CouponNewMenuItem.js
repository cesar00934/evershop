import { NavigationItem } from '@components/admin/NavigationItem.js';
import { GiftIcon } from '@heroicons/react/24/solid';
import React from 'react';
export default function CouponNewMenuItem({ url }) {
    return /*#__PURE__*/ React.createElement(NavigationItem, {
        Icon: GiftIcon,
        title: "New coupon",
        url: url
    });
}
