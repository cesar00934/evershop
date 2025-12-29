import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
export function Tax({ taxClass, amount }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "summary-row"
    }, /*#__PURE__*/ React.createElement("span", null, _('Tax')), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", null, taxClass), /*#__PURE__*/ React.createElement("div", null, amount)));
}
