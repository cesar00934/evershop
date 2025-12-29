import { NavigationItemGroup } from '@components/admin/NavigationItemGroup.js';
import { CogIcon } from '@heroicons/react/24/solid';
import React from 'react';
export default function CmsMenuGroup({ storeSetting }) {
    return /*#__PURE__*/ React.createElement(NavigationItemGroup, {
        id: "settingMenuGroup",
        name: "Setting",
        Icon: ()=>/*#__PURE__*/ React.createElement(CogIcon, {
                width: 15,
                height: 15
            }),
        url: storeSetting
    });
}
export const layout = {
    areaId: 'adminMenu',
    sortOrder: 500
};
export const query = `
  query Query {
    storeSetting: url(routeId:"storeSetting")
  }
`;
