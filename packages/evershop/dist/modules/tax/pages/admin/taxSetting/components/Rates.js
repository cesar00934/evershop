import { Modal } from '@components/common/modal/Modal.js';
import { useModal } from '@components/common/modal/useModal.js';
import React from 'react';
import { Rate } from './Rate.js';
import { RateForm } from './RateForm.js';
export function Rates({ getTaxClasses, rates, addRateApi }) {
    const modal = useModal();
    return /*#__PURE__*/ React.createElement("div", {
        className: "my-5"
    }, /*#__PURE__*/ React.createElement("table", {
        className: "border-collapse divide-y"
    }, /*#__PURE__*/ React.createElement("thead", null, /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
        className: "border-none"
    }, "Name"), /*#__PURE__*/ React.createElement("th", {
        className: "border-none"
    }, "Country"), /*#__PURE__*/ React.createElement("th", {
        className: "border-none"
    }, "Rate"), /*#__PURE__*/ React.createElement("th", {
        className: "border-none"
    }, "Compound"), /*#__PURE__*/ React.createElement("th", {
        className: "border-none"
    }, "Priority"), /*#__PURE__*/ React.createElement("th", {
        className: "border-none"
    }, "Action"))), /*#__PURE__*/ React.createElement("tbody", null, rates.map((rate)=>/*#__PURE__*/ React.createElement("tr", {
            key: rate.uuid,
            className: "border-divider py-5"
        }, /*#__PURE__*/ React.createElement(Rate, {
            rate: rate,
            getTaxClasses: getTaxClasses
        }))))), /*#__PURE__*/ React.createElement("div", {
        className: "mt-2"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "text-interactive",
        onClick: (e)=>{
            e.preventDefault();
            modal.open();
        }
    }, "+ Add Rate")), /*#__PURE__*/ React.createElement(Modal, {
        title: "Add a tax rate",
        onClose: modal.close,
        isOpen: modal.isOpen
    }, /*#__PURE__*/ React.createElement(RateForm, {
        saveRateApi: addRateApi,
        closeModal: ()=>modal.close(),
        getTaxClasses: getTaxClasses
    })));
}
