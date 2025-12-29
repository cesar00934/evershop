import { ProductSelector } from '@components/admin/ProductSelector.js';
import { Modal } from '@components/common/modal/Modal.js';
import { useModal } from '@components/common/modal/useModal.js';
import React from 'react';
export const SkuConditionValueSelector = ({ selectedValues, updateCondition, isMulti })=>{
    const skus = Array.isArray(selectedValues) ? selectedValues : [];
    const selectedSKUs = React.useRef(skus || []);
    const modal = useModal({
        onAfterClose: ()=>{
            updateCondition(selectedSKUs.current);
        }
    });
    const onSelect = (sku)=>{
        if (!isMulti) {
            selectedSKUs.current = [
                sku
            ];
            modal.close();
        } else {
            selectedSKUs.current = [
                ...selectedSKUs.current,
                sku
            ];
        }
    };
    const onUnSelect = (sku)=>{
        const prev = selectedSKUs.current;
        selectedSKUs.current = prev.filter((s)=>s !== sku);
    };
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "text-interactive hover:underline",
        onClick: (e)=>{
            e.preventDefault();
            modal.open();
        }
    }, selectedSKUs.current.map((sku, index)=>/*#__PURE__*/ React.createElement("span", {
            key: sku
        }, index === 0 && /*#__PURE__*/ React.createElement("span", {
            className: "italic"
        }, "‘", sku, "’"), index === 1 && /*#__PURE__*/ React.createElement("span", null, " and ", selectedSKUs.current.length - 1, " more"))), selectedSKUs.current.length === 0 && /*#__PURE__*/ React.createElement("span", null, "Choose SKUs")), /*#__PURE__*/ React.createElement(Modal, {
        title: "Select Products",
        onClose: modal.close,
        isOpen: modal.isOpen
    }, /*#__PURE__*/ React.createElement("div", {
        className: "overflow-auto",
        style: {
            maxHeight: '60vh'
        }
    }, /*#__PURE__*/ React.createElement(ProductSelector, {
        onSelect: onSelect,
        onUnSelect: onUnSelect,
        selectedProducts: selectedSKUs.current.map((sku)=>({
                sku,
                uuid: undefined,
                productId: undefined
            }))
    }))));
};
