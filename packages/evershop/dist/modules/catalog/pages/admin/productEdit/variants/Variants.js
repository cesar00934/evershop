import { Card } from '@components/admin/Card.js';
import React from 'react';
import { useQuery } from 'urql';
import { CreateVariant } from './CreateVariant.js';
import { Skeleton } from './Skeleton.js';
import { Variant } from './Variant.js';
export const VariantQuery = `
query Query($productId: ID!) {
  product(id: $productId) {
    variantGroup {
      items {
        id
        attributes {
          attributeId
          attributeCode
          optionId
          optionText
        }
        product {
          productId
          uuid
          name
          sku
          qty
          status
          urlKey
          visibility
          price {
            regular {
              value
              currency
              text
            }
          }
          inventory {
            qty
            isInStock
            stockAvailability
            manageStock
          }
          editUrl
          updateApi
          image {
            uuid
            url
          }
          gallery {
            uuid
            url
          }
        }
      }
    }
  }
}
`;
export const Variants = ({ productId, variantGroup, createProductApi })=>{
    const [result, reexecuteQuery] = useQuery({
        query: VariantQuery,
        variables: {
            productId
        }
    });
    const refresh = ()=>{
        reexecuteQuery({
            requestPolicy: 'network-only'
        });
    };
    const { data, fetching, error } = result;
    if (fetching) {
        return /*#__PURE__*/ React.createElement("div", {
            className: "p-2 flex justify-center items-center"
        }, /*#__PURE__*/ React.createElement(Skeleton, null));
    }
    if (error) {
        return /*#__PURE__*/ React.createElement("p", {
            className: "text-critical"
        }, error.message);
    }
    return /*#__PURE__*/ React.createElement(Card.Session, null, /*#__PURE__*/ React.createElement("div", {
        className: "variant-list overflow-x-scroll"
    }, /*#__PURE__*/ React.createElement("table", null, /*#__PURE__*/ React.createElement("thead", null, /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", null, "Image"), variantGroup.attributes.map((attribute)=>/*#__PURE__*/ React.createElement("th", {
            key: attribute.attributeId
        }, attribute.attributeName)), /*#__PURE__*/ React.createElement("th", null, "SKU"), /*#__PURE__*/ React.createElement("th", null, "Price"), /*#__PURE__*/ React.createElement("th", null, "Stock"), /*#__PURE__*/ React.createElement("th", null, "Status"), /*#__PURE__*/ React.createElement("th", null, "Actions"))), /*#__PURE__*/ React.createElement("tbody", null, (data.product.variantGroup?.items || []).filter((v)=>v.product.productId !== productId).map((v)=>/*#__PURE__*/ React.createElement(Variant, {
            key: v.id,
            variant: v,
            refresh: refresh,
            variantGroup: variantGroup
        }))))), /*#__PURE__*/ React.createElement("div", {
        className: "self-center"
    }, /*#__PURE__*/ React.createElement(CreateVariant, {
        variantGroup: variantGroup,
        createProductApi: createProductApi,
        refresh: refresh
    })));
};
