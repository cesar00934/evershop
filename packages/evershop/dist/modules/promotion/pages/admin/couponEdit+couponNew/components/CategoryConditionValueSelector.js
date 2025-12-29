import { CategorySelector } from '@components/admin/CategorySelector.js';
import { Modal } from '@components/common/modal/Modal.js';
import { useModal } from '@components/common/modal/useModal.js';
import React from 'react';
export const CategoryConditionValueSelector = ({ selectedValues, updateCondition, isMulti })=>{
    const selectedIds = React.useRef(Array.isArray(selectedValues) ? selectedValues.map(Number) : []);
    const modal = useModal({
        onAfterClose: ()=>{
            updateCondition(selectedIds.current);
        }
    });
    const onSelect = (id)=>{
        if (!isMulti) {
            selectedIds.current = [
                id
            ];
            modal.close();
        } else {
            const prev = selectedIds.current;
            if (!prev.includes(id)) {
                selectedIds.current = [
                    id,
                    ...prev
                ];
            }
        }
    };
    const onUnSelect = (id)=>{
        const prev = selectedIds.current;
        selectedIds.current = prev.filter((s)=>s !== id);
    };
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "text-interactive hover:underline",
        onClick: (e)=>{
            e.preventDefault();
            modal.open();
        }
    }, selectedIds.current.map((id, index)=>/*#__PURE__*/ React.createElement("span", {
            key: id
        }, index === 0 && /*#__PURE__*/ React.createElement("span", {
            className: "italic"
        }, "‘", id, "’"), index === 1 && /*#__PURE__*/ React.createElement("span", null, " and ", selectedIds.current.length - 1, " more"))), selectedIds.current.length === 0 && /*#__PURE__*/ React.createElement("span", null, "Choose Categories")), /*#__PURE__*/ React.createElement(Modal, {
        title: "Select Categories",
        onClose: modal.close,
        isOpen: modal.isOpen
    }, /*#__PURE__*/ React.createElement("div", {
        className: "overflow-auto",
        style: {
            maxHeight: '60vh'
        }
    }, /*#__PURE__*/ React.createElement(CategorySelector, {
        onSelect: onSelect,
        onUnSelect: onUnSelect,
        selectedCategories: selectedIds.current.map((id)=>({
                categoryId: id,
                uuid: undefined
            }))
    }))));
};
