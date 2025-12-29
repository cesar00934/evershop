import { Card } from '@components/admin/Card.js';
import { TagIcon } from '@heroicons/react/24/solid';
import React from 'react';
export default function Collections({ product: { collections } }) {
    return /*#__PURE__*/ React.createElement(Card, {
        title: "Collections",
        subdued: true
    }, /*#__PURE__*/ React.createElement(Card.Session, null, collections.map((collection)=>/*#__PURE__*/ React.createElement("div", {
            className: "flex justify-start gap-2 items-center align-middle",
            key: collection.uuid
        }, /*#__PURE__*/ React.createElement(TagIcon, {
            width: 16,
            height: 16,
            fill: "#2c6ecb"
        }), /*#__PURE__*/ React.createElement("a", {
            href: collection.editUrl,
            className: "hover:underline"
        }, /*#__PURE__*/ React.createElement("span", null, collection.name)))), collections.length === 0 && /*#__PURE__*/ React.createElement("div", {
        className: "text-gray-500"
    }, "No collections")));
}
export const layout = {
    areaId: 'rightSide',
    sortOrder: 15
};
export const query = `
  query Query {
    product(id: getContextValue("productId", null)) {
      collections {
        uuid
        name
        editUrl
      }
    }
  }
`;
