import { Modal } from '@components/common/modal/Modal.js';
import { useModal } from '@components/common/modal/useModal.js';
import React from 'react';
import { Method } from './Method.js';
import { MethodForm } from './MethodForm.js';
export function Methods({ reload, methods, addMethodApi }) {
    const modal = useModal();
    return /*#__PURE__*/ React.createElement("div", {
        className: "my-5"
    }, /*#__PURE__*/ React.createElement("table", {
        className: "border-collapse divide-y"
    }, /*#__PURE__*/ React.createElement("thead", null, /*#__PURE__*/ React.createElement("tr", null, /*#__PURE__*/ React.createElement("th", {
        className: "border-none"
    }, "Method"), /*#__PURE__*/ React.createElement("th", {
        className: "border-none"
    }, "Status"), /*#__PURE__*/ React.createElement("th", {
        className: "border-none"
    }, "Cost"), /*#__PURE__*/ React.createElement("th", {
        className: "border-none"
    }, "Condition"), /*#__PURE__*/ React.createElement("th", {
        className: "border-none"
    }, "Action"))), /*#__PURE__*/ React.createElement("tbody", null, methods.map((method)=>/*#__PURE__*/ React.createElement("tr", {
            key: method.methodId,
            className: "border-divider py-5"
        }, /*#__PURE__*/ React.createElement(Method, {
            method: method,
            reload: reload
        }))))), /*#__PURE__*/ React.createElement("div", {
        className: "mt-2"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        className: "text-interactive",
        onClick: (e)=>{
            e.preventDefault();
            modal.open();
        }
    }, "+ Add Method")), /*#__PURE__*/ React.createElement(Modal, {
        title: "Add Method",
        onClose: modal.close,
        isOpen: modal.isOpen
    }, /*#__PURE__*/ React.createElement(MethodForm, {
        saveMethodApi: addMethodApi,
        onSuccess: ()=>modal.close(),
        reload: reload
    })));
}
