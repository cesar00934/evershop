import { UserCircleIcon as Icon } from '@heroicons/react/24/outline';
import React from 'react';
export default function UserIcon({ customer, accountUrl, loginUrl }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "self-center"
    }, /*#__PURE__*/ React.createElement("a", {
        href: customer ? accountUrl : loginUrl
    }, /*#__PURE__*/ React.createElement(Icon, {
        width: 25,
        height: 25
    })));
}
export const layout = {
    areaId: 'headerMiddleRight',
    sortOrder: 10
};
export const query = `
  query Query {
    customer: currentCustomer {
      uuid
      fullName
      email
    }
    accountUrl: url(routeId: "account")
    loginUrl: url(routeId: "login")
  }
`;
