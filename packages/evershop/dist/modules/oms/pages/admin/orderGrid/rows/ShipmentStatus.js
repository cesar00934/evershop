import { Badge } from '@components/admin/Badge.js';
import React from 'react';
export function ShipmentStatus({ status }) {
    return /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement(Badge, {
        title: status.name,
        variant: status.badge,
        progress: status.progress
    }));
}
