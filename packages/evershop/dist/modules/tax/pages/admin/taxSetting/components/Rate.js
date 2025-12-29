import { Modal } from '@components/common/modal/Modal.js';
import { useModal } from '@components/common/modal/useModal.js';
import React from 'react';
import { RateForm } from './RateForm.js';
function Rate({ rate, getTaxClasses }) {
    const modal = useModal();
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2 w-1/5"
    }, rate.name), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, rate.country), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, rate.rate, "%"), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, rate.isCompound ? 'Yes' : 'No'), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, rate.priority), /*#__PURE__*/ React.createElement("td", {
        className: "border-none py-2"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "text-interactive",
        onClick: (e)=>{
            e.preventDefault();
            modal.open();
        }
    }, "Edit"), /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "text-critical ml-5",
        onClick: async (e)=>{
            e.preventDefault();
            await fetch(rate.deleteApi, {
                method: 'DELETE'
            });
            await getTaxClasses({
                requestPolicy: 'network-only'
            });
        }
    }, "Delete"))), /*#__PURE__*/ React.createElement(Modal, {
        title: "Edit tax rate",
        onClose: modal.close,
        isOpen: modal.isOpen
    }, /*#__PURE__*/ React.createElement(RateForm, {
        saveRateApi: rate.updateApi,
        closeModal: ()=>modal.close(),
        getTaxClasses: getTaxClasses,
        rate: rate
    })));
}
export { Rate };
