import { Card } from '@components/admin/Card.js';
import Area from '@components/common/Area.js';
import React from 'react';
export default function Setting({ type }) {
    const areaId = `widget_setting_form`;
    return /*#__PURE__*/ React.createElement(Card, {
        title: `${type.name} widget setting`
    }, /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement(Area, {
        id: areaId,
        noOurter: true
    })));
}
export const layout = {
    areaId: 'leftSide',
    sortOrder: 30
};
export const query = `
  query Query {
    type: widgetType(code: getContextValue('type', null)) {
      code
      name
    }
  }
`;
