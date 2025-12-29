import { Area } from '@components/common/Area.js';
import { ExtendableTable } from '@components/common/ExtendableTable.js';
import { Image } from '@components/common/Image.js';
import { ProductNoThumbnail } from '@components/common/ProductNoThumbnail.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { ItemQuantity } from './ItemQuantity.js';
export const DefaultCartItemList = ({ items, showPriceIncludingTax = true, loading = false, onSort, currentSort, onRemoveItem })=>{
    const columns = [
        {
            key: 'productInfo',
            header: {
                label: _('Product'),
                className: ''
            },
            className: 'font-medium align-top',
            sortable: false,
            render: (row)=>{
                const priceValue = showPriceIncludingTax ? row.productPriceInclTax?.text : row.productPrice?.text;
                return /*#__PURE__*/ React.createElement("div", {
                    className: "flex justify-start gap-4"
                }, /*#__PURE__*/ React.createElement("div", null, row.thumbnail ? /*#__PURE__*/ React.createElement(Image, {
                    src: row.thumbnail,
                    alt: row.productName,
                    width: 80,
                    height: 80,
                    className: "rounded-md"
                }) : /*#__PURE__*/ React.createElement(ProductNoThumbnail, {
                    width: 80,
                    height: 80
                })), /*#__PURE__*/ React.createElement("div", {
                    className: "font-medium flex flex-col gap-1 items-start h-full"
                }, /*#__PURE__*/ React.createElement("span", {
                    className: "font-semibold"
                }, row.productName), row.variantOptions?.map((option)=>/*#__PURE__*/ React.createElement("span", {
                        key: option.optionId,
                        className: "text-xs text-muted"
                    }, option.attributeName, ": ", option.optionText)), /*#__PURE__*/ React.createElement("span", {
                    className: "text-sm text-muted"
                }, priceValue, " x ", row.qty), /*#__PURE__*/ React.createElement("a", {
                    href: "#",
                    className: "text-red-500 text-sm",
                    onClick: (e)=>{
                        e.preventDefault();
                        onRemoveItem?.(row.cartItemId);
                    }
                }, _('Remove')), row.errors?.map((error, index)=>/*#__PURE__*/ React.createElement("span", {
                        key: index,
                        className: "text-xs text-red-500"
                    }, error))));
            }
        },
        {
            key: 'qty',
            header: {
                label: _('Quantity'),
                className: 'text-center'
            },
            sortable: true,
            render: (row)=>{
                return /*#__PURE__*/ React.createElement("div", {
                    className: "text-left"
                }, /*#__PURE__*/ React.createElement(ItemQuantity, {
                    initialValue: row.qty,
                    cartItemId: row.cartItemId,
                    min: 1,
                    max: 99
                }, ({ quantity, increase, decrease })=>/*#__PURE__*/ React.createElement("div", {
                        className: "flex items-center"
                    }, /*#__PURE__*/ React.createElement("button", {
                        onClick: decrease,
                        disabled: loading || quantity <= 1,
                        className: "px-1 disabled:opacity-50 text-lg"
                    }, "−"), /*#__PURE__*/ React.createElement("span", {
                        className: "min-w-[3rem] text-center"
                    }, quantity), /*#__PURE__*/ React.createElement("button", {
                        onClick: increase,
                        disabled: loading,
                        className: "disabled:opacity-50 text-lg"
                    }, "+"))));
            }
        },
        {
            key: 'lineTotal',
            header: {
                label: _('Total'),
                className: 'flex justify-end'
            },
            sortable: true,
            render: (row)=>{
                const totalValue = showPriceIncludingTax ? row.lineTotalInclTax?.text : row.lineTotal?.text;
                return /*#__PURE__*/ React.createElement("div", {
                    className: "text-right"
                }, /*#__PURE__*/ React.createElement("span", {
                    className: "font-bold"
                }, totalValue));
            }
        }
    ];
    const [rows, setRows] = React.useState(items);
    React.useEffect(()=>{
        setRows(items);
    }, [
        items
    ]);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartItemListBefore",
        noOuter: true
    }), /*#__PURE__*/ React.createElement(ExtendableTable, {
        name: "shoppingCartItems",
        columns: columns,
        initialData: rows,
        loading: loading,
        emptyMessage: _('Your cart is empty'),
        onSort: onSort,
        currentSort: currentSort,
        className: "cart__items__table border-none table-auto border-spacing-y-2 border-separate w-full"
    }), /*#__PURE__*/ React.createElement(Area, {
        id: "miniCartItemListAfter",
        noOuter: true
    }), /*#__PURE__*/ React.createElement("style", null, `
        .cart__items__table th, .cart__items__table td {
          padding: 0.75rem;
        }
        .cart__items__table th {
          border: none;
        }
        .cart__items__table td {
          border: none;
        }
      `));
};
