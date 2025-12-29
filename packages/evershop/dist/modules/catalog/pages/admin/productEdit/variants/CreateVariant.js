import Button from '@components/common/Button.js';
import { Modal } from '@components/common/modal/Modal.js';
import { useModal } from '@components/common/modal/useModal.js';
import React from 'react';
import { VariantModal } from './VariantModal.js';
export const CreateVariant = ({ variantGroup, createProductApi, refresh })=>{
    const modal = useModal({
        onAfterClose: ()=>{
            refresh();
        }
    });
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "mt-5"
    }, /*#__PURE__*/ React.createElement(Button, {
        title: "Add Variant",
        onAction: ()=>{
            modal.open();
        }
    })), /*#__PURE__*/ React.createElement(Modal, {
        isOpen: modal.isOpen,
        onClose: modal.close
    }, /*#__PURE__*/ React.createElement(VariantModal, {
        variantGroup: variantGroup,
        createProductApi: createProductApi,
        closeModal: modal.close
    })));
};
