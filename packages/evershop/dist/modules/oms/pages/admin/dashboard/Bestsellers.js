import { Card } from '@components/admin/Card.js';
import React from 'react';
import './Bestsellers.scss';
import { Image } from '@components/common/Image.js';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
export default function BestSellers({ bestSellers, listUrl }) {
    return /*#__PURE__*/ React.createElement(Card, {
        title: "Best Sellers",
        actions: [
            {
                name: 'All products',
                onAction: ()=>{
                    window.location.href = listUrl;
                }
            }
        ]
    }, /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement("table", {
        className: "listing bestsellers"
    }, /*#__PURE__*/ React.createElement("tbody", null, bestSellers.length === 0 && /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("td", {
        align: "left"
    }, "Look like you just started. No bestsellers yet."), /*#__PURE__*/ React.createElement("td", null, " ")), bestSellers.map((p, i)=>/*#__PURE__*/ React.createElement("tr", {
            key: i
        }, /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("div", {
            className: " flex justify-left"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-start gap-2 items-center"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "grid-thumbnail text-border border border-divider p-2 rounded"
        }, p.image?.url && /*#__PURE__*/ React.createElement(Image, {
            src: p.image.url,
            alt: p.name,
            width: 50,
            height: 50
        }), !p.image?.url && /*#__PURE__*/ React.createElement(ProductNoThumbnail, {
            width: 50,
            height: 50
        })), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
            href: p.editUrl || '',
            className: "font-semibold hover:underline"
        }, p.name))))), /*#__PURE__*/ React.createElement("td", null), /*#__PURE__*/ React.createElement("td", null, p.price.regular.text), /*#__PURE__*/ React.createElement("td", null, p.soldQty, " sold")))))));
}
export const layout = {
    areaId: 'leftSide',
    sortOrder: 20
};
export const query = `
  query Query {
    bestSellers {
      name
      price {
        regular {
          value
          text
        }
      }
      soldQty
      image {
        url
      }
      editUrl
    }
    listUrl: url(routeId: "productGrid")
  }
`;
