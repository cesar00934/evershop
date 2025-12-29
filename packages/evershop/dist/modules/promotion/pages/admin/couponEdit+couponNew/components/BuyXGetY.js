import { ProductSelector } from '@components/admin/ProductSelector.js';
import { NumberField } from '@components/common/form/NumberField.js';
import { Modal } from '@components/common/modal/Modal.js';
import { useModal } from '@components/common/modal/useModal.js';
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
const SkuSelector = ({ product, updateProduct })=>{
    const modal = useModal();
    const onSelect = (sku)=>{
        updateProduct({
            ...product,
            sku
        });
        modal.close();
    };
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "text-interactive hover:underline",
        onClick: (e)=>{
            e.preventDefault();
            modal.open();
        }
    }, product.sku ? /*#__PURE__*/ React.createElement("span", {
        className: "italic"
    }, "‘", product.sku, "’") : /*#__PURE__*/ React.createElement("span", null, "Choose SKU")), /*#__PURE__*/ React.createElement(Modal, {
        title: "Select SKU",
        onClose: modal.close,
        isOpen: modal.isOpen
    }, /*#__PURE__*/ React.createElement(ProductSelector, {
        selectedProducts: [
            product
        ].map((p)=>({
                sku: p.sku,
                uuid: undefined,
                productId: undefined
            })),
        onSelect: onSelect,
        onUnSelect: ()=>{}
    })));
};
const BuyXGetYList = ({ requireProducts })=>{
    const { unregister } = useFormContext();
    const { fields, append, remove, update, replace } = useFieldArray({
        name: 'buyx_gety'
    });
    useEffect(()=>{
        replace(requireProducts.map((product)=>({
                sku: product.sku,
                buyQty: typeof product.buyQty === 'string' ? parseInt(product.buyQty) || 1 : product.buyQty,
                getQty: typeof product.getQty === 'string' ? parseInt(product.getQty) || 1 : product.getQty,
                maxY: typeof product.maxY === 'string' ? parseInt(product.maxY) || 2 : product.maxY,
                discount: typeof product.discount === 'string' ? parseInt(product.discount) || 100 : product.discount
            })));
        return ()=>{
            unregister('buyx_gety'); // Cleanup: unregister field when component unmounts
        };
    }, []);
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("table", {
        className: "table table-bordered"
    }, /*#__PURE__*/ React.createElement("thead", null, /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", null, /*#__PURE__*/ React.createElement("span", null, "Sku")), /*#__PURE__*/ React.createElement("th", null, /*#__PURE__*/ React.createElement("span", null, "X")), /*#__PURE__*/ React.createElement("th", null, /*#__PURE__*/ React.createElement("span", null, "Y")), /*#__PURE__*/ React.createElement("th", null, /*#__PURE__*/ React.createElement("span", null, "Max of Y")), /*#__PURE__*/ React.createElement("th", null, /*#__PURE__*/ React.createElement("span", null, "Discount percent")), /*#__PURE__*/ React.createElement("th", null, " "))), /*#__PURE__*/ React.createElement("tbody", null, fields.map((p, i)=>/*#__PURE__*/ React.createElement("tr", {
            key: p.id
        }, /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement(SkuSelector, {
            product: p,
            updateProduct: (product)=>{
                update(i, {
                    ...p,
                    sku: product.sku
                });
            }
        })), /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement(NumberField, {
            name: `buyx_gety.${i}.buy_qty`,
            defaultValue: p.buyQty,
            placeholder: "Buy qty",
            required: true,
            validation: {
                required: 'Buy qty is required'
            }
        })), /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement(NumberField, {
            name: `buyx_gety.${i}.get_qty`,
            defaultValue: p.getQty,
            placeholder: "Get qty",
            required: true,
            validation: {
                required: 'Get qty is required'
            }
        })), /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement(NumberField, {
            name: `buyx_gety.${i}.max_y`,
            defaultValue: p.maxY,
            placeholder: "Max of Y",
            required: true,
            validation: {
                required: 'Max of Y is required'
            }
        })), /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement(NumberField, {
            name: `buyx_gety.${i}.discount`,
            defaultValue: p.discount,
            placeholder: "Discount percent",
            required: true,
            validation: {
                required: 'Discount percent is required'
            },
            unit: "%"
        })), /*#__PURE__*/ React.createElement("td", null, /*#__PURE__*/ React.createElement("a", {
            className: "text-critical",
            href: "#",
            onClick: (e)=>{
                e.preventDefault();
                remove(i);
            }
        }, /*#__PURE__*/ React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "1.5rem",
            height: "1.5rem",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            strokeWidth: 2
        }, /*#__PURE__*/ React.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M18 12H6"
        })))))))), /*#__PURE__*/ React.createElement("div", {
        className: "mt-2 flex justify-start"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "items-center flex"
    }, /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1.5rem",
        height: "1.5rem",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "pl-2"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            append({
                sku: '',
                buyQty: 1,
                getQty: 1,
                maxY: 2,
                discount: 100
            });
        }
    }, /*#__PURE__*/ React.createElement("span", null, "Add product")))));
};
const BuyXGetY = ({ requireProducts })=>{
    const { watch } = useFormContext();
    const watchDiscountType = watch('discount_type');
    if (watchDiscountType !== 'buy_x_get_y') {
        return null;
    }
    return /*#__PURE__*/ React.createElement(BuyXGetYList, {
        requireProducts: requireProducts
    });
};
export { BuyXGetY };
