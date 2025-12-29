import { Card } from '@components/admin/Card.js';
import Area from '@components/common/Area.js';
import React from 'react';
import './SettingMenu.scss';
export function SettingMenu() {
    return /*#__PURE__*/ React.createElement("div", {
        className: "setting-page-menu"
    }, /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(Area, {
        id: "settingPageMenu",
        noOuter: true,
        coreComponents: []
    })));
}
