import { Circle } from '@components/admin/Circle.js';
import Area from '@components/common/Area';
import PropTypes from 'prop-types';
import React from 'react';
import './Items.scss';
import { Card } from '@components/admin/Card';
import { Name } from './items/Name.js';
import { Price } from './items/Price.js';
import { Thumbnail } from './items/Thumbnail.js';
export default function Items({ order: { items, shipmentStatus } }) {
    return /*#__PURE__*/ React.createElement(Card, {
        title: /*#__PURE__*/ React.createElement("div", {
            className: "flex space-x-2"
        }, /*#__PURE__*/ React.createElement(Circle, {
            variant: shipmentStatus.badge || 'new'
        }), /*#__PURE__*/ React.createElement("span", {
            className: "block self-center"
        }, shipmentStatus.name || 'Unknown'))
    }, /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement("table", {
        className: "listing order-items"
    }, /*#__PURE__*/ React.createElement("tbody", null, items.map((i, k)=>/*#__PURE__*/ React.createElement("tr", {
            key: k
        }, /*#__PURE__*/ React.createElement(Area, {
            key: k,
            id: `order_item_row_${i.id}`,
            noOuter: true,
            item: i,
            coreComponents: [
                {
                    component: {
                        default: Thumbnail
                    },
                    props: {
                        imageUrl: i.thumbnail,
                        qty: i.qty
                    },
                    sortOrder: 10,
                    id: 'productThumbnail'
                },
                {
                    component: {
                        default: Name
                    },
                    props: {
                        name: i.productName,
                        productSku: i.productSku,
                        productUrl: i.productUrl,
                        variantOptions: i.variantOptions
                    },
                    sortOrder: 20,
                    id: 'productName'
                },
                {
                    component: {
                        default: Price
                    },
                    props: {
                        price: i.productPrice.text,
                        qty: i.qty
                    },
                    sortOrder: 30,
                    id: 'price'
                },
                {
                    component: {
                        default: 'td'
                    },
                    props: {
                        children: /*#__PURE__*/ React.createElement("span", null, i.lineTotal.text),
                        key: 'lineTotal'
                    },
                    sortOrder: 40,
                    id: 'lineTotal'
                }
            ]
        })))))), /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end gap-2"
    }, /*#__PURE__*/ React.createElement(Area, {
        id: "order_actions",
        noOuter: true
    }))));
}
Items.propTypes = {
    order: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            qty: PropTypes.number,
            productName: PropTypes.string,
            productSku: PropTypes.string,
            productUrl: PropTypes.string,
            thumbnail: PropTypes.string,
            productPrice: PropTypes.shape({
                value: PropTypes.number,
                text: PropTypes.string
            }),
            variantOptions: PropTypes.string,
            finalPrice: PropTypes.shape({
                value: PropTypes.number,
                text: PropTypes.string
            }),
            total: PropTypes.shape({
                value: PropTypes.number,
                text: PropTypes.string
            }),
            lineTotal: PropTypes.shape({
                value: PropTypes.number,
                text: PropTypes.string
            })
        })),
        shipmentStatus: PropTypes.shape({
            code: PropTypes.string,
            badge: PropTypes.string,
            progress: PropTypes.string,
            name: PropTypes.string
        }),
        shipment: PropTypes.shape({
            shipmentId: PropTypes.string,
            carrier: PropTypes.string,
            trackingNumber: PropTypes.string,
            updateShipmentApi: PropTypes.string
        }),
        createShipmentApi: PropTypes.string.isRequired
    }).isRequired
};
export const layout = {
    areaId: 'leftSide',
    sortOrder: 10
};
export const query = `
  query Query {
    order(uuid: getContextValue("orderId")) {
      currency
      shipment {
        shipmentId
        carrier
        trackingNumber
        updateShipmentApi
      }
      shipmentStatus {
        code
        badge
        progress
        name
      }
      items {
        id: orderItemId
        qty
        productName
        productSku
        productUrl
        thumbnail
        variantOptions {
          attributeCode
          attributeName
          attributeId
          optionId
          optionText
        }
        productPrice {
          value
          text
        }
        finalPrice {
          value
          text
        }
        total {
          value
          text
        }
        lineTotal {
          value
          text
        }
      }
      createShipmentApi
    },
    carriers {
      label: name
      value: code
    }
  }
`;
