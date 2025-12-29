import { Modal } from '@components/common/modal/Modal.js';
import { useModal } from '@components/common/modal/useModal.js';
import React from 'react';
import { VariantModal } from './VariantModal.js';
export const EditVariant = ({ variant, refresh, variantGroup })=>{
    const modal = useModal({
        onAfterClose: ()=>{
            refresh();
        }
    });
    return /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
        className: "button",
        onClick: (e)=>{
            e.preventDefault();
            modal.open();
        },
        href: "#"
    }, "Edit"), /*#__PURE__*/ React.createElement(Modal, {
        isOpen: modal.isOpen,
        onClose: modal.close
    }, /*#__PURE__*/ React.createElement(VariantModal, {
        variant: variant,
        variantGroup: variantGroup,
        closeModal: modal.close
    })));
};
